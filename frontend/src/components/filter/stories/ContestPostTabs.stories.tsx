import type { Meta, StoryObj } from '@storybook/react';
import ContestPostTabs from '@components/filter/ContestPostTabs';

const meta: Meta<typeof ContestPostTabs> = {
  title: 'Components/Filter/ContestPostTabs',
  component: ContestPostTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '대회 게시물 탭 컴포넌트입니다. 대회 상세와 리더보드 탭을 제공합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/contest/1',
        query: { tab: 'detail' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestPostTabs>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 대회 게시물 탭입니다.',
      },
    },
  },
};

// 대회 상세 페이지 컨텍스트
export const WithinContestDetailPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-primary text-white px-8 py-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/90 rounded-full mr-6"></div>
            <div>
              <h1 className="text-3xl font-semibold">React 컴포넌트 챌린지</h1>
              <p className="text-white/80 text-sm">
                창의적인 프롬프트로 경쟁하고 상을 받으세요
              </p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <Story />

        {/* 컨텐츠 */}
        <div className="max-w-7xl mx-auto p-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">대회 정보</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">대회 개요</h3>
                <p className="text-gray-600">
                  React를 사용하여 주어진 디자인을 구현하고, 최적화된 코드를
                  작성하는 것이 목표입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">참가 자격</h3>
                <p className="text-gray-600">
                  React 경험이 있는 모든 개발자가 참가할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '대회 상세 페이지 내에서의 탭 사용 예시입니다.',
      },
    },
  },
};

// 대회 상세 탭 활성화
export const DetailTabActive: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-2">
          <h1 className="text-3xl font-semibold">React 컴포넌트 챌린지</h1>
        </div>
        <Story />
        <div className="max-w-5xl mx-auto p-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">대회 개요</h3>
                <p className="text-gray-600">
                  이 대회는 프론트엔드 개발자들을 위한 코딩 챌린지입니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">대회 일정</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">접수 기간</div>
                    <div className="font-semibold">2025.01.15 ~ 2025.01.31</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">대회 기간</div>
                    <div className="font-semibold">2025.02.01 ~ 2025.02.28</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">결과 발표</div>
                    <div className="font-semibold">2025.03.15</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">시상 내역</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-yellow-50 rounded">
                    <span>🥇 1등</span>
                    <span className="font-bold text-primary">500만원</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>🥈 2등</span>
                    <span className="font-bold text-primary">300만원</span>
                  </div>
                  <div className="flex justify-between p-3 bg-orange-50 rounded">
                    <span>🥉 3등</span>
                    <span className="font-bold text-primary">200만원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '대회 상세 탭이 활성화된 상태입니다.',
      },
    },
  },
};

// 리더보드 탭 시뮬레이션
export const LeaderboardTabSimulation: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-2">
          <h1 className="text-3xl font-semibold">React 컴포넌트 챌린지</h1>
        </div>
        <Story />
        <div className="max-w-5xl mx-auto p-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="text-2xl font-bold">리더보드</h2>
              <p className="text-sm text-gray-600 mt-1">참가자 순위</p>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    닉네임
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    투표 수
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    마지막 제출
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { rank: 1, name: '최고개발자', votes: 5000, time: '2025-01-15 18:45' },
                  { rank: 2, name: '인기왕', votes: 4500, time: '2025-01-15 17:30' },
                  { rank: 3, name: '실력자', votes: 4200, time: '2025-01-15 16:20' },
                  { rank: 4, name: '열정개발자', votes: 3800, time: '2025-01-15 15:10' },
                  { rank: 5, name: '코딩마스터', votes: 3500, time: '2025-01-15 14:50' },
                ].map((item) => (
                  <tr
                    key={item.rank}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-right font-semibold">
                      {item.rank}
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-right">
                      {item.votes.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-500">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '리더보드 탭이 활성화된 상태를 시뮬레이션합니다.',
      },
    },
  },
};

// 전체 대회 상세 페이지
export const FullContestDetailPage: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-24 h-24 bg-white/90 rounded-xl mr-6 flex items-center justify-center">
                <span className="text-4xl">🏆</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">React 컴포넌트 챌린지</h1>
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                    진행중
                  </span>
                </div>
                <p className="text-white/90 mb-4">
                  React를 활용한 창의적인 컴포넌트 개발 대회
                </p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-white/80">참가자</span>
                    <span className="ml-2 font-semibold">156명</span>
                  </div>
                  <div>
                    <span className="text-white/80">마감</span>
                    <span className="ml-2 font-semibold">D-7</span>
                  </div>
                  <div>
                    <span className="text-white/80">상금</span>
                    <span className="ml-2 font-semibold">총 1,000만원</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors">
              참가 신청
            </button>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <ContestPostTabs />

      {/* 대회 상세 내용 */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-6">대회 개요</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                프론트엔드 개발자들을 위한 코딩 챌린지입니다. React를 사용하여
                주어진 디자인을 구현하고, 최적화된 코드를 작성하는 것이
                목표입니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                참가자들은 제한된 시간 내에 창의적이고 효율적인 컴포넌트를
                개발해야 합니다.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-6">참가 규칙</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>개인 또는 팀(최대 3명) 참가 가능</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>React 18 이상 버전 사용 필수</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>제출 기한 엄수</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>오픈소스 라이브러리 사용 가능</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold mb-4">대회 일정</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-600">접수 기간</div>
                  <div className="font-semibold">2025.01.15 ~ 2025.01.31</div>
                </div>
                <div>
                  <div className="text-gray-600">대회 기간</div>
                  <div className="font-semibold">2025.02.01 ~ 2025.02.28</div>
                </div>
                <div>
                  <div className="text-gray-600">결과 발표</div>
                  <div className="font-semibold">2025.03.15</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold mb-4">시상 내역</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span className="font-semibold">🥇 1등</span>
                  <span className="font-bold text-primary">500만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-semibold">🥈 2등</span>
                  <span className="font-bold text-primary">300만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="font-semibold">🥉 3등</span>
                  <span className="font-bold text-primary">200만원</span>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-lg p-6">
              <h3 className="font-bold mb-2">문의하기</h3>
              <p className="text-sm text-white/90 mb-4">
                대회 관련 문의사항이 있으신가요?
              </p>
              <button className="w-full py-2 bg-white text-primary rounded-lg font-semibold hover:bg-white/90">
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 대회 상세 페이지의 전체 레이아웃입니다.',
      },
    },
  },
};

// 호버 효과 테스트
export const HoverTest: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="mb-4 px-8 py-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 호버 효과 테스트</p>
          <p className="text-sm">각 탭에 마우스를 올려 색상 변화를 확인하세요</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '탭의 호버 효과를 테스트합니다.',
      },
    },
  },
};
