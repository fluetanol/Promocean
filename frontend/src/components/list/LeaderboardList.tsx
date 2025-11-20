// frontend/src/components/list/LeaderboardList.tsx

import LeaderboardItem from '@/components/item/LeaderboardItem';
import { LeaderboardItemProps } from '@/types/itemType';

interface LeaderboardListProps {
  leaderboardList: LeaderboardItemProps[];
}

/**
 * LeaderboardList component
 * @description LeaderboardList component displays the leaderboard table with items
 * @returns {React.ReactNode}
 */
export default function LeaderboardList({ leaderboardList }: LeaderboardListProps) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NickName
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              Vote Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              Last Submit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {leaderboardList && leaderboardList.length > 0 ? (
            leaderboardList.map((item, index) => {
              const { rank, nickName, voteCount, lastSubmit } = item;
              return (
                <LeaderboardItem
                  key={index}
                  rank={rank}
                  nickName={nickName}
                  voteCount={voteCount}
                  lastSubmit={lastSubmit}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                리더보드 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

