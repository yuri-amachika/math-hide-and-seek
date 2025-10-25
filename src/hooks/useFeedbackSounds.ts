import { useCallback, useRef } from 'react';

const createContext = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export const useFeedbackSounds = () => {
  const contextRef = useRef<AudioContext | null>(null);

  const ensureContext = () => {
    if (!contextRef.current) {
      contextRef.current = createContext();
    }
    return contextRef.current;
  };

  const playTone = useCallback((frequency: number, duration = 0.4) => {
    const context = ensureContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;

    const currentTime = context.currentTime;
    gain.gain.setValueAtTime(0.0001, currentTime);
    gain.gain.exponentialRampToValueAtTime(0.4, currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);
  }, []);

  const playSuccess = useCallback(() => {
    playTone(880, 0.35);
    setTimeout(() => playTone(1320, 0.25), 120);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(220, 0.5);
  }, [playTone]);

  return { playSuccess, playError };
};
