import type { Meta, StoryObj } from '@storybook/react';
import SpaceArchiveItem from '@components/item/SpaceArchiveItem';
import { useState } from 'react';

const meta: Meta<typeof SpaceArchiveItem> = {
  title: 'Components/Item/SpaceArchiveItem',
  component: SpaceArchiveItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 아카이브 아이템 컴포넌트입니다. 아카이브 카드를 표시하며, 배경색과 제목을 지정할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '아카이브 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    bgColor: {
      control: 'text',
      description: 'Tailwind CSS 배경색 클래스 (예: bg-blue-200, bg-[#0949ad])',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    title: 'AI 챗봇',
    bgColor: 'bg-blue-200',
    isPinned: false,
    isTeamSpace: false,
    archiveItemListState: [],
    setArchiveItemListState: () => {},
    pinnedItemListState: [],
    setPinnedItemListState: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스페이스 아카이브 아이템입니다.',
      },
    },
  },
};

// 다양한 색상
export const DifferentColors: Story = {
  render: () => {
    const mockProps = {
      isPinned: false,
      isTeamSpace: false,
      archiveItemListState: [],
      setArchiveItemListState: () => {},
      pinnedItemListState: [],
      setPinnedItemListState: () => {},
    };
    return (
      <div className="flex flex-wrap gap-4">
        <SpaceArchiveItem title="AI 챗봇" bgColor="bg-blue-200" {...mockProps} />
        <SpaceArchiveItem title="이미지 생성" bgColor="bg-purple-200" {...mockProps} />
        <SpaceArchiveItem title="음성 인식" bgColor="bg-green-200" {...mockProps} />
        <SpaceArchiveItem title="텍스트 분석" bgColor="bg-yellow-200" {...mockProps} />
        <SpaceArchiveItem title="데이터 시각화" bgColor="bg-pink-200" {...mockProps} />
        <SpaceArchiveItem title="자동화 도구" bgColor="bg-indigo-200" {...mockProps} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색을 가진 아카이브 아이템들입니다.',
      },
    },
  },
};

// Hex 색상 사용
export const WithHexColor: Story = {
  render: () => {
    const mockProps = {
      isPinned: false,
      isTeamSpace: false,
      archiveItemListState: [],
      setArchiveItemListState: () => {},
      pinnedItemListState: [],
      setPinnedItemListState: () => {},
    };
    return (
      <div className="flex flex-wrap gap-4">
        <SpaceArchiveItem title="프로젝트 A" bgColor="bg-[#0949ad]" {...mockProps} />
        <SpaceArchiveItem title="프로젝트 B" bgColor="bg-[#ff6b6b]" {...mockProps} />
        <SpaceArchiveItem title="프로젝트 C" bgColor="bg-[#4ecdc4]" {...mockProps} />
        <SpaceArchiveItem title="프로젝트 D" bgColor="bg-[#ffe66d]" {...mockProps} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Hex 색상 코드를 사용한 아카이브 아이템들입니다. bg-[#색상코드] 형식으로 사용합니다.',
      },
    },
  },
};

// 그라데이션 색상
export const WithGradient: Story = {
  render: () => {
    const mockProps = {
      isPinned: false,
      isTeamSpace: false,
      archiveItemListState: [],
      setArchiveItemListState: () => {},
      pinnedItemListState: [],
      setPinnedItemListState: () => {},
    };
    return (
      <div className="flex flex-wrap gap-4">
        <SpaceArchiveItem title="디자인" bgColor="bg-gradient-to-br from-purple-400 to-pink-400" {...mockProps} />
        <SpaceArchiveItem title="개발" bgColor="bg-gradient-to-br from-blue-400 to-cyan-400" {...mockProps} />
        <SpaceArchiveItem title="마케팅" bgColor="bg-gradient-to-br from-orange-400 to-red-400" {...mockProps} />
        <SpaceArchiveItem title="기획" bgColor="bg-gradient-to-br from-green-400 to-teal-400" {...mockProps} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '그라데이션 배경색을 사용한 아카이브 아이템들입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    title: '아주 긴 아카이브 제목 테스트',
    bgColor: 'bg-rose-200',
    isPinned: false,
    isTeamSpace: false,
    archiveItemListState: [],
    setArchiveItemListState: () => {},
    pinnedItemListState: [],
    setPinnedItemListState: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목을 가진 아카이브 아이템입니다.',
      },
    },
  },
};

