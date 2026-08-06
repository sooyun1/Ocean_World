import { useMouseCurrent } from '@/hooks/use-mouse-current';
import { CurrentLayer, SwayLayer } from './layers';
import { LightRays, MarineSnow, Bubbles } from './ambient';
import { FishSchool, SolitaryFish, SwimmingTurtle, HoveringSeahorse, DriftingJellyfish } from './swimmers';
import { SeafloorBase, StaghornCoral, BrainCoral, FanCoral, TubeCoral, SeaweedCluster } from './flora';

export default function OceanScene() {
  const { currentX, currentY } = useMouseCurrent();

  return (
    <div className="ocean-bg">
      <LightRays />
      <MarineSnow />
      
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.3} rotateMultiplier={0.02} className="absolute inset-0">
        <SolitaryFish scale={0.5} y="30vh" duration={70} color="#e9c46a" delay={0} />
        <SolitaryFish scale={0.4} y="55vh" duration={85} color="#2a9d8f" delay={30} reverse />
        <DriftingJellyfish scale={0.6} x="75vw" y="35vh" delay={5} />
        <FishSchool type="elongated" scale={0.6} y="20vh" duration={60} color="#104a5a" reverse />
      </CurrentLayer>

      {/* ---------------- MIDGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.7} rotateMultiplier={0.05} className="absolute inset-0">
        <FishSchool type="elongated" scale={0.8} y="45vh" duration={45} color="#f4a261" delay={10} />
        <SwimmingTurtle scale={0.7} y="25vh" duration={90} delay={5} />
        <HoveringSeahorse scale={0.6} x="15vw" y="60vh" driftDuration={15} />
        <HoveringSeahorse scale={0.5} x="85vw" y="50vh" driftDuration={18} delay={5} />
        <DriftingJellyfish scale={0.8} x="40vw" y="65vh" delay={2} />
      </CurrentLayer>

      {/* ---------------- FOREGROUND LAYER ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={1.2} rotateMultiplier={0.08} className="absolute inset-0">
        <FishSchool type="round" scale={1.2} y="65vh" duration={35} color="#e76f51" reverse delay={15} />
        <SwimmingTurtle scale={1.1} y="60vh" duration={65} delay={35} reverse />
        <HoveringSeahorse scale={0.8} x="60vw" y="80vh" driftDuration={12} delay={8} />
        <DriftingJellyfish scale={1.1} x="20vw" y="45vh" delay={12} />
      </CurrentLayer>

      <Bubbles />

      {/* ---------------- SEAFLOOR (Extends beyond edges to hide scrolling) ---------------- */}
      <CurrentLayer currentX={currentX} currentY={currentY} depth={0.2} rotateMultiplier={0} className="absolute bottom-[-5vh] left-[-15vw] w-[130vw] h-[30vh]">
        <SeafloorBase />
        
        {/* Left cluster */}
        <SwayLayer currentX={currentX} multiplier={0.08} className="absolute bottom-[20%] left-[20%]">
          <StaghornCoral />
        </SwayLayer>
        <SwayLayer currentX={currentX} multiplier={0.05} className="absolute bottom-[10%] left-[25%]">
          <BrainCoral />
        </SwayLayer>
        <div className="absolute bottom-[30%] left-[15%]">
          <SeaweedCluster currentX={currentX} />
        </div>

        {/* Center-left cluster */}
        <SwayLayer currentX={currentX} multiplier={0.06} className="absolute bottom-[25%] left-[40%]">
          <TubeCoral />
        </SwayLayer>

        {/* Center-right cluster */}
        <SwayLayer currentX={currentX} multiplier={0.07} className="absolute bottom-[15%] left-[65%]">
          <FanCoral />
        </SwayLayer>
        <div className="absolute bottom-[20%] left-[70%]">
          <SeaweedCluster currentX={currentX} />
        </div>

        {/* Right cluster */}
        <SwayLayer currentX={currentX} multiplier={0.05} className="absolute bottom-[10%] left-[85%]">
          <BrainCoral />
        </SwayLayer>
        <SwayLayer currentX={currentX} multiplier={0.09} className="absolute bottom-[30%] left-[88%]">
          <StaghornCoral />
        </SwayLayer>
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
      <div className="vignette" />
    </div>
  );
}
