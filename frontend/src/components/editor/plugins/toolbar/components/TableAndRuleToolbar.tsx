import { useToolbarActions } from '../hooks/useToolbarActions';

export function TableAndRuleToolbar() {
  const { insertTable, insertHorizontalRule } = useToolbarActions();

  return (
    <>
      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={insertTable}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Insert Table"
      >
        📊 표
      </button>
      <button
        onClick={insertHorizontalRule}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Horizontal Rule"
      >
        ─ 구분선
      </button>
    </>
  );
}
