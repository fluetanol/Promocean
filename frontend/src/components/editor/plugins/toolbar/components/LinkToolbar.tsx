import { useToolbarActions } from '../hooks/useToolbarActions';

interface LinkToolbarProps {
  isLink: boolean;
}

export function LinkToolbar({ isLink }: LinkToolbarProps) {
  const { insertLink, removeLink } = useToolbarActions();

  const handleLinkClick = () => {
    if (isLink) {
      removeLink();
    } else {
      insertLink();
    }
  };

  return (
    <button
      onClick={handleLinkClick}
      className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
        isLink ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      type="button"
      title="Insert Link"
    >
      🔗 링크
    </button>
  );
}
