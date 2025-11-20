import type { Meta, StoryObj } from '@storybook/react';
import SignUpForm from '@components/form/SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Form/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '회원가입 폼 컴포넌트입니다. 이메일, 비밀번호, 비밀번호 확인, 닉네임을 입력받아 회원가입을 처리합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 회원가입 폼입니다.',
      },
    },
  },
};

// 회원가입 페이지 컨텍스트
export const WithinSignUpPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary text-3xl font-bold">P</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">PromOcean</h1>
            <p className="text-white/90 text-lg">새로운 계정 만들기</p>
          </div>

          {/* 폼 */}
          <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <Story />
          </div>

          {/* 추가 링크 */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-sm">
              이미 계정이 있으신가요?{' '}
              <a href="#" className="text-white font-semibold hover:underline">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 회원가입 페이지에서의 폼 사용 예시입니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-white/10 rounded-lg text-white text-sm">
          <p className="font-semibold mb-2">💡 인터랙션 테스트</p>
          <ul className="space-y-1 text-xs">
            <li>• 모든 필드를 입력해보세요</li>
            <li>• 비밀번호 일치 여부를 확인하세요</li>
            <li>• 회원가입 버튼을 클릭해보세요 (콘솔 확인)</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '폼의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 비밀번호 불일치 안내
export const PasswordMismatchInfo: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800 text-sm font-semibold">
            ⚠️ 비밀번호가 일치하지 않습니다.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '비밀번호 불일치 시 경고 메시지가 표시된 상태입니다.',
      },
    },
  },
};

// 입력 필드 포커스 상태
export const FocusedState: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2 text-blue-900">포커스 효과</p>
          <p className="text-blue-800 text-xs">
            입력 필드를 클릭하면 파란색 링이 표시됩니다
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 포커스 상태를 확인합니다.',
      },
    },
  },
};

// 다양한 배경에서
export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary 배경 (기본)</h3>
        <div className="bg-primary p-8 rounded-2xl inline-block">
          <SignUpForm />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">그라데이션 배경</h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl inline-block">
          <SignUpForm />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
        <div className="bg-gray-900 p-8 rounded-2xl inline-block">
          <SignUpForm />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경에서의 회원가입 폼입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-gradient-to-br from-primary to-purple-600 p-6 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">PromOcean</h1>
          <p className="text-white/80 text-sm">계정 만들기</p>
        </div>
        <div className="bg-primary/50 backdrop-blur-sm p-6 rounded-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 회원가입 폼입니다.',
      },
    },
  },
};

// 전체 회원가입 플로우
export const FullRegistrationFlow: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 브랜딩 */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <span className="text-primary text-5xl font-bold">P</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">PromOcean</h1>
          <p className="text-white/90 text-xl">시작하기</p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
          <SignUpForm />
        </div>

        {/* 소셜 회원가입 */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/80">또는</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>
        </div>

        {/* 로그인 링크 */}
        <div className="text-center mt-8">
          <p className="text-white/80">
            이미 계정이 있으신가요?{' '}
            <a href="#" className="text-white font-bold hover:underline">
              로그인
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60 text-sm">
          <p>© 2025 PromOcean. All rights reserved.</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '완전한 회원가입 페이지 레이아웃입니다.',
      },
    },
  },
};

// 비밀번호 요구사항 가이드
export const WithPasswordRequirements: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2 text-blue-900">비밀번호 요구사항</p>
          <ul className="text-blue-800 text-xs space-y-1">
            <li>✓ 최소 8자 이상</li>
            <li>✓ 영문, 숫자, 특수문자 포함</li>
            <li>✓ 공백 없이 입력</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '비밀번호 요구사항이 표시된 회원가입 폼입니다.',
      },
    },
  },
};

// 성공 메시지
export const WithSuccessMessage: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-800 text-sm font-semibold">
            ✅ 회원가입이 완료되었습니다!
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '회원가입 성공 시 성공 메시지가 표시된 상태입니다.',
      },
    },
  },
};

// 간단한 레이아웃
export const MinimalLayout: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">PromOcean 가입</h1>
            <p className="text-gray-600">몇 단계만 거치면 시작할 수 있습니다</p>
          </div>
          <div className="bg-primary p-8 rounded-2xl shadow-lg">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '미니멀한 레이아웃의 회원가입 페이지입니다.',
      },
    },
  },
};
