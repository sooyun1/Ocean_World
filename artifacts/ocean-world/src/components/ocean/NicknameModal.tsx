import React, { useState } from 'react';
import { useRegisterUser } from '@workspace/api-client-react';

interface NicknameModalProps {
  onComplete: (user: { id: number; nickname: string; bubbleCount: number }) => void;
}

export default function NicknameModal({ onComplete }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');
  const registerUser = useRegisterUser();

  const handleConfirm = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;
    try {
      const user = await registerUser.mutateAsync({ data: { nickname: trimmed } });
      localStorage.setItem('ocean_user_id', user.id.toString());
      localStorage.setItem('ocean_nickname', user.nickname);
      onComplete(user);
    } catch (e) {
      console.error('Failed to register:', e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-[rgba(4,20,40,0.92)] rounded-2xl border border-white/10 p-8 max-w-xs w-full shadow-2xl">
        <h2 className="text-white text-xl font-light text-center mb-2">바닷속에 오신 것을 환영합니다</h2>
        <p className="text-white/60 text-sm text-center mb-6">닉네임을 입력해주세요</p>
        <input
          type="text"
          className="bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 w-full placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
          placeholder="닉네임 (최대 20자)"
          maxLength={20}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConfirm();
            }
          }}
        />
        <button
          onClick={handleConfirm}
          disabled={registerUser.isPending || !nickname.trim()}
          className="w-full mt-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl py-3 hover:opacity-90 cursor-pointer disabled:opacity-50 transition-opacity"
        >
          {registerUser.isPending ? '입장 중...' : '입장하기'}
        </button>
      </div>
    </div>
  );
}
