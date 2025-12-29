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
  const indexed = chars.map((char, index) => ({ char, index }));

  indexed.sort((a, b) =>
    a.char === b.char ? a.index - b.index : a.char.localeCompare(b.char)
  );

  const order: number[] = [];
  indexed.forEach((item, rank) => {
    order[item.index] = rank;
  });

  return order;
}


function encryptColumnar(text: string, keyword: string) {
  const cleanText = text.replace(/[^A-Z]/gi, '').toUpperCase();
  const cleanKey = keyword.replace(/[^A-Z]/gi, '').toUpperCase();

  if (!cleanText || cleanKey.length < 2) {
    return { steps: [], result: '' };
  }

  const cols = cleanKey.length;
  const rows = Math.ceil(cleanText.length / cols);
  const padded = cleanText.padEnd(rows * cols, 'X');

  const grid: string[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push(padded.slice(r * cols, (r + 1) * cols).split(''));
  }

  const order = getColumnOrder(cleanKey);
  const steps: CipherStep[] = [];

  steps.push({
    description: `Keyword "${cleanKey}" sorted (duplicate-safe)`,
    visualData: { type: 'keyword', keyword: cleanKey, order }
  });

  steps.push({
    description: 'Plaintext written row-wise',
    visualData: { type: 'grid', keyword: cleanKey, order, grid }
  });

  let ciphertext = '';

  for (let rank = 0; rank < cols; rank++) {
    const col = order.indexOf(rank);
    let chunk = '';
    for (let r = 0; r < rows; r++) chunk += grid[r][col];
    ciphertext += chunk;

    steps.push({
      description: `Reading column "${cleanKey[col]}"`,
      visualData: {
        type: 'grid',
        keyword: cleanKey,
        order,
        grid,
        highlightColumn: col,
        partial: ciphertext
      }
    });
  }

  steps.push({
    description: 'Encryption complete',
    visualData: { type: 'result', ciphertext }
  });

  return { steps, result: ciphertext };
}


function decryptColumnar(text: string, keyword: string) {
  const cleanText = text.replace(/[^A-Z]/gi, '').toUpperCase();
  const cleanKey = keyword.replace(/[^A-Z]/gi, '').toUpperCase();

  if (!cleanText || cleanKey.length < 2) {
    return { steps: [], result: '' };
  }

  const cols = cleanKey.length;
  const rows = Math.ceil(cleanText.length / cols);
  const order = getColumnOrder(cleanKey);

  const grid: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill('')
  );

  let index = 0;
  const steps: CipherStep[] = [];

  steps.push({
    description: `Keyword "${cleanKey}" sorted (duplicate-safe)`,
    visualData: { type: 'keyword', keyword: cleanKey, order }
  });

  for (let rank = 0; rank < cols; rank++) {
    const col = order.indexOf(rank);
    for (let r = 0; r < rows; r++) {
      grid[r][col] = cleanText[index++] || 'X';
    }

    steps.push({
      description: `Placing column "${cleanKey[col]}"`,
      visualData: {
        type: 'grid',
        keyword: cleanKey,
        order,
        grid: grid.map(row => [...row]),
        highlightColumn: col
      }
    });
  }

  let plaintext = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      plaintext += grid[r][c];
    }
  }

  plaintext = plaintext.replace(/X+$/, '');

  steps.push({
    description: 'Decryption complete',
    visualData: { type: 'result', ciphertext: plaintext }
  });

  return { steps, result: plaintext };
}


export function ColumnarCipher({ className }: ColumnarCipherProps) {
  const [plaintext, setPlaintext] = useState('ATTACKATDAWN');
  const [keyValue, setKeyValue] = useState('ZEBRA');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [output, setOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { steps } = useMemo(() => {
    if (!isAnimating) {
      return {
        steps: [
          {
            description: 'Enter text and keyword, then run',
            visualData: { type: 'empty' }
          }
        ]
      };
    }

    return mode === 'encrypt'
      ? encryptColumnar(plaintext, keyValue)
      : decryptColumnar(plaintext, keyValue);
  }, [plaintext, keyValue, mode, isAnimating]);

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

    const result =
      mode === 'encrypt'
        ? encryptColumnar(plaintext, keyValue)
        : decryptColumnar(plaintext, keyValue);

    setOutput(result.result);
    reset();
    setTimeout(play, 100);
  };

  const currentData = steps[currentStep]?.visualData as any;

  return (
    <div className={cn('space-y-6', className)}>
      <CipherInput
        plaintext={plaintext}
        ciphertext={output}
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
        <p className="text-sm text-center text-muted-foreground mb-4">
          {steps[currentStep]?.description}
        </p>

        <div className="min-h-[220px] flex items-center justify-center">
          {currentData?.type === 'empty' && (
            <p className="text-muted-foreground">
              Configure and run to see animation
            </p>
          )}

          {currentData?.type === 'keyword' && (
            <div className="flex gap-3 justify-center">
              {currentData.keyword.split('').map((char: string, i: number) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="cipher-cell cipher-cell-active">{char}</span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {(currentData.order[i] ?? 0) + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {currentData?.type === 'grid' && (
            <div className="space-y-3">
              <div className="flex gap-2 justify-center">
                {currentData.keyword.split('').map((char: string, i: number) => (
                  <span
                    key={i}
                    className={cn(
                      'cipher-cell',
                      currentData.highlightColumn === i &&
                        'cipher-cell-active'
                    )}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {currentData.grid.map((row: string[], r: number) => (
                <div key={r} className="flex gap-2 justify-center">
                  {row.map((char: string, c: number) => (
                    <span
                      key={`${r}-${c}`}
                      className={cn(
                        'cipher-cell',
                        currentData.highlightColumn === c &&
                          'cipher-cell-highlight'
                      )}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}

              {currentData.partial && (
                <p className="text-center font-mono">
                  {currentData.partial}
                </p>
              )}
            </div>
          )}

          {currentData?.type === 'result' && (
            <p className="font-mono text-2xl tracking-wider">
              {currentData.ciphertext}
            </p>
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
