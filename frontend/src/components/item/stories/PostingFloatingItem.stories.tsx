import type { Meta, StoryObj } from '@storybook/react';
import PostingFloatingItem from '@components/item/PostingFloatingItem';
import { useState } from 'react';

const meta: Meta<typeof PostingFloatingItem> = {
  title: 'Components/Item/PostingFloatingItem',
  component: PostingFloatingItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '포스팅 플로팅 아이템 컴포넌트입니다. 라디오 버튼 형태로 옵션을 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: '아이콘 (React 노드)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: '라디오 버튼의 값',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: 'boolean',
      description: '선택 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    name: {
      control: 'text',
      description: '라디오 버튼 그룹 이름',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'option' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostingFloatingItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    icon: '📝',
    label: '일반 게시글',
    value: 'post',
    checked: false,
    name: 'postType',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 포스팅 플로팅 아이템입니다.',
      },
    },
  },
};

// 선택된 상태
export const Checked: Story = {
  args: {
    icon: '💡',
    label: '질문 게시글',
    value: 'question',
    checked: true,
    name: 'postType',
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태의 라디오 버튼입니다.',
      },
    },
  },
};

// 긴 라벨
export const LongLabel: Story = {
  args: {
    icon: '🔥',
    label: '개발 팁과 노하우를 공유하는 게시글',
    value: 'tips',
    checked: false,
    name: 'postType',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 라벨 텍스트를 가진 아이템입니다.',
      },
    },
  },
};

// 다양한 아이콘
export const DifferentIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState('post');

    return (
      <div className="space-y-2 max-w-md">
        <PostingFloatingItem
          id="post"
          icon="📝"
          label="일반 게시글"
          value="post"
          checked={selected === 'post'}
          name="postType"
          onChange={(e) => setSelected(e.target.value)}
        />
        <PostingFloatingItem
          id="question"
          icon="💡"
          label="질문 게시글"
          value="question"
          checked={selected === 'question'}
          name="postType"
          onChange={(e) => setSelected(e.target.value)}
        />
        <PostingFloatingItem
          id="tips"
          icon="🔥"
          label="팁과 노하우"
          value="tips"
          checked={selected === 'tips'}
          name="postType"
          onChange={(e) => setSelected(e.target.value)}
        />
        <PostingFloatingItem
          id="notice"
          icon="📢"
          label="공지사항"
          value="notice"
          checked={selected === 'notice'}
          name="postType"
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 아이콘과 라벨을 가진 라디오 버튼 그룹입니다. 하나를 선택하면 다른 것들은 자동으로 해제됩니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    icon: '🎨',
    label: '마우스를 올려보세요!',
    value: 'hover',
    checked: false,
    name: 'postType',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색이 변경되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 카테고리 선택 예시
export const CategorySelection: Story = {
  render: () => {
    const [category, setCategory] = useState('frontend');

    return (
      <div className="space-y-2 max-w-md">
        <h3 className="font-bold text-lg mb-4">카테고리 선택</h3>
        <PostingFloatingItem
          id="frontend"
          icon="⚛️"
          label="Frontend"
          value="frontend"
          checked={category === 'frontend'}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <PostingFloatingItem
          id="backend"
          icon="🔧"
          label="Backend"
          value="backend"
          checked={category === 'backend'}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <PostingFloatingItem
          id="mobile"
          icon="📱"
          label="Mobile"
          value="mobile"
          checked={category === 'mobile'}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <PostingFloatingItem
          id="design"
          icon="🎨"
          label="Design"
          value="design"
          checked={category === 'design'}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">선택된 카테고리: <strong>{category}</strong></p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '카테고리 선택 시나리오의 실제 사용 예시입니다.',
      },
    },
  },
};
