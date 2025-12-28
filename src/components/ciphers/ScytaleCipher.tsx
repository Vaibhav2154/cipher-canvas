import { useState, useMemo } from 'react';
import { useCipherAnimation } from '@/hooks/useCipherAnimation';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { CipherInput } from '@/components/controls/CipherInput';
import { CipherStep } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface ScytaleCipherProps {
  className?: string;
}

function generateScytaleSteps(text: string, columns: number): { steps: CipherStep[]; ciphertext: string } {
  const cleanText = text.replace(/[^A-Z]/g, '');
  if (!cleanText || columns < 2) {
    return { steps: [], ciphertext: '' };
  }

  const rows = Math.ceil(cleanText.length / columns);
  const paddedText = cleanText.padEnd(rows * columns, 'X');
  
  const steps: CipherStep[] = [];
  const grid: string[][] = [];
  
  // Step 1: Initial text
  steps.push({
    description: `Starting with plaintext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText, highlight: [] }
  });

  // Step 2: Create grid row by row
  for (let r = 0; r < rows; r++) {
    const row = paddedText.slice(r * columns, (r + 1) * columns).split('');
    grid.push(row);
    
    steps.push({
      description: `Writing row ${r + 1}: "${row.join('')}"`,
      visualData: { 
        type: 'grid', 
        grid: [...grid.map(row => [...row])],
        columns,
        highlightRow: r
      }
    });
  }

  // Step 3: Read columns
  let ciphertext = '';
  for (let c = 0; c < columns; c++) {
    let columnText = '';
    for (let r = 0; r < rows; r++) {
      columnText += grid[r][c];
    }
    ciphertext += columnText;
    
    steps.push({
      description: `Reading column ${c + 1}: "${columnText}"`,
      visualData: { 
        type: 'grid', 
        grid: grid.map(row => [...row]),
        columns,
        highlightColumn: c,
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

export function ScytaleCipher({ className }: ScytaleCipherProps) {
  const [plaintext, setPlaintext] = useState('HELLOSPARTANS');
  const [keyValue, setKeyValue] = useState('4');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [displayCiphertext, setDisplayCiphertext] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const columns = parseInt(keyValue) || 4;

  const animationSteps = useMemo(() => {
    if (!isAnimating) return [{ description: 'Enter text and click "Run Animation"', visualData: { type: 'empty' } }];
    return generateScytaleSteps(plaintext, columns).steps;
  }, [plaintext, columns, isAnimating]);

  const {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useCipherAnimation({ steps: animationSteps, animationSpeed: 800 });

  const handleExecute = () => {
    setIsAnimating(true);
    const result = generateScytaleSteps(plaintext, columns);
    setDisplayCiphertext(result.ciphertext);
    reset();
    setTimeout(play, 100);
  };

  const currentData = animationSteps[currentStep]?.visualData as {
    type: string;
    grid?: string[][];
    columns?: number;
    highlightRow?: number;
    highlightColumn?: number;
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
            {animationSteps[currentStep]?.description}
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
              <div className="flex flex-col gap-1">
                {currentData.grid.map((row, r) => (
                  <div key={r} className="flex gap-1">
                    {row.map((char, c) => (
                      <span
                        key={`${r}-${c}`}
                        className={cn(
                          'cipher-cell transition-all duration-300',
                          currentData.highlightRow === r && 'cipher-cell-active',
                          currentData.highlightColumn === c && 'cipher-cell-active'
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
        totalSteps={animationSteps.length}
        
        onPlay={play}
        onPause={pause}
        onStepForward={stepForward}
        onStepBackward={stepBackward}
        onReset={reset}
      />
    </div>
  );
}
