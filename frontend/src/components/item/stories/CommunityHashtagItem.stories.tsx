import type { Meta, StoryObj } from '@storybook/react';
import CommunityHashtagItem from '@components/item/CommunityHashtagItem';

const meta: Meta<typeof CommunityHashtagItem> = {
  title: 'Components/Item/CommunityHashtagItem',
  component: CommunityHashtagItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 해시태그 아이템 컴포넌트입니다. 클릭 가능한 태그를 표시하며, 호버 시 스타일이 변경됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'text',
      description: '해시태그 텍스트 (# 기호 제외)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityHashtagItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    tag: 'React',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 해시태그 아이템입니다.',
      },
    },
  },
};

// 다양한 해시태그
export const Various: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CommunityHashtagItem tag="React" />
      <CommunityHashtagItem tag="TypeScript" />
      <CommunityHashtagItem tag="NextJS" />
      <CommunityHashtagItem tag="TailwindCSS" />
      <CommunityHashtagItem tag="JavaScript" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 해시태그들을 표시합니다.',
      },
    },
  },
};

// 긴 태그
export const LongTag: Story = {
  args: {
    tag: 'FrontendDevelopment',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 해시태그 텍스트입니다.',
      },
    },
  },
};

// 짧은 태그
export const ShortTag: Story = {
  args: {
    tag: 'JS',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 해시태그 텍스트입니다.',
      },
    },
  },
};

// 프로그래밍 언어 태그
export const ProgrammingLanguages: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <CommunityHashtagItem tag="JavaScript" />
      <CommunityHashtagItem tag="TypeScript" />
      <CommunityHashtagItem tag="Python" />
      <CommunityHashtagItem tag="Java" />
      <CommunityHashtagItem tag="Go" />
      <CommunityHashtagItem tag="Rust" />
      <CommunityHashtagItem tag="C++" />
      <CommunityHashtagItem tag="Swift" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '프로그래밍 언어 관련 해시태그들입니다.',
      },
    },
  },
};

// 프레임워크 태그
export const Frameworks: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <CommunityHashtagItem tag="React" />
      <CommunityHashtagItem tag="Vue" />
      <CommunityHashtagItem tag="Angular" />
      <CommunityHashtagItem tag="NextJS" />
      <CommunityHashtagItem tag="Svelte" />
      <CommunityHashtagItem tag="NuxtJS" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '프레임워크 관련 해시태그들입니다.',
      },
    },
  },
};

// 주제 태그
export const Topics: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <CommunityHashtagItem tag="질문" />
      <CommunityHashtagItem tag="팁" />
      <CommunityHashtagItem tag="튜토리얼" />
      <CommunityHashtagItem tag="버그" />
      <CommunityHashtagItem tag="성능최적화" />
      <CommunityHashtagItem tag="코드리뷰" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '주제 관련 해시태그들입니다.',
      },
    },
  },
};

// 호버 테스트
export const HoverTest: Story = {
  args: {
    tag: 'HoverMe',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색과 텍스트 색상이 변경됩니다.',
      },
    },
  },
};

// 게시글의 해시태그 예시
export const PostHashtags: Story = {
  render: () => (
    <div className="max-w-2xl p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="font-bold text-lg mb-3">React Hooks 완벽 가이드</h3>
      <p className="text-gray-600 mb-4">
        React Hooks를 사용하면 함수형 컴포넌트에서도 상태 관리와 생명주기 기능을 사용할 수 있습니다.
      </p>
      <div className="flex flex-wrap gap-2">
        <CommunityHashtagItem tag="React" />
        <CommunityHashtagItem tag="Hooks" />
        <CommunityHashtagItem tag="Frontend" />
        <CommunityHashtagItem tag="JavaScript" />
        <CommunityHashtagItem tag="튜토리얼" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '게시글 하단에 표시되는 해시태그 예시입니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyTags: Story = {
  render: () => (
    <div className="max-w-2xl">
      <div className="flex flex-wrap gap-2">
        <CommunityHashtagItem tag="React" />
        <CommunityHashtagItem tag="TypeScript" />
        <CommunityHashtagItem tag="NextJS" />
        <CommunityHashtagItem tag="TailwindCSS" />
        <CommunityHashtagItem tag="JavaScript" />
        <CommunityHashtagItem tag="Frontend" />
        <CommunityHashtagItem tag="WebDevelopment" />
        <CommunityHashtagItem tag="Storybook" />
        <CommunityHashtagItem tag="Testing" />
        <CommunityHashtagItem tag="Performance" />
        <CommunityHashtagItem tag="Optimization" />
        <CommunityHashtagItem tag="CSS" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 줄에 걸쳐 표시되는 많은 해시태그들입니다.',
      },
    },
  },
};

// 숫자가 포함된 태그
export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CommunityHashtagItem tag="React18" />
      <CommunityHashtagItem tag="ES2023" />
      <CommunityHashtagItem tag="Node20" />
      <CommunityHashtagItem tag="TypeScript5" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '숫자가 포함된 해시태그들입니다.',
      },
    },
  },
};

// 한글 태그
export const KoreanTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CommunityHashtagItem tag="개발팁" />
      <CommunityHashtagItem tag="코딩" />
      <CommunityHashtagItem tag="프론트엔드" />
      <CommunityHashtagItem tag="백엔드" />
      <CommunityHashtagItem tag="풀스택" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '한글로 된 해시태그들입니다.',
      },
    },
  },
};
