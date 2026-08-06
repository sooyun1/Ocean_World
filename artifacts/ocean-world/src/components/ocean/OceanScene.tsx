import { useState } from 'react';
import useOceanSound from '@/hooks/use-ocean-sound';
import { useMouseCurrent } from '@/hooks/use-mouse-current';
import { CurrentLayer, SwayLayer } from './layers';
import { LightRays, MarineSnow, Bubbles } from './ambient';
import { FishSchool, SolitaryFish, SwimmingTurtle, HoveringSeahorse, DriftingJellyfish } from './swimmers';
import { SeafloorBase, StaghornCoral, BrainCoral, FanCoral, TubeCoral, SeaweedCluster } from './flora';
import Leaderboard from './Leaderboard';

const CORAL_URLS = [
  "https://www.nationalgeographic.com/animals/invertebrates/facts/coral",
  "https://www.nationalgeographic.com/environment/oceans/reference/coral-reefs-explained",
  "https://www.nationalgeographic.com/science/article/corals"
];

const openCoralLink = () => {
  window.open(CORAL_URLS[Math.floor(Math.random() * CORAL_URLS.length)], "_blank", "noopener,noreferrer");
};

interface OceanUser {
  id: number;
  nickname: string;
  bubbleCount: number;
}

export default function OceanScene({ currentUser }: { currentUser: OceanUser | null }) {
  const { currentX, currentY } = useMouseCurrent();
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  useOceanSound(soundEnabled);

  return (
    <div className="ocean-bg relative overflow-hidden h-[100dvh] w-full">
      <Leaderboard currentUser={currentUser} />
      
      <LightRays />
      <MarineSnow />
      
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.3} rotateMultiplier={0.02} className="absolute inset-0">
        <SolitaryFish scale={0.5} y="30vh" duration={70} color="#e9c46a" delay={0} />
        <SolitaryFish scale={0.4} y="55vh" duration={85} color="#2a9d8f" delay={30} reverse />
        <DriftingJellyfish scale={0.6} x="75vw" y="35vh" delay={5} />
        <FishSchool type="elongated" scale={0.6} y="20vh" duration={60} color="#104a5a" reverse />
        <FishSchool type="round" scale={0.45} y="70vh" duration={80} color="#2a9d8f" delay={20} />
        <SolitaryFish scale={0.6} y="15vh" duration={95} color="#e9c46a" delay={12} reverse />
      </CurrentLayer>

      {/* ---------------- MIDGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.7} rotateMultiplier={0.05} className="absolute inset-0">
        <FishSchool type="elongated" scale={0.8} y="45vh" duration={45} color="#f4a261" delay={10} />
        <SwimmingTurtle scale={0.7} y="25vh" duration={90} delay={5} />
        <HoveringSeahorse scale={0.6} x="15vw" y="60vh" driftDuration={15} />
        <HoveringSeahorse scale={0.5} x="85vw" y="50vh" driftDuration={18} delay={5} />
        <DriftingJellyfish scale={0.8} x="40vw" y="65vh" delay={2} />
        <SwimmingTurtle scale={0.9} y="70vh" duration={100} delay={20} />
        <FishSchool type="round" scale={0.7} y="55vh" duration={50} color="#2a9d8f" delay={25} reverse />
      </CurrentLayer>

      {/* ---------------- FOREGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={1.2} rotateMultiplier={0.08} className="absolute inset-0">
        <FishSchool type="round" scale={1.2} y="65vh" duration={35} color="#e76f51" reverse delay={15} />
        <SwimmingTurtle scale={1.1} y="60vh" duration={65} delay={35} reverse />
        <HoveringSeahorse scale={0.8} x="60vw" y="80vh" driftDuration={12} delay={8} />
        <DriftingJellyfish scale={1.1} x="20vw" y="45vh" delay={12} />
        <SwimmingTurtle scale={1.3} y="35vh" duration={75} delay={15} reverse />
        <FishSchool type="elongated" scale={1.0} y="80vh" duration={42} color="#e9c46a" delay={30} />
      </CurrentLayer>

      <Bubbles currentUser={currentUser} />

      {/* ---------------- SEAFLOOR (Extends beyond edges to hide scrolling) ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.2} rotateMultiplier={0} className="absolute bottom-[-5vh] left-[-15vw] w-[130vw] h-[30vh]">
        <SeafloorBase />
        
        {/* Left cluster */}
        <div className="absolute bottom-[20%] left-[20%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.08}>
            <StaghornCoral />
          </SwayLayer>
        </div>
        <div className="absolute bottom-[10%] left-[25%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.05}>
            <BrainCoral />
          </SwayLayer>
        </div>
        <div className="absolute bottom-[30%] left-[15%]">
          <SeaweedCluster currentX={currentX} />
        </div>

        {/* Center-left cluster */}
        <div className="absolute bottom-[25%] left-[40%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.06}>
            <TubeCoral />
          </SwayLayer>
        </div>

        {/* Center-right cluster */}
        <div className="absolute bottom-[15%] left-[65%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.07}>
            <FanCoral />
          </SwayLayer>
        </div>
        <div className="absolute bottom-[20%] left-[70%]">
          <SeaweedCluster currentX={currentX} />
        </div>

        {/* Right cluster */}
        <div className="absolute bottom-[10%] left-[85%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.05}>
            <BrainCoral />
          </SwayLayer>
        </div>
        <div className="absolute bottom-[30%] left-[88%] hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.5)] transition-all z-10" onClick={openCoralLink} style={{ cursor: 'pointer' }}>
          <SwayLayer currentX={currentX} multiplier={0.09}>
            <StaghornCoral />
          </SwayLayer>
        </div>
      </CurrentLayer>

      {/* Foreground blurry kelp (extreme depth) */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={1.8} rotateMultiplier={0.15} className="absolute bottom-[-10vh] left-[-5vw] pointer-events-none opacity-80 blur-[2px]">
        <div className="scale-150 transform-origin-bottom">
          <SeaweedCluster currentX={currentX} />
        </div>
      </CurrentLayer>
      <CurrentLayer currentX={currentX} currentY={currentY} depth={1.8} rotateMultiplier={0.15} className="absolute bottom-[-10vh] right-[-10vw] pointer-events-none opacity-80 blur-[3px]">
        <div className="scale-[1.8] transform-origin-bottom">
          <SeaweedCluster currentX={currentX} />
        </div>
      </CurrentLayer>

      {/* Vignette on top of everything */}
      <div className="vignette pointer-events-none" />

      {/* Sound Toggle Button */}
      <button
        onClick={() => setSoundEnabled(prev => !prev)}
        title="Toggle ocean sounds"
        className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 flex items-center justify-center bg-[#00142899] backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {soundEnabled ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </>
          ) : (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="1" x2="1" y2="23"></line>
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
