// frontend/src/components/item/LeaderboardItem.tsx

import { LeaderboardItemProps } from '@/types/itemType';

/**
 * LeaderboardItem component
 * @description LeaderboardItem component displays a single leaderboard item row
 * @returns {React.ReactNode}
 */
export default function LeaderboardItem({ rank, nickName, voteCount, lastSubmit }: LeaderboardItemProps) {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
        {rank}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {nickName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {voteCount.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
        {lastSubmit}
      </td>
    </tr>
  );
}

