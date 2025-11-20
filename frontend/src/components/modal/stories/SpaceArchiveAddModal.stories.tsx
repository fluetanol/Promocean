import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SpaceArchiveAddModal, { SpaceArchiveAddModalProps } from '../SpaceArchiveAddModal';
import { SpaceArchiveData } from '@/app/my-space/page';

// Wrapper 컴포넌트 - 모달 상태 관리를 위한 컨트롤러
function InteractiveWrapper() {
  const [isOpenState, setIsOpenState] = useState(true);
  const [archiveList, setArchiveList] = useState<SpaceArchiveData[]>([
    { title: '개발 문서', bgColor: '#3b82f6', isPinned: true },
    { title: '디자인 에셋', bgColor: '#8b5cf6', isPinned: false },
  ]);

  const handleCloseModal = () => {
    setIsOpenState(false);
    // 재오픈을 위해 약간의 딜레이 후 다시 열기
    setTimeout(() => setIsOpenState(true), 300);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">현재 카테고리 목록</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archiveList.map((archive, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-white"
                style={{ backgroundColor: archive.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{archive.title}</h3>
                  {archive.isPinned && <span className="text-xs">📌</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsOpenState(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          카테고리 추가
        </button>
      </div>
      <SpaceArchiveAddModal
        isOpen={isOpenState}
        onCloseAddModal={handleCloseModal}
        archiveItemListState={archiveList}
        setArchiveItemListState={setArchiveList}
      />
    </div>
  );
}

// 애니메이션 테스트용 컴포넌트
function AnimationTestWrapper() {
  const [isOpenState, setIsOpenState] = useState(false);
  const [archiveList, setArchiveList] = useState<SpaceArchiveData[]>([]);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <button
          onClick={() => setIsOpenState(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          모달 열기
        </button>
        <button
          onClick={() => setIsOpenState(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          모달 닫기
        </button>
      </div>
      <SpaceArchiveAddModal
        isOpen={isOpenState}
        onCloseAddModal={() => setIsOpenState(false)}
        archiveItemListState={archiveList}
        setArchiveItemListState={setArchiveList}
      />
    </div>
  );
}

const meta: Meta<typeof SpaceArchiveAddModal> = {
  title: 'Components/Modal/SpaceArchiveAddModal',
  component: SpaceArchiveAddModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '카테고리를 추가하기 위한 모달 컴포넌트입니다. 배경색 선택, 사진 업로드, 제목 및 설명 입력 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onCloseAddModal: {
      action: 'closed',
      description: '모달을 닫을 때 호출되는 콜백 함수',
      table: {
        type: { summary: '() => void' },
      },
    },
    archiveItemListState: {
      description: '현재 아카이브 아이템 목록',
      table: {
        type: { summary: 'SpaceArchiveData[]' },
      },
    },
    setArchiveItemListState: {
      description: '아카이브 아이템 목록을 업데이트하는 함수',
      table: {
        type: { summary: '(newState: SpaceArchiveData[]) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveAddModal>;

// 기본 스토리 - 모달 열림 상태
export const Default: Story = {
  render: () => {
    const [archiveList, setArchiveList] = useState<SpaceArchiveData[]>([]);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <SpaceArchiveAddModal
          isOpen={true}
          onCloseAddModal={() => console.log('Modal closed')}
          archiveItemListState={archiveList}
          setArchiveItemListState={setArchiveList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 카테고리 추가 모달입니다.',
      },
    },
  },
};

// 모달 닫힘 상태
export const Closed: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [archiveList, setArchiveList] = useState<SpaceArchiveData[]>([]);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">모달이 닫혀있습니다.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            모달 열기
          </button>
        </div>
        <SpaceArchiveAddModal
          isOpen={isOpen}
          onCloseAddModal={() => setIsOpen(false)}
          archiveItemListState={archiveList}
          setArchiveItemListState={setArchiveList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '닫힌 상태의 모달입니다. 화면에 표시되지 않습니다.',
      },
    },
  },
};

// 인터랙티브 스토리 - 열기/닫기 가능
export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
  parameters: {
    docs: {
      description: {
        story: '버튼을 클릭하여 모달을 열고 닫을 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 애니메이션 테스트용
export const AnimationTest: Story = {
  render: () => <AnimationTestWrapper />,
  parameters: {
    docs: {
      description: {
        story: '모달의 열림/닫힘 애니메이션을 테스트할 수 있습니다.',
      },
    },
  },
};