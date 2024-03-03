import { createContext, useState, useEffect, useRef, ReactNode } from "react";

function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: unknown) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Define the shape of the context
interface AudioContextType {
  playing: boolean;
  start: () => void;
}

// Create the context with default values
export const AudioContext = createContext<AudioContextType>({
  playing: false,
  start: () => {},
});

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio.current = new Audio("/audios/1.mp3");
  }, []);

  const start = throttle(() => {
    console.log("start")
    const audioElement = audio.current;
    if (audioElement) {
      if (playing) {
        const fadeOut = (volume: number) => {
          if (volume > 0.1) {
            volume = Math.max(volume - 0.01, 0.1); // Ensure volume doesn't go below 0.1
            audioElement.volume = volume;
            setTimeout(() => fadeOut(volume), 10);
          } else {
            audioElement.pause();
            setPlaying(false);
          }
        }
        fadeOut(audioElement.volume);
      } else {
        audioElement.volume = 0; // Set volume to 0 before starting fadeIn
        const fadeIn = (volume : number) => {
          audioElement.play();
          setPlaying(true);
          if (volume < 1) {
            volume = Math.min(volume + 0.01, 1); // Ensure volume doesn't exceed 1
            audioElement.volume = volume;
            setTimeout(() => fadeIn(volume), 10);
          } 
        }
        fadeIn(audioElement.volume);
      }
    }
  }, 1000); // Throttle the start function to once per second

  return <AudioContext.Provider value={{ playing, start }}>{children}</AudioContext.Provider>;
}
