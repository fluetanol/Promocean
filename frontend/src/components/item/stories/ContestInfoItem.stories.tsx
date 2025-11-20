import type { Meta, StoryObj } from '@storybook/react';
import ContestInfoItem from '@components/item/ContestInfoItem';

const meta: Meta<typeof ContestInfoItem> = {
  title: 'Components/Item/ContestInfoItem',
  component: ContestInfoItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대회 정보 아이템 컴포넌트입니다. 제목과 내용을 표시하며, 내용은 문자열 또는 React 노드를 받을 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '정보 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      description: '정보 내용 (문자열 또는 React 노드)',
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContestInfoItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    title: '대회 개요',
    content: '이 대회는 프론트엔드 개발자들을 위한 코딩 챌린지입니다. React를 사용하여 주어진 디자인을 구현하고, 최적화된 코드를 작성하는 것이 목표입니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 대회 정보 아이템입니다.',
      },
    },
  },
};

// 여러 줄 내용
export const MultilineContent: Story = {
  args: {
    title: '참가 자격',
    content: `1. 만 18세 이상의 개인 또는 팀
2. 프론트엔드 개발 경험이 있는 자
3. React, TypeScript 사용 가능자
4. GitHub 계정 보유자`,
  },
  parameters: {
    docs: {
      description: {
        story: '여러 줄로 구성된 내용을 가진 아이템입니다. whitespace-pre-line으로 줄바꿈이 유지됩니다.',
      },
    },
  },
};

// 긴 내용
export const LongContent: Story = {
  args: {
    title: '대회 규칙',
    content: `본 대회는 공정하고 투명한 경쟁을 위해 다음과 같은 규칙을 적용합니다.

첫째, 모든 참가자는 독립적으로 작업해야 하며, 외부의 도움을 받거나 제출된 코드를 복사하는 행위는 금지됩니다.

둘째, 제출된 코드는 반드시 본인이 작성한 것이어야 하며, 오픈소스 라이브러리 사용 시 출처를 명시해야 합니다.

셋째, 제출 기한을 엄수해야 하며, 기한 이후 제출된 작품은 평가 대상에서 제외됩니다.

넷째, 심사 결과에 대한 이의 제기는 공식 채널을 통해서만 가능하며, 최종 결정은 운영진의 판단에 따릅니다.`,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용을 가진 대회 정보 아이템입니다.',
      },
    },
  },
};

// React 노드 내용
export const WithReactNode: Story = {
  args: {
    title: '시상 내역',
    content: (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">🥇 1등:</span>
          <span className="text-primary font-bold">500만원</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">🥈 2등:</span>
          <span className="text-primary font-bold">300만원</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">🥉 3등:</span>
          <span className="text-primary font-bold">200만원</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">🎖️ 우수상:</span>
          <span className="text-primary font-bold">100만원</span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'React 노드를 내용으로 사용하는 아이템입니다. 복잡한 레이아웃을 표현할 수 있습니다.',
      },
    },
  },
};

// 링크가 포함된 내용
export const WithLinks: Story = {
  args: {
    title: '참고 자료',
    content: (
      <div className="space-y-2">
        <p>대회 준비를 위한 참고 자료입니다:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a href="#" className="text-primary hover:underline">
              React 공식 문서
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:underline">
              TypeScript 가이드
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:underline">
              대회 FAQ
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '링크가 포함된 내용을 가진 아이템입니다.',
      },
    },
  },
};

// 짧은 내용
export const ShortContent: Story = {
  args: {
    title: '참가비',
    content: '무료',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 내용을 가진 대회 정보 아이템입니다.',
      },
    },
  },
};

// 전체 대회 정보 리스트
export const FullContestInfo: Story = {
  render: () => (
    <div className="max-w-3xl space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">대회 상세 정보</h2>

      <ContestInfoItem
        title="대회 개요"
        content="프론트엔드 개발자들을 위한 코딩 챌린지입니다. React를 사용하여 주어진 디자인을 구현하고, 최적화된 코드를 작성하는 것이 목표입니다."
      />

      <ContestInfoItem
        title="대회 일정"
        content={`접수 기간: 2025.01.15 ~ 2025.01.31
대회 기간: 2025.02.01 ~ 2025.02.28
결과 발표: 2025.03.15`}
      />

      <ContestInfoItem
        title="참가 자격"
        content={`1. 만 18세 이상의 개인 또는 팀
2. 프론트엔드 개발 경험이 있는 자
3. React, TypeScript 사용 가능자`}
      />

      <ContestInfoItem
        title="시상 내역"
        content={
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>🥇 1등:</span>
              <span className="font-bold text-primary">500만원</span>
            </div>
            <div className="flex justify-between">
              <span>🥈 2등:</span>
              <span className="font-bold text-primary">300만원</span>
            </div>
            <div className="flex justify-between">
              <span>🥉 3등:</span>
              <span className="font-bold text-primary">200만원</span>
            </div>
          </div>
        }
      />

      <ContestInfoItem
        title="참가비"
        content="무료"
      />

      <ContestInfoItem
        title="문의처"
        content={
          <div>
            <p>이메일: contest@example.com</p>
            <p>전화: 02-1234-5678</p>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '전체 대회 정보를 표시하는 예시입니다. 여러 ContestInfoItem을 조합하여 사용합니다.',
      },
    },
  },
};

// 강조된 내용
export const HighlightedContent: Story = {
  args: {
    title: '중요 공지',
    content: (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
        <p className="font-semibold text-yellow-800">
          제출 마감: 2025년 2월 28일 23:59까지
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          마감 시간 이후 제출된 작품은 심사 대상에서 제외됩니다.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '강조된 스타일의 내용을 가진 아이템입니다.',
      },
    },
  },
};
