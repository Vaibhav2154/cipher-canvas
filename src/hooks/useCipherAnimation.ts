import { useState, useCallback, useRef, useEffect } from 'react';
import { CipherStep } from '@/types/cipher';

interface UseCipherAnimationProps {
  steps: CipherStep[];
  animationSpeed?: number;
}

interface UseCipherAnimationReturn {
  currentStep: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  goToStep: (step: number) => void;
}

export function useCipherAnimation({ 
  steps, 
  animationSpeed = 1000 
}: UseCipherAnimationProps): UseCipherAnimationReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAnimationInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearAnimationInterval();
  }, [clearAnimationInterval]);

  const stepForward = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    clearAnimationInterval();
    setCurrentStep(0);
  }, [clearAnimationInterval]);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
  }, [steps.length]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, animationSpeed);
    }

    return clearAnimationInterval;
  }, [isPlaying, animationSpeed, steps.length, clearAnimationInterval]);

  useEffect(() => {
    return clearAnimationInterval;
  }, [clearAnimationInterval]);

  return {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    goToStep
  };
}
