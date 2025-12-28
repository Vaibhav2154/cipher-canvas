import { useState, useMemo } from 'react';
import { useCipherAnimation } from '@/hooks/useCipherAnimation';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { CipherInput } from '@/components/controls/CipherInput';
import { CipherStep } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface RouteCipherProps {
  className?: string;
}

function generateSpiralRoute(rows: number, cols: number): [number, number][] {
  const route: [number, number][] = [];
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;
  
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) route.push([top, c]);
    top++;
    for (let r = top; r <= bottom; r++) route.push([r, right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) route.push([bottom, c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) route.push([r, left]);
      left++;
    }
  }
  return route;
}

function generateRouteSteps(text: string, cols: number): { steps: CipherStep[]; ciphertext: string } {
  const cleanText = text.replace(/[^A-Z]/g, '');
  if (!cleanText || cols < 2) {
    return { steps: [], ciphertext: '' };
  }

  const rows = Math.ceil(cleanText.length / cols);
  const paddedText = cleanText.padEnd(rows * cols, 'X');
  
  const steps: CipherStep[] = [];
  const grid: string[][] = [];
  
  // Step 1: Initial text
  steps.push({
    description: `Starting with plaintext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText }
  });

  // Step 2: Build grid row by row
  for (let r = 0; r < rows; r++) {
    const row = paddedText.slice(r * cols, (r + 1) * cols).split('');
    grid.push(row);
  }

  steps.push({
    description: `Text arranged in ${rows}×${cols} grid`,
    visualData: { type: 'grid', grid: grid.map(r => [...r]), rows, cols, route: [] }
  });

  // Step 3: Generate and follow spiral route
  const route = generateSpiralRoute(rows, cols);
  let ciphertext = '';
  
  for (let i = 0; i < Math.min(route.length, paddedText.length); i++) {
    const [r, c] = route[i];
    ciphertext += grid[r][c];
    
    if (i % 3 === 0 || i === route.length - 1) {
      steps.push({
        description: `Following spiral path... position (${r + 1}, ${c + 1})`,
        visualData: { 
          type: 'grid', 
          grid: grid.map(r => [...r]), 
          rows, 
          cols,
          route: route.slice(0, i + 1),
          currentPos: [r, c],
          partial: ciphertext
        }
      });
    }
  }

  // Final step
  steps.push({
    description: `Ciphertext complete: "${ciphertext}"`,
    visualData: { type: 'result', ciphertext, route }
  });

  return { steps, ciphertext };
}

export function RouteCipher({ className }: RouteCipherProps) {
  const [plaintext, setPlaintext] = useState('MEETMEATDAWN');
  const [keyValue, setKeyValue] = useState('4');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [displayCiphertext, setDisplayCiphertext] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const cols = parseInt(keyValue) || 4;

  const { steps } = useMemo(() => {
    if (!isAnimating) return { steps: [{ description: 'Enter text and click "Run Animation"', visualData: { type: 'empty' } }], ciphertext: '' };
    return generateRouteSteps(plaintext, cols);
  }, [plaintext, cols, isAnimating]);

  const {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useCipherAnimation({ steps, animationSpeed: 600 });

  const handleExecute = () => {
    setIsAnimating(true);
    const result = generateRouteSteps(plaintext, cols);
    setDisplayCiphertext(result.ciphertext);
    reset();
    setTimeout(play, 100);
  };

  const currentData = steps[currentStep]?.visualData as {
    type: string;
    grid?: string[][];
    rows?: number;
    cols?: number;
    route?: [number, number][];
    currentPos?: [number, number];
    text?: string;
    ciphertext?: string;
    partial?: string;
  };

  return (
    <div className={cn('space-y-6', className)}>
      <CipherInput
        plaintext={plaintext}
        ciphertext={displayCiphertext}
        keyValue={keyValue}
        mode={mode}
        onPlaintextChange={setPlaintext}
        onKeyChange={setKeyValue}
        onModeChange={setMode}
        onExecute={handleExecute}
        keyLabel="Columns"
        keyPlaceholder="e.g., 4"
      />

      <div className="border border-border bg-card p-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            {steps[currentStep]?.description}
          </p>
        </div>

        <div className="min-h-[200px] flex items-center justify-center">
          {currentData?.type === 'empty' && (
            <p className="text-muted-foreground">Configure and run to see animation</p>
          )}

          {currentData?.type === 'text' && (
            <div className="flex gap-1 flex-wrap justify-center">
              {(currentData.text || '').split('').map((char, i) => (
                <span key={i} className="cipher-cell fade-in">
                  {char}
                </span>
              ))}
            </div>
          )}

          {currentData?.type === 'grid' && currentData.grid && (
            <div className="space-y-4">
              <div className="relative">
                <svg 
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    width: currentData.cols! * 44 + 4, 
                    height: currentData.grid.length * 44 + 4 
                  }}
                >
                  {currentData.route && currentData.route.length > 1 && (
                    <polyline
                      points={currentData.route.map(([r, c]) => 
                        `${c * 44 + 22},${r * 44 + 22}`
                      ).join(' ')}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeOpacity="0.5"
                    />
                  )}
                </svg>
                <div className="flex flex-col gap-1">
                  {currentData.grid.map((row, r) => (
                    <div key={r} className="flex gap-1">
                      {row.map((char, c) => {
                        const isVisited = currentData.route?.some(([rr, cc]) => rr === r && cc === c);
                        const isCurrent = currentData.currentPos?.[0] === r && currentData.currentPos?.[1] === c;
                        
                        return (
                          <span
                            key={`${r}-${c}`}
                            className={cn(
                              'cipher-cell transition-all duration-300',
                              isCurrent && 'cipher-cell-active',
                              isVisited && !isCurrent && 'cipher-cell-highlight'
                            )}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              {currentData.partial && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Ciphertext so far:</p>
                  <p className="font-mono tracking-wider text-foreground">{currentData.partial}</p>
                </div>
              )}
            </div>
          )}

          {currentData?.type === 'result' && (
            <div className="text-center fade-in">
              <p className="text-xs text-muted-foreground mb-2">Complete Ciphertext (Spiral Route)</p>
              <p className="font-mono text-2xl tracking-wider text-foreground">{currentData.ciphertext}</p>
            </div>
          )}
        </div>
      </div>

      <PlaybackControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={steps.length}
        onPlay={play}
        onPause={pause}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onReset={reset}
      />
    </div>
  );
}