// 짧은 제목
export const ShortTitle: Story = {
  args: {
    title: 'AI',
    bgColor: 'bg-teal-200',
    isPinned: false,
    isTeamSpace: false,
    archiveItemListState: [],
    setArchiveItemListState: () => {},
    pinnedItemListState: [],
    setPinnedItemListState: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 제목을 가진 아카이브 아이템입니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    title: '마우스를 올려보세요!',
    bgColor: 'bg-amber-200',
    isPinned: false,
    isTeamSpace: false,
    archiveItemListState: [],
    setArchiveItemListState: () => {},
    pinnedItemListState: [],
    setPinnedItemListState: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 위로 올라가고, 밝기가 증가하며, 그림자가 강화되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 그리드 레이아웃
export const GridLayout: Story = {
  render: () => {
    const mockProps = {
      isPinned: false,
      isTeamSpace: false,
      archiveItemListState: [],
      setArchiveItemListState: () => {},
      pinnedItemListState: [],
      setPinnedItemListState: () => {},
    };
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SpaceArchiveItem title="React 프로젝트" bgColor="bg-blue-300" {...mockProps} />
        <SpaceArchiveItem title="Vue 프로젝트" bgColor="bg-green-300" {...mockProps} />
        <SpaceArchiveItem title="Angular 프로젝트" bgColor="bg-red-300" {...mockProps} />
        <SpaceArchiveItem title="Svelte 프로젝트" bgColor="bg-orange-300" {...mockProps} />
        <SpaceArchiveItem title="Next.js 프로젝트" bgColor="bg-gray-300" {...mockProps} />
        <SpaceArchiveItem title="Nuxt 프로젝트" bgColor="bg-emerald-300" {...mockProps} />
        <SpaceArchiveItem title="Remix 프로젝트" bgColor="bg-cyan-300" {...mockProps} />
        <SpaceArchiveItem title="Astro 프로젝트" bgColor="bg-purple-300" {...mockProps} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '그리드 레이아웃으로 여러 아카이브 아이템을 표시합니다.',
      },
    },
  },
};

// 카테고리별 그룹
export const GroupedByCategory: Story = {
  render: () => {
    const mockProps = {
      isPinned: false,
      isTeamSpace: false,
      archiveItemListState: [],
      setArchiveItemListState: () => {},
      pinnedItemListState: [],
      setPinnedItemListState: () => {},
    };
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-700">AI & ML</h3>
          <div className="flex flex-wrap gap-4">
            <SpaceArchiveItem title="챗봇 개발" bgColor="bg-blue-200" {...mockProps} />
            <SpaceArchiveItem title="이미지 인식" bgColor="bg-blue-300" {...mockProps} />
            <SpaceArchiveItem title="자연어 처리" bgColor="bg-blue-400" {...mockProps} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-700">웹 개발</h3>
          <div className="flex flex-wrap gap-4">
            <SpaceArchiveItem title="프론트엔드" bgColor="bg-purple-200" {...mockProps} />
            <SpaceArchiveItem title="백엔드" bgColor="bg-purple-300" {...mockProps} />
            <SpaceArchiveItem title="풀스택" bgColor="bg-purple-400" {...mockProps} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-700">디자인</h3>
          <div className="flex flex-wrap gap-4">
            <SpaceArchiveItem title="UI 디자인" bgColor="bg-pink-200" {...mockProps} />
            <SpaceArchiveItem title="UX 리서치" bgColor="bg-pink-300" {...mockProps} />
            <SpaceArchiveItem title="프로토타입" bgColor="bg-pink-400" {...mockProps} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '카테고리별로 그룹화된 아카이브 아이템들입니다.',
      },
    },
  },
};
