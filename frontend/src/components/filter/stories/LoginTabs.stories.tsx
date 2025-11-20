import type { Meta, StoryObj } from '@storybook/react';
import LoginTabs from '@components/filter/LoginTabs';
import { useState } from 'react';

const meta: Meta<typeof LoginTabs> = {
  title: 'Components/Filter/LoginTabs',
  component: LoginTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '로그인/회원가입 탭 컴포넌트입니다. 로그인 페이지에서 로그인과 회원가입을 전환할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'radio',
      options: ['login', 'signup'],
      description: '활성화된 탭',
      table: {
        type: { summary: "'login' | 'signup'" },
      },
    },
    onTabChange: {
      action: 'tabChanged',
      description: '탭 변경 시 호출되는 콜백',
      table: {
        type: { summary: "(tab: 'login' | 'signup') => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginTabs>;

// 기본 스토리 - 로그인 탭
export const LoginTab: Story = {
  args: {
    activeTab: 'login',
    onTabChange: (tab) => console.log('Tab changed to:', tab),
  },
  parameters: {
    docs: {
      description: {
        story: '로그인 탭이 활성화된 상태입니다.',
      },
    },
  },
};

// 회원가입 탭
export const SignupTab: Story = {
  args: {
    activeTab: 'signup',
    onTabChange: (tab) => console.log('Tab changed to:', tab),
  },
  parameters: {
    docs: {
      description: {
        story: '회원가입 탭이 활성화된 상태입니다.',
      },
    },
  },
};

// 인터랙티브 탭
export const InteractiveTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
      <div className="bg-primary p-8 rounded-lg">
        <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6 p-4 bg-white/10 rounded text-white text-sm">
          현재 탭: <strong>{activeTab === 'login' ? '로그인' : '회원가입'}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '탭을 클릭하여 전환할 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 로그인 페이지 컨텍스트
export const WithinLoginPage: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* 로고 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">PromOcean</h1>
            <p className="text-white/80">프롬프트의 바다로 떠나보세요</p>
          </div>

          {/* 탭 */}
          <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 폼 */}
          <div className="bg-white rounded-lg p-8 shadow-xl">
            {activeTab === 'login' ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">로그인</h2>
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <button className="w-full py-3 bg-primary text-white rounded-md hover:brightness-110">
                  로그인
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">회원가입</h2>
                <input
                  type="text"
                  placeholder="닉네임"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                />
                <button className="w-full py-3 bg-primary text-white rounded-md hover:brightness-110">
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 로그인 페이지에서의 탭 사용 예시입니다.',
      },
    },
  },
};

// 호버 효과 테스트
export const HoverTest: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
      <div className="bg-primary p-8 rounded-lg">
        <div className="mb-4 p-4 bg-white/10 text-white rounded text-sm">
          <p className="font-semibold mb-2">💡 호버 효과 테스트</p>
          <p>비활성 탭에 마우스를 올려 색상 변화를 확인하세요</p>
        </div>
        <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '탭의 호버 효과를 테스트합니다.',
      },
    },
  },
};

// 다양한 배경에서
export const OnDifferentBackgrounds: Story = {
  render: () => {
    const [activeTab1, setActiveTab1] = useState<'login' | 'signup'>('login');
    const [activeTab2, setActiveTab2] = useState<'login' | 'signup'>('login');
    const [activeTab3, setActiveTab3] = useState<'login' | 'signup'>('login');

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Primary 배경 (기본)</h3>
          <div className="bg-primary p-8 rounded-lg">
            <LoginTabs activeTab={activeTab1} onTabChange={setActiveTab1} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
          <div className="bg-gray-900 p-8 rounded-lg">
            <LoginTabs activeTab={activeTab2} onTabChange={setActiveTab2} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">그라데이션 배경</h3>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg">
            <LoginTabs activeTab={activeTab3} onTabChange={setActiveTab3} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 배경에서의 탭 모습입니다.',
      },
    },
  },
};

// 전체 인증 플로우 시뮬레이션
export const FullAuthFlow: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [step, setStep] = useState<'form' | 'success'>('form');

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4"></div>
            <h1 className="text-4xl font-bold text-white mb-2">PromOcean</h1>
            <p className="text-white/90 text-lg">프롬프트의 바다로 떠나보세요</p>
          </div>

          {step === 'form' ? (
            <>
              <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="bg-white rounded-2xl p-8 shadow-2xl mt-6">
                {activeTab === 'login' ? (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">로그인</h2>
                      <p className="text-gray-600 text-sm">계정에 로그인하세요</p>
                    </div>
                    <input
                      type="email"
                      placeholder="이메일 주소"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => setStep('success')}
                      className="w-full py-3 bg-primary text-white rounded-lg hover:brightness-110 font-semibold"
                    >
                      로그인
                    </button>
                    <div className="text-center">
                      <a href="#" className="text-sm text-primary hover:underline">
                        비밀번호를 잊으셨나요?
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">회원가입</h2>
                      <p className="text-gray-600 text-sm">새 계정을 만드세요</p>
                    </div>
                    <input
                      type="text"
                      placeholder="닉네임"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="이메일 주소"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => setStep('success')}
                      className="w-full py-3 bg-primary text-white rounded-lg hover:brightness-110 font-semibold"
                    >
                      회원가입
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {activeTab === 'login' ? '로그인 성공!' : '회원가입 완료!'}
              </h2>
              <p className="text-gray-600 mb-6">
                {activeTab === 'login'
                  ? '환영합니다!'
                  : '이메일을 확인하여 인증을 완료해주세요.'}
              </p>
              <button
                onClick={() => setStep('form')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:brightness-110"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '로그인부터 성공까지 전체 인증 플로우를 시뮬레이션합니다.',
      },
    },
  },
};
