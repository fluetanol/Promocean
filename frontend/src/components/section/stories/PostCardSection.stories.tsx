import type { Meta, StoryObj } from '@storybook/react';
import PostCardSection from '@components/section/PostCardSection';
import { PostCardItemProps } from '@/types/itemType';

const meta: Meta<typeof PostCardSection> = {
  title: 'Components/Section/PostCardSection',
  component: PostCardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '포스트 카드 목록을 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    postSectionTitle: {
      description: '섹션 제목',
      control: 'text',
    },
    postCardList: {
      description: '포스트 카드 아이템 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCardSection>;

const mockPosts: PostCardItemProps[] = [
  {
    id: '1',
    title: 'ChatGPT 프롬프트 작성 가이드',
    hashtags: ['AI', '프롬프트', 'ChatGPT'],
    category: 'AI',
    likeCount: 142,
    commentCount: 23,
    image: 'https://images.unsplash.com/photo-1633356122544?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Midjourney로 멋진 이미지 만들기',
    hashtags: ['디자인', 'AI', 'Midjourney'],
    category: '디자인',
    likeCount: 98,
    commentCount: 15,
    image: 'https://images.unsplash.com/photo-1633356122545?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Claude를 활용한 코드 리뷰',
    hashtags: ['개발', 'AI', 'Claude'],
    category: '개발',
    likeCount: 76,
    commentCount: 12,
    image: 'https://images.unsplash.com/photo-1633356122546?w=800&h=600&fit=crop',
  },
];

export const Default: Story = {
  args: {
    postSectionTitle: '인기 게시물',
    postCardList: mockPosts,
  },
};

export const ManyPosts: Story = {
  args: {
    postSectionTitle: '최신 게시물',
    postCardList: Array.from({ length: 12 }, (_, i) => ({
      id: `${i + 1}`,
      title: `게시물 제목 ${i + 1}`,
      hashtags: ['react', 'typescript', 'nextjs'],
      category: ['AI', '디자인', '개발'][i % 3],
      likeCount: Math.floor(Math.random() * 200),
      commentCount: Math.floor(Math.random() * 50),
      image: `https://images.unsplash.com/photo-${1633356122544 + i}?w=800&h=600&fit=crop`,
    })),
  },
};

export const EmptyState: Story = {
  args: {
    postSectionTitle: '추천 게시물',
    postCardList: [],
  },
};
