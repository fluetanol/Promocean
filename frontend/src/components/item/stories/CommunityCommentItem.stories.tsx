import type { Meta, StoryObj } from '@storybook/react';
import CommunityCommentItem from '@components/item/CommunityCommentItem';

const meta: Meta<typeof CommunityCommentItem> = {
  title: 'Components/Item/CommunityCommentItem',
  component: CommunityCommentItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 댓글 아이템 컴포넌트입니다. 작성자의 프로필 이미지, 이름, 작성 시간 및 댓글 내용을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    author: {
      control: 'text',
      description: '댓글 작성자 이름',
      table: {
        type: { summary: 'string' },
      },
    },
    profileUrl: {
      control: 'text',
      description: '프로필 이미지 URL (선택사항)',
      table: {
        type: { summary: 'string | undefined' },
      },
    },
    content: {
      control: 'text',
      description: '댓글 내용',
      table: {
        type: { summary: 'string' },
      },
    },
    createdAt: {
      control: 'text',
      description: '작성 날짜 및 시간 (ISO 8601 형식)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityCommentItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    author: '김개발',
    profileUrl: undefined,
    content: '정말 유익한 글이네요! 많은 도움이 되었습니다.',
    createdAt: new Date().toISOString(),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 댓글 아이템입니다. 프로필 이미지가 없는 경우 기본 아이콘이 표시됩니다.',
      },
    },
  },
};

// 프로필 이미지가 있는 경우
export const WithProfileImage: Story = {
  args: {
    author: '박프론트',
    profileUrl: 'https://via.placeholder.com/40',
    content: '저도 같은 경험이 있어요. 특히 React Hook을 사용할 때 조심해야 할 부분이 많더라구요.',
    createdAt: '2025-01-15T14:30:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '프로필 이미지가 있는 댓글 아이템입니다.',
      },
    },
  },
};

// 긴 댓글
export const LongComment: Story = {
  args: {
    author: '이백엔드',
    profileUrl: undefined,
    content: `안녕하세요! 정말 좋은 글 감사합니다.

저도 최근에 비슷한 문제를 겪었는데, 해결 방법을 찾느라 많은 시행착오를 겪었습니다.

특히 useEffect의 의존성 배열을 잘못 설정해서 무한 루프에 빠진 경험이 있는데, 이 글을 보고 많은 깨달음을 얻었습니다.

앞으로도 이런 유익한 글 부탁드립니다!`,
    createdAt: '2025-01-14T09:15:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '여러 줄로 구성된 긴 댓글입니다. whitespace-pre-wrap으로 줄바꿈이 유지됩니다.',
      },
    },
  },
};

// 짧은 댓글
export const ShortComment: Story = {
  args: {
    author: '최개발자',
    profileUrl: 'https://via.placeholder.com/40',
    content: '감사합니다!',
    createdAt: '2025-01-16T16:45:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 댓글 아이템입니다.',
      },
    },
  },
};

// 여러 댓글 리스트
export const CommentList: Story = {
  render: () => (
    <div className="max-w-2xl border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">댓글 5개</h3>
      </div>
      <div className="bg-white">
        <CommunityCommentItem
          author="김개발"
          profileUrl=""
          content="정말 유익한 글이네요! 많은 도움이 되었습니다."
          createdAt="2025-01-15T10:30:00Z"
        />
        <CommunityCommentItem
          author="박프론트"
          profileUrl="https://via.placeholder.com/40"
          content="저도 같은 경험이 있어요. 특히 React Hook을 사용할 때 조심해야 할 부분이 많더라구요."
          createdAt="2025-01-15T11:20:00Z"
        />
        <CommunityCommentItem
          author="이백엔드"
          profileUrl=""
          content="질문이 있는데, 이 방법을 사용할 때 성능 이슈는 없나요?"
          createdAt="2025-01-15T12:15:00Z"
        />
        <CommunityCommentItem
          author="최디자이너"
          profileUrl="https://via.placeholder.com/40"
          content="UI/UX 관점에서도 좋은 패턴인 것 같습니다!"
          createdAt="2025-01-15T13:00:00Z"
        />
        <CommunityCommentItem
          author="정풀스택"
          profileUrl=""
          content="감사합니다! 실무에 바로 적용해볼게요."
          createdAt="2025-01-15T14:30:00Z"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 댓글이 리스트로 표시되는 예시입니다.',
      },
    },
  },
};

// 최근 작성된 댓글
export const RecentComment: Story = {
  args: {
    author: '신입개발자',
    profileUrl: 'https://via.placeholder.com/40',
    content: '방금 작성한 댓글입니다!',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5분 전
  },
  parameters: {
    docs: {
      description: {
        story: '최근에 작성된 댓글입니다.',
      },
    },
  },
};

// 오래된 댓글
export const OldComment: Story = {
  args: {
    author: '시니어개발자',
    profileUrl: undefined,
    content: '작년에 작성한 댓글입니다.',
    createdAt: '2024-03-15T10:00:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '오래 전에 작성된 댓글입니다.',
      },
    },
  },
};

// 이모지가 포함된 댓글
export const WithEmoji: Story = {
  args: {
    author: '이모지러버',
    profileUrl: 'https://via.placeholder.com/40',
    content: '와 정말 대박이에요! 👍👍👍\n완전 도움됐어요 😊\n감사합니다! 🙏',
    createdAt: new Date().toISOString(),
  },
  parameters: {
    docs: {
      description: {
        story: '이모지가 포함된 댓글입니다.',
      },
    },
  },
};

// 코드 블록이 포함된 댓글
export const WithCodeBlock: Story = {
  args: {
    author: '코드리뷰어',
    profileUrl: undefined,
    content: `좋은 방법이네요! 저는 이렇게 사용하고 있습니다:

const handleClick = () => {
  console.log('clicked');
};

이 방법도 괜찮을 것 같아요!`,
    createdAt: '2025-01-15T10:00:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '코드 블록이 포함된 댓글입니다.',
      },
    },
  },
};
