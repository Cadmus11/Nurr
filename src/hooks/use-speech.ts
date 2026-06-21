import { useCallback, useState, useRef } from 'react';
import * as Speech from 'expo-speech';

export function useSpeech() {
  const speakingRef = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string, rate: number = 0.8) => {
    if (speakingRef.current) {
      Speech.stop();
      speakingRef.current = false;
      setIsSpeaking(false);
      return;
    }
    speakingRef.current = true;
    setIsSpeaking(true);
    Speech.speak(text, {
      rate,
      pitch: 1.0,
      onDone: () => { speakingRef.current = false; setIsSpeaking(false); },
      onError: () => { speakingRef.current = false; setIsSpeaking(false); },
    });
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    speakingRef.current = false;
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
