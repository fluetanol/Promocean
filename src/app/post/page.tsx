'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import PostingFloatingSection from "@/components/section/PostingFloatingSection";
import PostingWriteSection from "@/components/section/PostingWriteSection";
import PostingFooter from "@/components/layout/PostingFooter";
import PostingArchiveFolderSection from "@/components/section/PostingArchiveFolderSection";
import { PostingFloatingItemProps } from "@/types/itemType";
import TitleInput from "@/components/editor/TitleInput";
import HashtagInput from "@/components/editor/HashtagInput";
import { buildPromptFromLexical, extractTextFromLexical, convertLexicalToMarkdown } from "@/utils/lexicalUtils";
import { PromptAPI } from "@/api/prompt";
import { PostAPI, PostArticleRequest } from "@/api/post";
import { PostAPI as CommunityPostAPI } from "@/api/community/post";
import { categoryStringToEnum, promptTypeStringToEnum } from "@/types/postEnum";
import { ContestAPI } from "@/api/contest/contest";
import { SubmissionAPI } from "@/api/contest/submission";
import { UploadAPI } from "@/api/upload";
import { Upload } from "lucide-react";
import { useSpaceStore } from "@/store/spaceStore";
import SpaceAPI from "@/api/space";
import { useArchiveFolderStore } from "@/store/archiveFolderStore";
import { authAPI } from "@/api/auth";

/**
 * PostPageContent component (useSearchParams를 사용하는 내부 컴포넌트)
 */
function PostPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postType = searchParams.get("type"); // community, my-space, team-space, submission
  const folderIdParam = searchParams.get("folderId"); // 아카이브 폴더 ID
  const spaceIdParam = searchParams.get("spaceId"); // 팀 스페이스 ID
  const mode = searchParams.get("mode"); // edit 모드인지 확인
  const articleIdParam = searchParams.get("articleId"); // 수정할 게시글 ID (아카이브용)
  const postIdParam = searchParams.get("postId"); // 수정할 게시글 ID (커뮤니티용)
  const contestIdParam = searchParams.get("contestId"); // 대회 ID (산출물 제출용)
  const submissionIdParam = searchParams.get("submissionId"); // 수정할 산출물 ID (산출물 수정용)

  const isEditMode = mode === "edit" && (articleIdParam || postIdParam || submissionIdParam);
  const isSubmissionType = postType === 'submission';

  // CloudFront URL에서 S3 key 추출 함수
  const extractS3KeyFromUrl = (url: string): string => {
    if (!url) return '';
    const cloudfrontPrefix = 'https://d3qr7nnlhj7oex.cloudfront.net/';
    if (url.startsWith(cloudfrontPrefix)) {
      return url.replace(cloudfrontPrefix, '');
    }
    // 이미 key 형식이면 그대로 반환
    return url;
  };

  // 폼 상태 관리
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]); // 배열로 변경
  const [descriptionState, setDescriptionState] = useState("");
  const [usedPrompt, setUsedPrompt] = useState("");
  const [examplePrompt, setExamplePrompt] = useState("");
  const [answerPrompt, setAnswerPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [selectedPromptType, setSelectedPromptType] = useState<string>("text");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFolderId , setSelectedFolderId] = useState<number | null>(
    folderIdParam ? parseInt(folderIdParam, 10) : null
  );
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  const spaceStore = useSpaceStore();
  const folderStore = useArchiveFolderStore();


  // AI 답변 생성 로딩 상태
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);

  // 이미지 프롬프트 결과 관련 상태
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [generatedImageKey, setGeneratedImageKey] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadedImageKey, setUploadedImageKey] = useState<string>("");

  // 토큰 잔량 관련 상태
  const [remainingTokens, setRemainingTokens] = useState<number | null>(null);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);

  // 에러 상태 관리
  const [promptError, setPromptError] = useState(false);
  const [examplePromptError, setExamplePromptError] = useState(false);

  // 아카이브 타입인지 확인
  const isArchiveType = postType === 'my-space' || postType === 'team-space';
  
  // 대회 정보 및 타입 상태
  const [contestType, setContestType] = useState<string>("text");
  const [isLoadingContest, setIsLoadingContest] = useState(false);
  
  // 페이지 로드 시 토큰 잔량 조회
  useEffect(() => {
    const fetchRemainingTokens = async () => {
      setIsLoadingTokens(true);
      try {
        const tokenData = await authAPI.getRestToken();
        setRemainingTokens(tokenData.usableToken);
      } catch (error) {
        console.error('토큰 잔량 조회 실패:', error);
        setRemainingTokens(null);
      } finally {
        setIsLoadingTokens(false);
      }
    };

    fetchRemainingTokens();
  }, []);

  // 산출물 제출 모드일 때 대회 정보 로드
  useEffect(() => {
    if (!isSubmissionType || !contestIdParam) return;
    
    const loadContestData = async () => {
      setIsLoadingContest(true);
      try {
        const contestId = parseInt(contestIdParam, 10);
        if (isNaN(contestId)) {
          alert('잘못된 대회 ID입니다.');
          router.back();
          return;
        }
        
        const { contestData } = await ContestAPI.getDetail(contestId);
        console.log('대회 정보 로드:', contestData.type, '전체 데이터:', contestData);
        // 대회 타입을 promptType으로 설정 (다양한 형식 지원)
        const typeMap: { [key: string]: string } = {
          "TEXT": "text",
          "IMAGE": "image",
          "text": "text",
          "image": "image",
          "이미지": "image",
          "텍스트": "text",
          "1": "text",  // PromptType.TEXT = 1
          "2": "image", // PromptType.IMAGE = 2
        };
        // 숫자 타입도 처리 (PromptType.TEXT = 1, PromptType.IMAGE = 2)
        let mappedType = typeMap[contestData.type] || typeMap[String(contestData.type)] || typeMap[String(contestData.type).toUpperCase()];
        if (!mappedType && typeof contestData.type === 'number') {
          mappedType = contestData.type === 1 ? "text" : contestData.type === 2 ? "image" : "text";
        }
        mappedType = mappedType || "text";
        console.log('설정할 프롬프트 타입:', mappedType, '원본 타입:', contestData.type, '타입 체크:', typeof contestData.type);
        setSelectedPromptType(mappedType);
        setContestType(contestData.type);
      } catch (error) {
        console.error('대회 정보 로드 실패:', error);
        alert('대회 정보를 불러오는데 실패했습니다.');
        router.back();
      } finally {
        setIsLoadingContest(false);
      }
    };
    
    loadContestData();
  }, [isSubmissionType, contestIdParam, router]);

  // Zustand store에서 폴더 리스트 가져오기
  const allFolders = folderStore.allFolderList;
  const pinnedFolders = allFolders.filter(folder => folder.isPinned);
  const normalFolders = allFolders.filter(folder => !folder.isPinned);

  // URL 파라미터의 folderId로 폴더 이름 찾기
  useEffect(() => {
    if (!isArchiveType || !selectedFolderId) return;

    const folder = allFolders.find(f => f.folderId === selectedFolderId);
    if (folder) {
      setSelectedFolder(folder.name);
    }
  }, [isArchiveType, selectedFolderId, allFolders]);

  // 수정 모드일 때 또는 아카이브로 이동할 때 기존 게시글 데이터 로드
  useEffect(() => {
    // 아카이브로 이동할 때 (type=my-space && postId 있음) 또는 수정 모드일 때
    const shouldLoadData = isEditMode || (postType === 'my-space' && postIdParam);
    if (!shouldLoadData) return;

    const loadArticleData = async () => {
      setIsLoadingArticle(true);
      try {
        // 산출물 수정 모드
        if (isSubmissionType && submissionIdParam && contestIdParam) {
          const contestId = parseInt(contestIdParam, 10);
          const submissionId = parseInt(submissionIdParam, 10);
          if (isNaN(contestId) || isNaN(submissionId)) {
            alert('잘못된 대회 ID 또는 산출물 ID입니다.');
            router.back();
            return;
          }

          // 내 산출물 수정은 조회 기간과 관계없이 항상 가능해야 하므로 getMySubmission 사용
          const { contestMySubmissionItem: submissionData } = await SubmissionAPI.getMySubmission(contestId);

          if (!submissionData) {
            alert('산출물을 찾을 수 없습니다.');
            router.back();
            return;
          }
          
          // submissionId가 일치하는지 확인 (보안을 위해)
          if (submissionData.submissionId !== submissionId) {
            alert('본인의 산출물만 수정할 수 있습니다.');
            router.back();
            return;
          }

          // 대회 정보도 가져와서 타입 설정
          const { contestData } = await ContestAPI.getDetail(contestId);
          console.log('수정 모드 - 대회 정보 로드:', contestData.type, '전체 데이터:', contestData);
          const typeMap: { [key: string]: string } = {
            "TEXT": "text",
            "IMAGE": "image",
            "text": "text",
            "image": "image",
            "이미지": "image",
            "텍스트": "text",
            "1": "text",  // PromptType.TEXT = 1
            "2": "image", // PromptType.IMAGE = 2
          };
          // 숫자 타입도 처리 (PromptType.TEXT = 1, PromptType.IMAGE = 2)
          let mappedType = typeMap[contestData.type] || typeMap[String(contestData.type)] || typeMap[String(contestData.type).toUpperCase()];
          if (!mappedType && typeof contestData.type === 'number') {
            mappedType = contestData.type === 1 ? "text" : contestData.type === 2 ? "image" : "text";
          }
          mappedType = mappedType || "text";
          console.log('수정 모드 - 설정할 프롬프트 타입:', mappedType, '원본 타입:', contestData.type, '타입 체크:', typeof contestData.type);
          setSelectedPromptType(mappedType);
          setContestType(contestData.type);

          // Lexical JSON 형식으로 변환하는 헬퍼 함수
          const textToLexicalJSON = (text: string) => {
            return JSON.stringify({
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: text,
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: null,
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                    textFormat: 0,
                    textStyle: '',
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                type: 'root',
                version: 1,
              },
            });
          };

          // 폼 데이터 채우기
          setDescriptionState(textToLexicalJSON(submissionData.description));
          setUsedPrompt(textToLexicalJSON(submissionData.prompt));
          
          // 결과 설정 (타입에 따라 다르게)
          const submissionType = typeMap[submissionData.type] || "text";
          if (submissionType === 'image' && submissionData.result) {
            // 이미지 타입인 경우
            const resultValue = submissionData.result;
            console.log('수정 모드 - 이미지 결과:', resultValue);
            
            // CloudFront URL인지 S3 key인지 확인
            let imageUrl: string;
            let s3Key: string;
            
            if (resultValue.startsWith('http://') || resultValue.startsWith('https://')) {
              // CloudFront URL인 경우
              imageUrl = resultValue;
              s3Key = extractS3KeyFromUrl(resultValue);
            } else {
              // S3 key인 경우
              s3Key = resultValue;
              imageUrl = `https://d3qr7nnlhj7oex.cloudfront.net/${resultValue}`;
            }
            
            console.log('수정 모드 - 이미지 설정:', { imageUrl, s3Key });
            
            setAnswerPrompt('');
            setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
            setUploadedImageKey(s3Key); // 전송용: S3 key만
            setGeneratedImageUrl(imageUrl);
            setGeneratedImageKey(s3Key);
          } else {
            // 텍스트 타입인 경우
            setAnswerPrompt(textToLexicalJSON(submissionData.result));
          }

          setIsLoadingArticle(false);
          return;
        }

        // 커뮤니티 게시글 수정 모드 또는 아카이브로 이동할 때
        if (postIdParam && (postType === 'community' || postType === 'my-space')) {
          const postId = parseInt(postIdParam, 10);
          if (isNaN(postId)) {
            alert('잘못된 게시글 ID입니다.');
            router.back();
            return;
          }

          const { communityPostDetailData } = await CommunityPostAPI.getDetail(postId);

          if (!communityPostDetailData) {
            alert('게시글을 찾을 수 없습니다.');
            router.back();
            return;
          }

          // Lexical JSON 형식으로 변환하는 헬퍼 함수
          const textToLexicalJSON = (text: string) => {
            return JSON.stringify({
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: text,
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: null,
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                    textFormat: 0,
                    textStyle: '',
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                type: 'root',
                version: 1,
              },
            });
          };

          // 타입 변환
          const promptTypeMap: { [key: string]: "text" | "image" } = {
            "1": "text",
            "2": "image",
            "TEXT": "text",
            "IMAGE": "image",
            "text": "text",
            "image": "image",
            "텍스트": "text",
            "이미지": "image"
          };

          console.log('커뮤니티 원본 타입:', communityPostDetailData.type, '타입:', typeof communityPostDetailData.type);
          let mappedType = promptTypeMap[String(communityPostDetailData.type)] || "text";

          // fileUrl이 있으면 이미지 타입으로 설정
          if (communityPostDetailData.fileUrl) {
            mappedType = "image";
          }
          console.log('커뮤니티 매핑된 타입:', mappedType);

          // 카테고리 변환 (API 코드 -> 표시 이름)
          const categoryMap: { [key: string]: string } = {
            "WORK": "work",
            "DEV": "dev",
            "DESIGN": "design",
            "JOB": "job",
            "EDU": "edu",
            "LIFE": "life",
            "ETC": "etc",
          };
          const mappedCategory = categoryMap[communityPostDetailData.category] || "work";

          // 프롬프트 타입과 카테고리 먼저 설정
          setSelectedPromptType(mappedType);
          setSelectedCategory(mappedCategory);

          // 폼 데이터 채우기
          setTitle(communityPostDetailData.title);
          setTags(communityPostDetailData.tags);
          setDescriptionState(textToLexicalJSON(communityPostDetailData.description));
          setUsedPrompt(textToLexicalJSON(communityPostDetailData.prompt));
          setExamplePrompt(textToLexicalJSON(communityPostDetailData.sampleQuestion));

          // fileUrl이 있으면 이미지 설정
          if (communityPostDetailData.fileUrl) {
            const imageUrl = communityPostDetailData.fileUrl;
            const s3Key = extractS3KeyFromUrl(imageUrl);
            setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
            setUploadedImageKey(s3Key); // 전송용: S3 key만
          }

          setIsLoadingArticle(false);
          return;
        }

        // 아카이브 게시글 수정 모드
        if (articleIdParam) {
          const spaceId = spaceStore.currentSpace?.spaceId;
          if (!spaceId) {
            alert('스페이스 정보를 찾을 수 없습니다.');
            router.back();
            return;
          }

          const articleId = parseInt(articleIdParam, 10);
          if (isNaN(articleId)) {
            alert('잘못된 게시글 ID입니다.');
            router.back();
            return;
          }

          const data = await SpaceAPI.getArchiveArticleDetail(spaceId, articleId);

          if (!data) {
            alert('게시글을 찾을 수 없습니다.');
            router.back();
            return;
          }

          // Lexical JSON 형식으로 변환하는 헬퍼 함수
          const textToLexicalJSON = (text: string) => {
          return JSON.stringify({
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: text,
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: null,
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          });
        };

          // 타입 변환: 숫자 -> 문자열
          const promptTypeMap: { [key: string]: "text" | "image" } = {
            "1": "text",
            "2": "image",
            "TEXT": "text",
            "IMAGE": "image",
            "text": "text",
            "image": "image",
            "텍스트": "text",
            "이미지": "image"
          };

          console.log('아카이브 원본 타입:', data.type, '타입:', typeof data.type);
          const mappedType = promptTypeMap[String(data.type)] || "text";
          console.log('매핑된 타입:', mappedType);

          // 프롬프트 타입 먼저 설정
          setSelectedPromptType(mappedType);

          // 폼 데이터 채우기
          setTitle(data.title);
          setTags(data.tags);
          setDescriptionState(textToLexicalJSON(data.description));
          setUsedPrompt(textToLexicalJSON(data.prompt));
          setExamplePrompt(textToLexicalJSON(data.sampleQuestion));

          // 이미지 타입인 경우 fileUrl 설정
          if (mappedType === 'image' && data.fileUrl) {
            const imageUrl = data.fileUrl;
            const s3Key = extractS3KeyFromUrl(imageUrl);
            setUploadedImageUrl(imageUrl); // 렌더링용: 전체 URL
            setUploadedImageKey(s3Key); // 전송용: S3 key만
          }
        }
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        router.back();
      } finally {
        setIsLoadingArticle(false);
      }
    };

    loadArticleData();
  }, [isEditMode, articleIdParam, postIdParam, submissionIdParam, contestIdParam, isSubmissionType, postType, spaceStore.currentSpace?.spaceId, router]);

  // 폴더 변경 시 쿼리 파라미터 업데이트
  const handleFolderChange = (newFolder: string, newFolderId : number) => {
    setSelectedFolder(newFolder);
    setSelectedFolderId(newFolderId);

    // 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams.toString());
    params.set("folder", newFolder);

    router.replace(`/post?${params.toString()}`, { scroll: false });
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    // 산출물 제출 모드일 때는 다른 검증
    if (isSubmissionType) {
      if (!descriptionState.trim()) {
        alert('설명을 입력해주세요.');
        return;
      }

      if (!usedPrompt.trim()) {
        alert('프롬프트를 입력해주세요.');
        return;
      }

      // 결과 검증 (텍스트 타입은 answerPrompt, 이미지 타입은 이미지 키)
      if (selectedPromptType === 'text') {
        if (!answerPrompt.trim()) {
          alert('결과를 입력해주세요.');
          return;
        }
      } else if (selectedPromptType === 'image') {
        // 이미지 키 상태 확인 (디버깅용)
        console.log('제출 시 이미지 키 상태 확인:', {
          generatedImageKey,
          uploadedImageKey,
          generatedImageUrl,
          uploadedImageUrl,
          answerPrompt: answerPrompt.trim()
        });
        
        if (!generatedImageKey && !uploadedImageKey && !answerPrompt.trim()) {
          alert('결과 이미지를 업로드하거나 AI로 생성하거나 텍스트로 입력해주세요.');
          return;
        }
      }

      // 산출물 제출/수정 API 호출
      if (!contestIdParam) {
        alert('대회 ID가 없습니다.');
        return;
      }

      try {
        const contestId = parseInt(contestIdParam, 10);
        if (isNaN(contestId)) {
          alert('잘못된 대회 ID입니다.');
          return;
        }

        const description = convertLexicalToMarkdown(descriptionState);
        const prompt = convertLexicalToMarkdown(usedPrompt);
        let result = '';

        if (selectedPromptType === 'text') {
          result = convertLexicalToMarkdown(answerPrompt);
        } else if (selectedPromptType === 'image') {
          // 이미지 타입: 이미지 키 우선순위 (업로드 > AI 생성 > 텍스트)
          // 상태 값을 직접 확인
          const currentUploadedKey = uploadedImageKey;
          const currentGeneratedKey = generatedImageKey;
          
          console.log('이미지 키 확인 (제출 시점):', {
            currentUploadedKey,
            currentGeneratedKey,
            uploadedImageUrl,
            generatedImageUrl
          });
          
          if (currentUploadedKey && currentUploadedKey.trim()) {
            result = currentUploadedKey.trim();
          } else if (currentGeneratedKey && currentGeneratedKey.trim()) {
            result = currentGeneratedKey.trim();
          } else if (answerPrompt.trim()) {
            // 텍스트로 입력된 경우 (S3 key 형식일 수도 있음)
            const textResult = extractTextFromLexical(answerPrompt);
            // 이미 CloudFront URL이면 키로 변환, 아니면 그대로 사용
            result = extractS3KeyFromUrl(textResult) || textResult;
          }
          
          console.log('이미지 제출 데이터:', { 
            uploadedImageKey: currentUploadedKey, 
            generatedImageKey: currentGeneratedKey, 
            result,
            resultLength: result?.length,
            uploadedImageUrl,
            generatedImageUrl,
            selectedPromptType
          });
          
          // 이미지 타입인데 result가 비어있으면 에러
          if (!result || result.trim() === '') {
            console.error('이미지 키가 비어있음:', {
              uploadedImageKey: currentUploadedKey,
              generatedImageKey: currentGeneratedKey,
              answerPrompt: answerPrompt.trim(),
              selectedPromptType,
              uploadedImageUrl,
              generatedImageUrl
            });
            alert('이미지를 업로드하거나 AI로 생성해주세요.');
            return;
          }
          
          // result가 제대로 설정되었는지 최종 확인
          console.log('최종 result 값:', result, '타입:', typeof result, '길이:', result.length);
        }

        // API 호출 전 최종 확인
        console.log('제출 전 최종 데이터:', {
          contestId,
          prompt,
          description,
          result,
          selectedPromptType,
          isEditMode,
          submissionIdParam
        });

        // 산출물 수정 모드
        if (isEditMode && submissionIdParam) {
          const submissionId = parseInt(submissionIdParam, 10);
          if (isNaN(submissionId)) {
            alert('잘못된 산출물 ID입니다.');
            return;
          }

          console.log('수정 API 호출:', { contestId, submissionId, prompt, description, result });
          await SubmissionAPI.update(contestId, submissionId, prompt, description, result);

          console.log('산출물 수정 성공');
          alert('산출물이 성공적으로 수정되었습니다!');

          // 성공 후 대회 상세 페이지로 이동
          router.push(`/contest/${contestId}`);
        } else {
          // 산출물 생성 모드
          // API 요청 본문 확인
          const requestBody = {
            prompt,
            description,
            result,
          };
          console.log('생성 API 호출:', { contestId, ...requestBody });
          console.log('요청 본문 (JSON):', JSON.stringify(requestBody));
          const response = await SubmissionAPI.create(contestId, prompt, description, result);

          console.log('산출물 제출 성공:', response);
          alert('산출물이 성공적으로 제출되었습니다!');

          // 성공 후 대회 상세 페이지로 이동
          router.push(`/contest/${contestId}`);
        }
      } catch (error) {
        console.error('산출물 제출/수정 실패:', error);
        alert('산출물 제출/수정에 실패했습니다.');
      }
      return;
    }

    // 기존 검증 (커뮤니티/아카이브 게시글)
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!descriptionState.trim()) {
      alert('설명을 입력해주세요.');
      return;
    }

    if (!usedPrompt.trim()) {
      alert('사용 프롬프트를 입력해주세요.');
      return;
    }

    // 예시 질문과 답변은 선택 사항으로 변경 (필수 아님)
    // 이미지 타입일 때만 이미지 검증
    if (selectedPromptType === 'image') {
      // 이미지 타입일 때는 AI 생성 이미지나 업로드된 이미지 중 하나는 있어야 함
      if (!generatedImageKey && !uploadedImageKey) {
        alert('결과 이미지를 업로드하거나 AI로 생성해주세요.');
        return;
      }
    }

    try {
      // Lexical JSON에서 마크다운으로 변환
      const description = convertLexicalToMarkdown(descriptionState);
      const prompt = convertLexicalToMarkdown(usedPrompt);

      // 길이 검증
      if (title.length > 100) {
        alert('제목은 100자 이하로 입력해주세요.');
        return;
      }

      if (description.length > 300) {
        alert('설명은 300자 이하로 입력해주세요.');
        return;
      }

      // API 요청 데이터 구성 (기본 필드)
      const requestData: PostArticleRequest = {
        title: title.trim(),
        description: description.trim(),
        category: categoryStringToEnum(selectedCategory),
        prompt: prompt.trim(),
        promptType: promptTypeStringToEnum(selectedPromptType),
        tags: tags,
        sampleQuestion: '', // 기본값
        sampleAnswer: '', // 기본값
      };

      // 프롬프트 타입에 따라 추가 필드 설정
      if (selectedPromptType === 'text') {
        // 예시 질문과 답변은 선택 사항
        const sampleQuestion = examplePrompt.trim() ? convertLexicalToMarkdown(examplePrompt) : '';
        const sampleAnswer = answerPrompt.trim() ? convertLexicalToMarkdown(answerPrompt) : '';

        // 예시 질문이 있을 경우에만 길이 검증
        if (sampleQuestion && sampleQuestion.length > 200) {
          alert('예시 질문은 200자 이하로 입력해주세요.');
          return;
        }

        requestData.sampleQuestion = sampleQuestion.trim();
        requestData.sampleAnswer = sampleAnswer.trim();
      } else if (selectedPromptType === 'image') {
        // 이미지 타입: 업로드된 이미지 우선, 없으면 AI 생성 이미지
        requestData.filePath = uploadedImageKey || generatedImageKey;
      }

      console.log('제출 데이터:', requestData);

      // API 호출
      // 일반 게시글 or 아카이브 게시글 분기
      if(!isArchiveType){
        // 커뮤니티 게시글 수정 모드
        if (isEditMode && postIdParam) {
          const postId = parseInt(postIdParam, 10);
          if (isNaN(postId)) {
            alert('잘못된 게시글 ID입니다.');
            return;
          }

          const response = await PostAPI.putArticlePost(postId, requestData);

          console.log('게시글 수정 성공:', response);
          alert(`게시글이 성공적으로 수정되었습니다!`);

          // 성공 후 상세 페이지로 이동
          router.push(`/community/${postId}`);
        } else {
          // 커뮤니티 게시글 생성 모드
          const response = await PostAPI.postArticlePost(requestData);

          console.log('게시글 생성 성공:', response);
          alert(`게시글이 성공적으로 등록되었습니다!\n게시글 ID: ${response.postId}`);

          // 성공 후 이동 (커뮤니티 페이지 또는 상세 페이지로)
          router.push(`/community/${response.postId}`);
        }
      }else{
        // 아카이브 게시글 생성/수정
        if (!selectedFolderId) {
          alert('폴더를 선택해주세요.');
          return;
        }

        const spaceId = spaceStore.currentSpace?.spaceId;
        if (!spaceId) {
          alert('스페이스 정보를 찾을 수 없습니다.');
          return;
        }

        const articlePayload = {
          description : requestData.description,
          title : requestData.title,
          prompt : requestData.prompt,
          type : requestData.promptType,
          exampleQuestion : requestData.sampleQuestion,
          exampleAnswer : requestData.sampleAnswer,
          filePath : requestData.filePath || '',
          tags : requestData.tags
        };

        if (isEditMode && articleIdParam) {
          // 수정 모드
          const articleId = parseInt(articleIdParam, 10);
          console.log("아카이브 게시글 수정 로직 실행", { spaceId, folderId: selectedFolderId, articleId });

          const response = await SpaceAPI.putArchiveArticle(
            spaceId,
            selectedFolderId,
            articleId,
            articlePayload
          );

          if (response) {
            console.log('아카이브 게시글 수정 성공:', response);
            alert('게시글이 성공적으로 수정되었습니다!');

            // 성공 후 상세 페이지로 이동
            if (postType === 'my-space') {
              router.push(`/my-space/archive/${selectedFolderId}/${articleId}`);
            } else if (postType === 'team-space') {
              router.push(`/team-space/${spaceId}/${selectedFolderId}/${articleId}`);
            }
          }
        } else {
          // 생성 모드
          console.log("아카이브 게시글 생성 로직 실행", { spaceId, folderId: selectedFolderId });

          const response = await SpaceAPI.postArchiveArticleCreate(
            spaceId,
            selectedFolderId,
            articlePayload
          );

          console.log('아카이브 게시글 생성 성공:', response);
          alert(`아카이브 게시글이 성공적으로 등록되었습니다!\n게시글 ID: ${response?.articleId}`);

          // 성공 후 상세 페이지로 이동
          if (response?.articleId) {
            if (postType === 'my-space') {
              // 마이스페이스: /my-space/archive/[folderId]/[articleId]
              router.push(`/my-space/archive/${selectedFolderId}/${response.articleId}`);
            } else if (postType === 'team-space') {
              // 팀스페이스: /team-space/[spaceId]/[folderId]/[articleId]
              router.push(`/team-space/${spaceId}/${selectedFolderId}/${response.articleId}`);
            }
          }
        }
      }

    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 검증 (예: 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    try {
      // 1단계: presigned URL 받기
      const uploadData = await UploadAPI.getImagesS3Upload(file.name);
      if (!uploadData) {
        throw new Error('Presigned URL을 받아오지 못했습니다.');
      }

      // 2단계: S3에 이미지 업로드
      const uploadResult = await UploadAPI.uploadImageToS3({
        presignedUrl: uploadData.presignedUrl,
        file: file,
      });

      if (!uploadResult || !uploadResult.ok) {
        throw new Error('S3 업로드에 실패했습니다.');
      }

      // 업로드된 이미지 정보 저장
      // CloudFront URL 생성 (key를 사용)
      const cloudfrontUrl = `https://d3qr7nnlhj7oex.cloudfront.net/${uploadData.key}`;
      
      console.log('이미지 업로드 성공:', { 
        key: uploadData.key, 
        cloudfrontUrl,
        uploadData 
      });
      
      // 기존 AI 생성 이미지 제거 (단일 이미지만 허용)
      setGeneratedImageUrl("");
      setGeneratedImageKey("");
      
      // 새로운 업로드 이미지 설정
      setUploadedImageUrl(cloudfrontUrl);
      setUploadedImageKey(uploadData.key);
      
      console.log('이미지 상태 업데이트:', { 
        uploadedImageUrl: cloudfrontUrl, 
        uploadedImageKey: uploadData.key 
      });

      console.log('이미지 업로드 성공:', uploadData);
      alert('이미지가 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAISubmit = async () => {
    console.log('handleAISubmit 호출:', { selectedPromptType, isSubmissionType, contestType });
    
    // 입력 검증
    if (selectedPromptType == 'text' && !isSubmissionType && (!usedPrompt || !examplePrompt)) {
      alert('사용 프롬프트와 예시 질문을 모두 입력해주세요.');
      return;
    }
    else if (selectedPromptType == 'text' && isSubmissionType && !usedPrompt) {
      alert('프롬프트를 입력해주세요.');
      return;
    }
    else if(selectedPromptType == 'image' && !usedPrompt){
      alert('사용 프롬프트를 입력해주세요')
      return;
    }

    setIsGeneratingAnswer(true);

    try {

      

      if(selectedPromptType === 'text'){
        // Lexical JSON에서 텍스트 추출
        let systemMessage: string;
        let userMessage: string;
        
        if (isSubmissionType) {
          // submission 타입일 때는 프롬프트만 사용하고, 프롬프트를 exampleQuestion으로도 사용
          const promptText = extractTextFromLexical(usedPrompt);
          systemMessage = promptText;
          userMessage = promptText; // 프롬프트를 그대로 exampleQuestion으로 사용
        } else {
          // 일반 타입일 때는 기존대로
          const result = buildPromptFromLexical(usedPrompt, examplePrompt);
          systemMessage = result.systemMessage;
          userMessage = result.userMessage;
        }

        // PromptAPI를 통해 백엔드 호출
        const response = await PromptAPI.postTextPrompt({
          prompt: systemMessage,
          exampleQuestion: userMessage,
        });
      
      // 응답을 answerPrompt에 설정 (Lexical JSON 형식으로 변환)
      const lexicalAnswer = {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: response.exampleAnswer || '',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: null,
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      };
      
      console.log('AI 응답:', response.exampleAnswer );

      setAnswerPrompt(JSON.stringify(lexicalAnswer));


      } else if (selectedPromptType === 'image'){
       const { systemMessage } = buildPromptFromLexical(usedPrompt);
        console.log("system ",systemMessage);
       const response = await PromptAPI.postImagePrompt({
          prompt: systemMessage,
        })

        console.log('AI 이미지 생성 응답:', response);

        //그냥 이미지 URL
        const url = response.cloudfrontUrl;

        //back 에 넣어야 할 image key (s3 key)
        const key = response.key;
        
        // 키가 없으면 에러
        if (!key || key.trim() === '') {
          console.error('이미지 키가 없음:', response);
          alert('이미지 생성에 실패했습니다. 키가 없습니다.');
          setIsGeneratingAnswer(false);
          return;
        }
        
        console.log('AI 이미지 생성 성공:', { 
          url, 
          key, 
          response 
        });

        // 기존 업로드된 이미지 제거 (단일 이미지만 허용)
        setUploadedImageUrl("");
        setUploadedImageKey("");
        
        // AI 생성 이미지 상태 업데이트
        setGeneratedImageUrl(url);
        setGeneratedImageKey(key);
        
        console.log('AI 이미지 상태 업데이트 완료:', { 
          url, 
          key 
        });

      } 


      alert('AI 응답이 생성되었습니다!');

      // AI 생성 후 토큰 잔량 업데이트
      try {
        const tokenData = await authAPI.getRestToken();
        setRemainingTokens(tokenData.usableToken);
      } catch (error) {
        console.error('토큰 잔량 업데이트 실패:', error);
      }

    } catch (error) {
      console.error('AI 생성 요청 실패:', error);
      alert('AI 응답 생성에 실패했습니다. 콘솔을 확인하세요.');
    } finally {
      setIsGeneratingAnswer(false);
    }
  }



  // Todo : 실제 사용할 아이콘으로 변경 예정
  // 간단한 아이콘 생성 함수
  const createIcon = (iconPath: string) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
  );

  // 카테고리 데이터
  const categoryItems: PostingFloatingItemProps[] = [
    {
      id: "work",
      icon: createIcon("M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"),
      label: "업무",
      value: "work",
    },
    {
      id: "dev",
      icon: createIcon("M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"),
      label: "개발",
      value: "dev",
    },
    {
      id: "design",
      icon: createIcon("M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"),
      label: "디자인/창작",
      value: "design",
    },
    {
      id: "job",
      icon: createIcon("M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"),
      label: "취업",
      value: "job",
    },
    {
      id: "edu",
      icon: createIcon("M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"),
      label: "교육",
      value: "edu",
    },
    {
      id: "life",
      icon: createIcon("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
      label: "일상",
      value: "life",
    },
    {
      id: "etc",
      icon: createIcon("M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"),
      label: "기타",
      value: "etc",
    },
  ];

  // 프롬프트 타입 데이터
  const promptTypeItems: PostingFloatingItemProps[] = [
    {
      id: "text",
      icon: createIcon("M4 6h16M4 10h16M4 14h8M4 18h8"),
      label: "텍스트",
      value: "text",
    },
    {
      id: "image",
      icon: createIcon("M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"),
      label: "이미지",
      value: "image",
    },
  ];

  // 로딩 중일 때
  if (isLoadingArticle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-gray-600">게시글을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 토큰 잔량 표시 - Sticky */}
      <div className="sticky top-0 z-50 bg-gray-50 pt-4 pb-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">AI 토큰</span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            {isLoadingTokens ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500">로딩 중...</span>
              </div>
            ) : remainingTokens !== null ? (
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold text-primary">{remainingTokens.toLocaleString()}</span>
                <span className="text-sm text-gray-500">개 남음</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">조회 실패</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">

        {/* 페이지 제목 표시
        {isEditMode && !isSubmissionType && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">게시글 수정</h1>
            <p className="text-sm text-gray-600 mt-1">기존 내용을 수정한 후 저장하세요.</p>
          </div>
        )} */}

        {isSubmissionType && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">산출물 제출</h1>
            <p className="text-sm text-gray-600 mt-1">대회에 제출할 산출물을 작성해주세요.</p>
          </div>
        )}

        {/* 제목과 해시태그는 submission 타입이 아닐 때만 표시 */}
        {!isSubmissionType && (
          <>
            <div className="mb-4">
              <TitleInput value={title} onChange={setTitle} placeholder="제목을 입력하세요"/>
            </div>
            <div className="mb-4">
              <HashtagInput tags={tags} onTagsChange={setTags} />
            </div>
          </>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* 글 작성 컨테이너 (8 비율) */}
          <div className="lg:col-span-4 space-y-4">
            {/* 설명 */}
            <PostingWriteSection
              title="설명"
              placeholder="텍스트를 입력하세요..."
              onChange={setDescriptionState}
              value={descriptionState}
              isSubmitButton={false}
            />

            {/* 사용 프롬프트 */}
            <PostingWriteSection
              title="프롬프트"
              placeholder="프롬프트를 입력하세요..."
              onChange={(content) => {
                setUsedPrompt(content);
                setPromptError(false);
              }}
              value={usedPrompt}
              isSubmitButton={selectedPromptType === 'image' || (isSubmissionType && selectedPromptType === 'text')}
              onSubmit={handleAISubmit}
              isLoading={isGeneratingAnswer}
            />

            {/* submission 타입일 때는 예시 질문 없이 바로 결과 표시 */}
            {isSubmissionType ? (
              selectedPromptType === 'text' ? (
                <PostingWriteSection
                  title="결과"
                  placeholder="결과를 입력하세요..."
                  onChange={setAnswerPrompt}
                  value={answerPrompt}
                  isSubmitButton={false}
                />
              ) : (
                <div>
                  {/* 결과 사진 업로드 섹션 */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">결과</h3>

                    {/* AI 생성 이미지가 있는 경우 표시 */}
                    {generatedImageUrl && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">AI 생성 이미지</p>
                          <button
                            type="button"
                            onClick={() => {
                              setGeneratedImageUrl("");
                              setGeneratedImageKey("");
                            }}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            제거
                          </button>
                        </div>
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                          <Image
                            src={generatedImageUrl}
                            alt="AI 생성 이미지"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* 업로드된 이미지가 있는 경우 표시 */}
                    {uploadedImageUrl && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">업로드된 이미지</p>
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedImageUrl("");
                              setUploadedImageKey("");
                            }}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            제거
                          </button>
                        </div>
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
                          <Image
                            src={uploadedImageUrl}
                            alt="업로드된 이미지"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}

                    {/* 이미지가 없을 때만 텍스트 입력 또는 업로드 UI 표시 */}
                    {!generatedImageUrl && !uploadedImageUrl && (
                      <>
                        {/* 텍스트 결과 입력 - title은 상위 h3에서 이미 표시되므로 제거 */}
                        <PostingWriteSection
                          title=""
                          placeholder="결과를 텍스트로 입력하거나 이미지를 업로드하세요..."
                          onChange={setAnswerPrompt}
                          value={answerPrompt}
                        />

                        {/* 이미지 업로드 버튼 */}
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            이미지를 업로드하거나
                            <br />
                            AI 생성 버튼을 눌러 이미지를 생성하세요
                          </span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}

                    {/* 이미지가 있을 때 추가 업로드 버튼 */}
                    {(generatedImageUrl || uploadedImageUrl) && (
                      <div className="mt-4">
                        <label
                          htmlFor="image-upload-replace"
                          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          이미지 변경
                          <input
                            id="image-upload-replace"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              selectedPromptType === 'text' ? (
                <div>
                      {/* 예시 질문 프롬프트 */}
                      <PostingWriteSection
                        title="예시 질문 프롬프트"
                        placeholder="예시 질문을 입력하세요..."
                        onChange={(content) => {
                          setExamplePrompt(content);
                          setExamplePromptError(false);
                        }}
                        value={examplePrompt}
                        isSubmitButton={true}
                        onSubmit={handleAISubmit}
                        isLoading={isGeneratingAnswer}
                        hasError={examplePromptError}
                        errorMessage="예시 질문을 입력해주세요. AI 답변 생성을 위해 필수 항목입니다."
                        dataField="example-prompt"
                      />

                      {/* 답변 프롬프트 */}
                      <PostingWriteSection
                        title="답변 프롬프트"
                        placeholder="답변을 입력하세요..."
                        onChange={setAnswerPrompt}
                        value={answerPrompt}
                      />
                  </div>
              ) : (
                <div>
                      {/* 결과 사진 업로드 섹션 */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">결과 사진</h3>

                        {/* AI 생성 이미지가 있는 경우 표시 */}
                        {generatedImageUrl && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-gray-700">AI 생성 이미지</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setGeneratedImageUrl("");
                                  setGeneratedImageKey("");
                                }}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                제거
                              </button>
                            </div>
                            <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                              <Image
                                src={generatedImageUrl}
                                alt="AI 생성 이미지"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}

                        {/* 업로드된 이미지가 있는 경우 표시 */}
                        {uploadedImageUrl && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-gray-700">업로드된 이미지</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedImageUrl("");
                                  setUploadedImageKey("");
                                }}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                제거
                              </button>
                            </div>
                            <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                              <Image
                                src={uploadedImageUrl}
                                alt="업로드된 이미지"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}

                        {/* 이미지가 없는 경우 업로드 UI */}
                        {!generatedImageUrl && !uploadedImageUrl && (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <label
                              htmlFor="image-upload"
                              className="cursor-pointer flex flex-col items-center"
                            >
                              <Upload className="w-12 h-12 text-gray-400 mb-3" />
                              <span className="text-sm font-medium text-gray-700 mb-1">
                                이미지를 업로드하거나
                              </span>
                              <span className="text-xs text-gray-500">
                                AI 생성 버튼을 눌러 이미지를 생성하세요
                              </span>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}

                        {/* 이미지가 있을 때 추가 업로드 버튼 */}
                        {(generatedImageUrl || uploadedImageUrl) && (
                          <div className="mt-4">
                            <label
                              htmlFor="image-upload-additional"
                              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md cursor-pointer transition-colors"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              다른 이미지 업로드
                              <input
                                id="image-upload-additional"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                  </div>
              )
            )}

            {/* 프롬프트 작성 완료 버튼 */}
            <PostingFooter onSubmit={handleSubmit} />
          </div>

          {/* 플로팅 컨테이너 (2 비율) */}
          <div className="lg:col-span-1 space-y-4">

            {/* 카테고리 선택 - 커뮤니티 글쓰기일 때만 표시 (submission 타입 제외) */}
            {!isArchiveType && !isSubmissionType && (
              <PostingFloatingSection
                title="카테고리"
                items={categoryItems}
                selectedValue={selectedCategory}
                onSelect={setSelectedCategory}
                name="category"
              />
            )}

            {/* 아카이브 폴더 선택 - 아카이브 타입일 때만 표시 */}
            {isArchiveType && (
              <PostingArchiveFolderSection
                selectedFolder={selectedFolder}
                onFolderChange={handleFolderChange}
                pinnedFolders={pinnedFolders}
                normalFolders={normalFolders}
              />
            )}

            {/* 프롬프트 타입 - submission 타입일 때는 읽기 전용 */}
            <PostingFloatingSection
              title="프롬프트 타입"
              items={promptTypeItems}
              selectedValue={selectedPromptType}
              onSelect={isSubmissionType ? undefined : setSelectedPromptType}
              name="promptType"
            />
            {isSubmissionType && isLoadingContest && (
              <div className="text-sm text-gray-500 mt-2">대회 정보를 불러오는 중...</div>
            )}
          </div>
        </div>



      </div>
    </div>
  );
}

/**
 * PostPage component (Suspense로 감싼 메인 컴포넌트)
 * @description PostPage component is a post page component that displays the post page content
 * @returns {React.ReactNode}
 */
export default function PostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    }>
      <PostPageContent />
    </Suspense>
  );
}
