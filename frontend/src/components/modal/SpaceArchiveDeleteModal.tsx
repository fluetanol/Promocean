export interface SpaceArchiveDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

export default function SpaceArchiveDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title
}: SpaceArchiveDeleteModalProps) {

    const handleConfirm = () => {
        onConfirm();
        onClose();
    }

    return (
        <div
            className={`fixed flex inset-0 z-50 w-full h-full bg-black/40 backdrop-blur-xs justify-center items-center
                transition-opacity duration-300 ease-out
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className={`flex flex-col bg-background w-[400px] rounded-2xl p-8 gap-6 shadow-xl
                    transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold">폴더 삭제</h2>

                <p className="text-gray-700">
                    <span className="font-semibold">{title}</span> 폴더를 삭제하시겠습니까?
                </p>

                <div className="flex flex-row justify-center gap-4 mt-2">
                    <button
                        type="button"
                        className="flex px-6 py-2.5 bg-gray-300 w-32 justify-center rounded-lg
                            hover:bg-gray-400 active:scale-95 transition-all duration-150"
                        onClick={onClose}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        className="flex px-6 py-2.5 bg-red-500 text-white w-32 justify-center rounded-lg
                            hover:bg-red-600 active:scale-95 transition-all duration-150"
                        onClick={handleConfirm}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
