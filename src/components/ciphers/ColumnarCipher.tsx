import { useState, useMemo } from 'react';
import { useCipherAnimation } from '@/hooks/useCipherAnimation';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { CipherInput } from '@/components/controls/CipherInput';
import { CipherStep } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface ColumnarCipherProps {
  className?: string;
}

function getColumnOrder(keyword: string): number[] {
  const chars = keyword.toUpperCase().split('');
  const sorted = [...chars].sort();
  return chars.map(c => sorted.indexOf(c));
}

function generateColumnarSteps(text: string, keyword: string): { steps: CipherStep[]; ciphertext: string } {
  const cleanText = text.replace(/[^A-Z]/g, '');
  const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (!cleanText || cleanKey.length < 2) {
    return { steps: [], ciphertext: '' };
  }

  const cols = cleanKey.length;
  const rows = Math.ceil(cleanText.length / cols);
  const paddedText = cleanText.padEnd(rows * cols, 'X');
  
  const steps: CipherStep[] = [];
  const order = getColumnOrder(cleanKey);
  
  // Step 1: Show keyword and order
  steps.push({
    description: `Keyword: "${cleanKey}" → Column order determined alphabetically`,
    visualData: { 
      type: 'keyword', 
      keyword: cleanKey,
      order: order.map((_, i) => order.indexOf(i))
    }
  });

  // Step 2: Build grid
  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push(paddedText.slice(r * cols, (r + 1) * cols).split(''));
  }

  steps.push({
    description: 'Text written into rows under keyword',
    visualData: { 
      type: 'grid', 
      keyword: cleanKey,
      order: order.map((_, i) => order.indexOf(i)),
      grid: grid.map(r => [...r])
    }
  });

  // Step 3: Read in column order
  let ciphertext = '';
  for (let orderIndex = 0; orderIndex < cols; orderIndex++) {
    const colIndex = order.indexOf(orderIndex);
    let columnText = '';
    for (let r = 0; r < rows; r++) {
      columnText += grid[r][colIndex];
    }
    ciphertext += columnText;
    
    steps.push({
      description: `Reading column "${cleanKey[colIndex]}" (order ${orderIndex + 1}): "${columnText}"`,
      visualData: { 
        type: 'grid', 
        keyword: cleanKey,
        order: order.map((_, i) => order.indexOf(i)),
        grid: grid.map(r => [...r]),
        highlightColumn: colIndex,
        readOrder: orderIndex,
        partial: ciphertext
      }
    });
  }

  // Final step
  steps.push({
    description: `Ciphertext complete: "${ciphertext}"`,
    visualData: { type: 'result', ciphertext }
  });

  return { steps, ciphertext };
}

export function ColumnarCipher({ className }: ColumnarCipherProps) {
  const [plaintext, setPlaintext] = useState('ATTACKATDAWN');
  const [keyValue, setKeyValue] = useState('ZEBRA');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [displayCiphertext, setDisplayCiphertext] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { steps } = useMemo(() => {
    if (!isAnimating) return { steps: [{ description: 'Enter text and keyword, then click "Run Animation"', visualData: { type: 'empty' } }] };
    return generateColumnarSteps(plaintext, keyValue);
  }, [plaintext, keyValue, isAnimating]);

  const {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useCipherAnimation({ steps, animationSpeed: 1000 });

  const handleExecute = () => {
    setIsAnimating(true);
    const result = generateColumnarSteps(plaintext, keyValue);
    setDisplayCiphertext(result.ciphertext);
    reset();
    setTimeout(play, 100);
  };

  const currentData = steps[currentStep]?.visualData as {
    type: string;
    keyword?: string;
    order?: number[];
    grid?: string[][];
    highlightColumn?: number;
    readOrder?: number;
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
        keyLabel="Keyword"
        keyPlaceholder="e.g., ZEBRA"
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

          {currentData?.type === 'keyword' && currentData.keyword && (
            <div className="space-y-4 fade-in">
              <div className="flex gap-1 justify-center">
                {currentData.keyword.split('').map((char, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="cipher-cell cipher-cell-active">{char}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {(currentData.order?.[i] ?? 0) + 1}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Numbers show read order (alphabetically sorted)
              </p>
            </div>
          )}

          {currentData?.type === 'grid' && currentData.grid && currentData.keyword && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                {/* Keyword row */}
                <div className="flex gap-1 justify-center">
                  {currentData.keyword.split('').map((char, i) => (
                    <div key={`key-${i}`} className="flex flex-col items-center gap-1">
                      <span 
                        className={cn(
                          'cipher-cell transition-all duration-300',
                          currentData.highlightColumn === i && 'cipher-cell-active'
                        )}
                      >
                        {char}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {(currentData.order?.[i] ?? 0) + 1}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Grid rows */}
                {currentData.grid.map((row, r) => (
                  <div key={r} className="flex gap-1 justify-center">
                    {row.map((char, c) => (
                      <span
                        key={`${r}-${c}`}
                        className={cn(
                          'cipher-cell transition-all duration-300',
                          currentData.highlightColumn === c && 'cipher-cell-highlight'
                        )}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              {currentData.partial && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Ciphertext so far:</p>
                  <p className="font-mono tracking-wider">{currentData.partial}</p>
                </div>
              )}
            </div>
          )}

          {currentData?.type === 'result' && (
            <div className="text-center fade-in">
              <p className="text-xs text-muted-foreground mb-2">Complete Ciphertext</p>
              <p className="font-mono text-2xl tracking-wider">{currentData.ciphertext}</p>
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
