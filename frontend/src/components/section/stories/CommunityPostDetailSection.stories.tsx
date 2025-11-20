import type { Meta, StoryObj } from '@storybook/react';
import CommunityPostDetailSection from '@components/section/CommunityPostDetailSection';
import { CommunityPostItemProps, HashtagItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityPostDetailSection> = {
  title: 'Components/Section/CommunityPostDetailSection',
  component: CommunityPostDetailSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 게시물의 상세 정보를 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityPostDetailSection>;

const mockPost: CommunityPostItemProps = {
  postId: 1,
  title: 'ChatGPT 프롬프트 작성 완벽 가이드',
  description: '효과적인 ChatGPT 프롬프트를 작성하는 방법에 대해 알아봅니다.',
  prompt: '당신은 전문 프롬프트 엔지니어입니다. 다음 주제에 대해 자세히 설명해주세요...',
  sampleQuestion: 'AI에 대해 설명해주세요',
  sampleAnswer: 'AI는 인공지능을 의미하며...',
  category: 'AI',
  type: '가이드',
  author: '김개발',
  profileUrl: '/images/profile1.jpg',
  createdAt: '2024-01-15',
  fileUrl: '/images/sample.jpg',
};

const mockHashtags: HashtagItemProps[] = [
  { tag: 'AI' },
  { tag: '프롬프트' },
  { tag: 'ChatGPT' },
];

export const Default: Story = {
  args: {
    communityPostData: mockPost,
    hashtagList: mockHashtags,
  },
};

export const WithoutImage: Story = {
  args: {
    communityPostData: {
      ...mockPost,
      fileUrl: undefined,
    },
    hashtagList: mockHashtags,
  },
};

export const MinimalPost: Story = {
  args: {
    communityPostData: {
      postId: 1,
      title: '간단한 팁',
      description: '짧은 설명',
      prompt: '',
      sampleQuestion: '',
      sampleAnswer: '',
      category: 'AI',
      type: '팁',
      author: '작성자',
      profileUrl: '/images/profile.jpg',
      createdAt: '2024-01-15',
    },
    hashtagList: [{ tag: 'AI' }],
  },
};
