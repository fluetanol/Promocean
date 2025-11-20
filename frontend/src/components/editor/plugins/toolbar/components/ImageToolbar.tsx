import { useRef } from 'react';
import { useToolbarActions } from '../hooks/useToolbarActions';

export function ImageToolbar() {
  const { insertImage } = useToolbarActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        const altText = prompt('이미지 설명을 입력하세요 (선택사항):') || '';
        const caption = prompt('캡션을 입력하세요 (선택사항):') || '';

        insertImage(src, altText, caption);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Insert Image"
      >
        📷 이미지
      </button>
    </>
  );
}
