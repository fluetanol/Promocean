'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import PostingFloatingSection from "@/components/section/PostingFloatingSection";
import PostingWriteSection from "@/components/section/PostingWriteSection";
import PostingFooter from "@/components/layout/PostingFooter";
import PostingMetaFormSection from "@/components/section/PostingMetaFormSection";
import PostingArchiveFolderSection, { ArchiveFolderItem } from "@/components/section/PostingArchiveFolderSection";
import { PostingFloatingItemProps } from "@/types/itemType";
import TitleInput from "@/components/editor/TitleInput";
import HashtagInput from "@/components/editor/HashtagInput";
import { buildPromptFromLexical, extractTextFromLexical } from "@/utils/lexicalUtils";
import { PromptAPI } from "@/api/prompt";
import { PostAPI, PostArticleRequest } from "@/api/post";
import { categoryStringToEnum, promptTypeStringToEnum } from "@/types/postEnum";

/**
 * PostPageContent component (useSearchParams를 사용하는 내부 컴포넌트)
 */
function PostPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postType = searchParams.get("type"); // community, my-space, team-space
  const folderName = searchParams.get("folder"); // 아카이브 폴더 이름

  // 폼 상태 관리
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]); // 배열로 변경
  const [descriptionState, setDescriptionState] = useState("");
  const [usedPrompt, setUsedPrompt] = useState("");
  const [examplePrompt, setExamplePrompt] = useState("");
  const [answerPrompt, setAnswerPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [selectedPromptType, setSelectedPromptType] = useState("text");
  const [selectedFolder, setSelectedFolder] = useState(folderName || "");

  // 아카이브 폴더 상태
  const [pinnedFolders, setPinnedFolders] = useState<ArchiveFolderItem[]>([]);
  const [normalFolders, setNormalFolders] = useState<ArchiveFolderItem[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);

  // AI 답변 생성 로딩 상태
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);

  // 아카이브 타입인지 확인
  const isArchiveType = postType === 'my-space' || postType === 'team-space';

  // 아카이브 폴더 데이터 가져오기
  useEffect(() => {
    if (!isArchiveType) return;

    const fetchArchiveFolders = async () => {
      setIsLoadingFolders(true);
      try {
        // TODO: 백엔드 API 연결 후 수정 필요
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mock/MySpaceArchiveData.json`,
        //   { cache: "no-store" }
        // );
        // const data = await response.json();

        setPinnedFolders([]);
        setNormalFolders([]);
      } catch (error) {
        console.error("Failed to fetch archive folders:", error);
      } finally {
        setIsLoadingFolders(false);
      }
    };

    fetchArchiveFolders();
  }, [isArchiveType]);

  // 폴더 변경 시 쿼리 파라미터 업데이트
  const handleFolderChange = (newFolder: string) => {
    setSelectedFolder(newFolder);

    // 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams.toString());
    params.set("folder", newFolder);

    router.replace(`/post?${params.toString()}`, { scroll: false });
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    // 필수 입력 검증
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

    if (selectedPromptType === 'text') {
      if (!examplePrompt.trim()) {
        alert('예시 질문 프롬프트를 입력해주세요.');
        return;
      }

      if (!answerPrompt.trim()) {
        alert('답변 프롬프트를 입력해주세요.');
        return;
      }
    }

    try {
      // Lexical JSON에서 텍스트 추출
      const description = extractTextFromLexical(descriptionState);
      const prompt = extractTextFromLexical(usedPrompt);
      const sampleQuestion = extractTextFromLexical(examplePrompt);
      const sampleAnswer = extractTextFromLexical(answerPrompt);

      // 길이 검증
      if (title.length > 100) {
        alert('제목은 100자 이하로 입력해주세요.');
        return;
      }

      if (description.length > 300) {
        alert('설명은 300자 이하로 입력해주세요.');
        return;
      }

      if (sampleQuestion.length > 200) {
        alert('예시 질문은 200자 이하로 입력해주세요.');
        return;
      }

      // API 요청 데이터 구성
      const requestData: PostArticleRequest = {
        title: title.trim(),
        description: description.trim(),
        category: categoryStringToEnum(selectedCategory),
        prompt: prompt.trim(),
        promptType: promptTypeStringToEnum(selectedPromptType),
        sampleQuestion: sampleQuestion.trim(),
        sampleAnswer: sampleAnswer.trim(),
        tags: tags,
      };

      console.log('제출 데이터:', requestData);

      // API 호출
      const response = await PostAPI.postArticlePost(requestData);

      console.log('게시글 생성 성공:', response);
      alert(`게시글이 성공적으로 등록되었습니다!\n게시글 ID: ${response.postId}`);

      // 성공 후 이동 (커뮤니티 페이지 또는 상세 페이지로)
      router.push(`/community/${response.postId}`);

    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAISubmit = async () => {
    // 입력 검증
    if (!usedPrompt || !examplePrompt) {
      alert('사용 프롬프트와 예시 질문을 모두 입력해주세요.');
      return;
    }

    setIsGeneratingAnswer(true);

    try {
      // Lexical JSON에서 텍스트 추출
      const { systemMessage, userMessage } = buildPromptFromLexical(usedPrompt, examplePrompt);

      console.log('추출된 텍스트:');
      console.log('사용 프롬프트:', systemMessage);
      console.log('예시 질문:', userMessage);

      // PromptAPI를 통해 백엔드 호출
      const response = await PromptAPI.postTextPrompt({
        prompt: systemMessage,
        exampleQuestion: userMessage,
      });

      console.log('AI 응답:', response.exampleAnswer);

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

      setAnswerPrompt(JSON.stringify(lexicalAnswer));
      alert('AI 응답이 생성되었습니다!');

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
      id: "edu",
      icon: createIcon("M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"),
      label: "교육",
      value: "edu",
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
      label: "디자인",
      value: "design",
    },
    {
      id: "data",
      icon: createIcon("M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"),
      label: "데이터",
      value: "data",
    },
    {
      id: "marketing",
      icon: createIcon("M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"),
      label: "마케팅",
      value: "marketing",
    },
    {
      id: "life",
      icon: createIcon("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
      label: "생활",
      value: "life",
    },
    {
      id: "creation",
      icon: createIcon("M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"),
      label: "창작",
      value: "creation",
    },
    {
      id: "ai",
      icon: createIcon("M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"),
      label: "AI",
      value: "ai",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4">
          <TitleInput value={title} onChange={setTitle} placeholder="제목을 입력하세요"/>
        </div>
        <div className="mb-4">
          <HashtagInput tags={tags} onTagsChange={setTags} />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* 글 작성 컨테이너 (8 비율) */}
          <div className="lg:col-span-4 space-y-4">
            {/* 사용 프롬프트 */}
            <PostingWriteSection
              title="설명"
              placeholder="텍스트를 입력하세요..."
              onChange={setDescriptionState}
              isSubmitButton={selectedPromptType === 'image'}
            />

            {/* 사용 프롬프트 */}
            <PostingWriteSection
              title="사용 프롬프트"
              placeholder="사용한 프롬프트를 입력하세요..."
              onChange={setUsedPrompt}
              isSubmitButton={selectedPromptType === 'image'}
            />

            {
              selectedPromptType === 'text' ? (
                <div>
                      {/* 예시 질문 프롬프트 */}
                      <PostingWriteSection
                        title="예시 질문 프롬프트"
                        placeholder="예시 질문을 입력하세요..."
                        onChange={setExamplePrompt}
                        isSubmitButton={true}
                        onSubmit={handleAISubmit}
                        isLoading={isGeneratingAnswer}
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
                      {/* 답변 프롬프트 */}
                      <PostingWriteSection
                        title="결과 사진"
                        placeholder="결과 사진을 첨부하세요..."
                        onChange={setAnswerPrompt}
                      />
                  </div>
              )
            }

            {/* 프롬프트 작성 완료 버튼 */}
            <PostingFooter onSubmit={handleSubmit} />
          </div>

          {/* 플로팅 컨테이너 (2 비율) */}
          <div className="lg:col-span-1 space-y-4">

            {/* 카테고리 선택 */}
            <PostingFloatingSection
              title="카테고리"
              items={categoryItems}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              name="category"
            />

            {/* 아카이브 폴더 선택 - 아카이브 타입일 때만 표시 */}
            {isArchiveType && (
              isLoadingFolders ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <p className="text-sm text-gray-500 text-center py-4">폴더 목록 로딩 중...</p>
                </div>
              ) : (
                <PostingArchiveFolderSection
                  selectedFolder={selectedFolder}
                  onFolderChange={handleFolderChange}
                  pinnedFolders={pinnedFolders}
                  normalFolders={normalFolders}
                />
              )
            )}

            {/* 프롬프트 타입 */}
            <PostingFloatingSection
              title="프롬프트 타입"
              items={promptTypeItems}
              selectedValue={selectedPromptType}
              onSelect={setSelectedPromptType}
              name="promptType"
            />
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
