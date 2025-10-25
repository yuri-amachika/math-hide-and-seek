import { useCallback, useRef } from 'react';
import { gameAssets } from '../config/gameAssets';

const createContext = () => new (window.AudioContext || (window as any).webkitAudioContext)();

/**
 * 音声ファイルを再生するヘルパー関数
 */
const playAudioFile = (path: string) => {
  const audio = new Audio(path);
  audio.volume = 0.5; // 音量は50%に設定
  audio.play().catch((error) => {
    console.warn('Audio playback failed:', error);
  });
};

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
    // カスタムSEが設定されている場合はランダムに選択して再生
    if (gameAssets.sounds.success && gameAssets.sounds.success.length > 0) {
      const randomIndex = Math.floor(Math.random() * gameAssets.sounds.success.length);
      const selectedSound = gameAssets.sounds.success[randomIndex];
      playAudioFile(selectedSound);
      return;
    }
    // フォールバック：ビープ音
    playTone(880, 0.35);
    setTimeout(() => playTone(1320, 0.25), 120);
  }, [playTone]);

  const playError = useCallback(() => {
    // カスタムSEが設定されている場合はそれを使用
    if (gameAssets.sounds.error) {
      playAudioFile(gameAssets.sounds.error);
      return;
    }
    // フォールバック：ビープ音
    playTone(220, 0.5);
  }, [playTone]);

  const playGameClear = useCallback(() => {
    // ゲームクリアSEが設定されている場合はそれを使用
    if (gameAssets.sounds.gameClear) {
      playAudioFile(gameAssets.sounds.gameClear);
      return;
    }
    // フォールバック：勝利のメロディ
    playTone(523, 0.2); // C
    setTimeout(() => playTone(659, 0.2), 200); // E
    setTimeout(() => playTone(784, 0.2), 400); // G
    setTimeout(() => playTone(1047, 0.5), 600); // C (high)
  }, [playTone]);

  return { playSuccess, playError, playGameClear };
};
