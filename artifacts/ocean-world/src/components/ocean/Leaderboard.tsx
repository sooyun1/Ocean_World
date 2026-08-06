import React from 'react';
import { useGetLeaderboard } from '@workspace/api-client-react';

interface LeaderboardProps {
  currentUser: { id: number; nickname: string; bubbleCount: number } | null;
}

export default function Leaderboard({ currentUser }: LeaderboardProps) {
  const { data, isLoading } = useGetLeaderboard(
    { userId: currentUser?.id },
    { query: { enabled: true, refetchInterval: 5000 } }
  );

  return (
    <div className="fixed top-4 left-4 z-50 bg-[rgba(0,15,30,0.65)] backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 min-w-[220px]">
      {currentUser && (
        <div className="mb-2 border-b border-white/10 pb-2">
          <div className="text-cyan-300 text-xs font-medium">
            내 기록: {data?.myEntry?.bubbleCount ?? currentUser.bubbleCount}개
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-1.5 mb-3 mt-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="8" cy="8" r="2" fill="currentColor"></circle>
        </svg>
        <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
          리더보드
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {isLoading ? (
          <>
            <div className="h-4 bg-white/10 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-white/10 rounded animate-pulse w-4/6"></div>
          </>
        ) : !data?.topTen || data.topTen.length === 0 ? (
          <div className="text-white/40 text-xs text-center py-2">아직 기록이 없어요</div>
        ) : (
          <>
            {data.topTen.map((entry) => {
              const isMe = currentUser && entry.id === currentUser.id;
              let rankColor = 'text-white/70 text-xs';
              if (entry.rank === 1) rankColor = 'text-[#FFD700] font-semibold text-sm';
              else if (entry.rank === 2) rankColor = 'text-[#C0C0C0] font-semibold text-sm';
              else if (entry.rank === 3) rankColor = 'text-[#CD7F32] font-semibold text-sm';
              
              return (
                <div key={entry.id} className={`flex justify-between items-center py-0.5 ${isMe ? 'bg-white/10 rounded px-1.5 -mx-1.5' : ''}`}>
                  <span className={`${rankColor} truncate max-w-[120px]`}>
                    {entry.rank}. {entry.nickname}
                  </span>
                  <span className={`${rankColor}`}>
                    {entry.bubbleCount}개
                  </span>
                </div>
              );
            })}
            
            {data.myEntry && data.myEntry.rank > 10 && (
              <>
                <div className="text-center text-white/30 text-xs leading-none my-1">···</div>
                <div className="flex justify-between items-center text-cyan-300 text-xs mt-1 bg-white/10 rounded px-1.5 -mx-1.5 py-1">
                  <span className="truncate max-w-[120px]">
                    {data.myEntry.rank}. {data.myEntry.nickname}
                  </span>
                  <span>
                    {data.myEntry.bubbleCount}개
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
