import { useEffect, useRef } from 'react';

export default function useOceanSound(enabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      return;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // White noise buffer
    const bufferSize = ctx.sampleRate * 4; // 4 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 0.5;

    // Gain node for noise
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.25;

    // Connect noise
    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // LFO for filter frequency
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 80;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Deep drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.04;

    drone.connect(droneGain);
    droneGain.connect(ctx.destination);

    // Start everything
    noiseSource.start();
    lfo.start();
    drone.start();

    // Handle autoplay policy
    if (ctx.state === 'suspended') {
      const resumeAudio = () => {
        ctx.resume();
        window.removeEventListener('click', resumeAudio);
        window.removeEventListener('touchstart', resumeAudio);
      };
      window.addEventListener('click', resumeAudio);
      window.addEventListener('touchstart', resumeAudio);
    }

    return () => {
      noiseSource.stop();
      lfo.stop();
      drone.stop();
      if (ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
      audioCtxRef.current = null;
    };
  }, [enabled]);
}
