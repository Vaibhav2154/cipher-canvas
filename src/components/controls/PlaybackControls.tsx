import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
}

export function PlaybackControls({
  isPlaying,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        className="w-10 h-10"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onStepBackward}
        disabled={currentStep === 0}
        className="w-10 h-10"
      >
        <SkipBack className="w-4 h-4" />
      </Button>

      <Button
        variant="default"
        size="icon"
        onClick={isPlaying ? onPause : onPlay}
        className="w-12 h-12"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onStepForward}
        disabled={currentStep === totalSteps - 1}
        className="w-10 h-10"
      >
        <SkipForward className="w-4 h-4" />
      </Button>

      <div className="ml-4 px-4 py-2 bg-muted text-sm font-mono">
        Step {currentStep + 1} / {totalSteps}
      </div>
    </div>
  );
}
