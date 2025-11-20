import type { Meta, StoryObj } from '@storybook/react';
import ColorPickerModal from '@components/modal/ColorPickerModal';
import { useState } from 'react';

const meta: Meta<typeof ColorPickerModal> = {
  title: 'Components/Modal/ColorPickerModal',
  component: ColorPickerModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '색상 선택 모달 컴포넌트입니다. react-colorful 라이브러리를 사용하여 HEX 색상을 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorPickerModal>;

// 기본 스토리
export const Default: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState('#3b82f6');
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4 p-6 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-600 mb-2">선택된 색상:</p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-16 h-16 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: selectedColor }}
              ></div>
              <p className="text-xl font-mono font-bold">{selectedColor}</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            색상 선택 모달 열기
          </button>
        </div>

        {isOpen && (
          <ColorPickerModal
            parentSelectedColorState={selectedColor}
            parentSetSelectedColorState={setSelectedColor}
            onCloseColorPicker={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 색상 선택 모달입니다. 색상을 선택하고 확인 버튼을 누르거나 배경을 클릭하여 닫을 수 있습니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const InteractionTest: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState('#ff6b6b');
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-4">
            <h2 className="text-2xl font-bold mb-4">인터랙션 테스트</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>✓ 컬러 피커를 드래그하여 색상 선택</p>
              <p>✓ 텍스트 입력으로 직접 HEX 코드 입력</p>
              <p>✓ 확인 버튼으로 색상 적용</p>
              <p>✓ 배경 클릭으로 모달 닫기</p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">현재 선택된 색상:</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <p className="text-lg font-mono font-bold">{selectedColor}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors font-medium"
          >
            다시 열기
          </button>
        </div>

        {isOpen && (
          <ColorPickerModal
            parentSelectedColorState={selectedColor}
            parentSetSelectedColorState={setSelectedColor}
            onCloseColorPicker={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모달의 다양한 인터랙션을 테스트할 수 있습니다.',
      },
    },
  },
};

// 다양한 초기 색상
export const DifferentInitialColors: Story = {
  render: () => {
    const [color1, setColor1] = useState('#ef4444');
    const [color2, setColor2] = useState('#10b981');
    const [color3, setColor3] = useState('#8b5cf6');
    const [activeModal, setActiveModal] = useState<number | null>(null);

    const colors = [
      { color: color1, setColor: setColor1, name: '빨간색', id: 1 },
      { color: color2, setColor: setColor2, name: '초록색', id: 2 },
      { color: color3, setColor: setColor3, name: '보라색', id: 3 },
    ];

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-center mb-8">색상 팔레트 관리</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {colors.map(({ color, setColor, name, id }) => (
              <div key={id} className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-sm text-gray-600 mb-3">{name}</p>
                <div
                  className="w-full h-24 rounded-lg border-2 border-gray-300 mb-3"
                  style={{ backgroundColor: color }}
                ></div>
                <p className="text-center font-mono text-sm mb-3">{color}</p>
                <button
                  onClick={() => setActiveModal(id)}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors text-sm"
                >
                  색상 변경
                </button>

                {activeModal === id && (
                  <ColorPickerModal
                    parentSelectedColorState={color}
                    parentSetSelectedColorState={setColor}
                    onCloseColorPicker={() => setActiveModal(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '여러 개의 색상을 관리하는 시나리오입니다.',
      },
    },
  },
};

// 테마 커스터마이저
export const ThemeCustomizer: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = useState('#3b82f6');
    const [secondaryColor, setSecondaryColor] = useState('#8b5cf6');
    const [accentColor, setAccentColor] = useState('#f59e0b');
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">테마 커스터마이저</h1>
          <p className="text-gray-600 mb-8">사이트의 색상 테마를 커스터마이즈하세요</p>

          {/* 미리보기 */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">미리보기</h2>
            <div
              className="p-6 rounded-lg text-white mb-4"
              style={{ backgroundColor: primaryColor }}
            >
              <h3 className="text-xl font-bold mb-2">Primary Color</h3>
              <p>메인 브랜드 컬러입니다</p>
            </div>
            <div
              className="p-6 rounded-lg text-white mb-4"
              style={{ backgroundColor: secondaryColor }}
            >
              <h3 className="text-xl font-bold mb-2">Secondary Color</h3>
              <p>보조 컬러입니다</p>
            </div>
            <div
              className="p-6 rounded-lg text-white"
              style={{ backgroundColor: accentColor }}
            >
              <h3 className="text-xl font-bold mb-2">Accent Color</h3>
              <p>강조 컬러입니다</p>
            </div>
          </div>

          {/* 색상 설정 */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">색상 설정</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <div>
                    <p className="font-semibold">Primary</p>
                    <p className="text-sm font-mono text-gray-600">{primaryColor}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('primary')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  변경
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <div>
                    <p className="font-semibold">Secondary</p>
                    <p className="text-sm font-mono text-gray-600">{secondaryColor}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('secondary')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  변경
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <div>
                    <p className="font-semibold">Accent</p>
                    <p className="text-sm font-mono text-gray-600">{accentColor}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal('accent')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  변경
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {activeModal === 'primary' && (
          <ColorPickerModal
            parentSelectedColorState={primaryColor}
            parentSetSelectedColorState={setPrimaryColor}
            onCloseColorPicker={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'secondary' && (
          <ColorPickerModal
            parentSelectedColorState={secondaryColor}
            parentSetSelectedColorState={setSecondaryColor}
            onCloseColorPicker={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'accent' && (
          <ColorPickerModal
            parentSelectedColorState={accentColor}
            parentSetSelectedColorState={setAccentColor}
            onCloseColorPicker={() => setActiveModal(null)}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '테마 커스터마이저에서 여러 색상을 관리하는 실제 사용 예시입니다.',
      },
    },
  },
};

// 간단한 사용 예제
export const SimpleExample: Story = {
  render: () => {
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div
            className="p-8 rounded-xl shadow-2xl mb-6 transition-all"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h2 className="text-3xl font-bold mb-2">Hello World!</h2>
            <p className="text-lg">배경색과 텍스트 색상을 변경해보세요</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-3">
            <button
              onClick={() => setActiveModal('bg')}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">배경색 변경</span>
              <div
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: bgColor }}
              ></div>
            </button>

            <button
              onClick={() => setActiveModal('text')}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">텍스트 색상 변경</span>
              <div
                className="w-8 h-8 rounded border-2 border-gray-300"
                style={{ backgroundColor: textColor }}
              ></div>
            </button>
          </div>
        </div>

        {activeModal === 'bg' && (
          <ColorPickerModal
            parentSelectedColorState={bgColor}
            parentSetSelectedColorState={setBgColor}
            onCloseColorPicker={() => setActiveModal(null)}
          />
        )}
        {activeModal === 'text' && (
          <ColorPickerModal
            parentSelectedColorState={textColor}
            parentSetSelectedColorState={setTextColor}
            onCloseColorPicker={() => setActiveModal(null)}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '배경색과 텍스트 색상을 변경하는 간단한 예제입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState('#ec4899');
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-4">모바일 색상 선택</h2>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">선택된 색상</p>
              <div
                className="w-full h-32 rounded-xl border-2 border-gray-300 mb-2"
                style={{ backgroundColor: selectedColor }}
              ></div>
              <p className="text-center font-mono font-bold">{selectedColor}</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors font-medium"
            >
              색상 변경
            </button>
          </div>
        </div>

        {isOpen && (
          <ColorPickerModal
            parentSelectedColorState={selectedColor}
            parentSetSelectedColorState={setSelectedColor}
            onCloseColorPicker={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 색상 선택 모달입니다.',
      },
    },
  },
};

// 항상 열린 상태 (개발용)
export const AlwaysOpen: Story = {
  args: {
    parentSelectedColorState: '#3b82f6',
    parentSetSelectedColorState: (color: string) => console.log('Selected color:', color),
    onCloseColorPicker: () => console.log('Modal closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '모달이 항상 열린 상태로 표시됩니다. 개발 및 테스트용입니다.',
      },
    },
  },
};
