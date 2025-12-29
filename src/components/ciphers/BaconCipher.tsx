import { useState, useMemo } from 'react';
import { useCipherAnimation } from '@/hooks/useCipherAnimation';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { CipherInput } from '@/components/controls/CipherInput';
import { CipherStep } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface BaconCipherProps {
  className?: string;
}


const BACON_TABLE: Record<string, string> = {
  A: 'AAAAA', B: 'AAAAB', C: 'AAABA', D: 'AAABB', E: 'AABAA',
  F: 'AABAB', G: 'AABBA', H: 'AABBB', I: 'ABAAA', J: 'ABAAA',
  K: 'ABAAB', L: 'ABABA', M: 'ABABB', N: 'ABBAA', O: 'ABBAB',
  P: 'ABBBA', Q: 'ABBBB', R: 'BAAAA', S: 'BAAAB', T: 'BAABA',
  U: 'BAABB', V: 'BAABB', W: 'BABAA', X: 'BABAB', Y: 'BABBA',
  Z: 'BABBB'
};

const REVERSE_TABLE: Record<string, string> = Object.fromEntries(
  Object.entries(BACON_TABLE).map(([k, v]) => [v, k])
);


function encryptBacon(text: string) {
  const clean = text.replace(/[^A-Z]/gi, '').toUpperCase();
  if (!clean) return { steps: [], result: '' };

  const steps: CipherStep[] = [];
  let ciphertext = '';
  const encodings: { letter: string; code: string }[] = [];

  steps.push({
    description: `Plaintext: "${clean}"`,
    visualData: { type: 'text', text: clean }
  });

  for (let i = 0; i < clean.length; i++) {
    const letter = clean[i];
    const code = BACON_TABLE[letter];
    encodings.push({ letter, code });
    ciphertext += code;

    steps.push({
      description: `Encoding "${letter}" → ${code}`,
      visualData: {
        type: 'encoding',
        encodings: [...encodings],
        currentIndex: i,
        partial: ciphertext
      }
    });
  }

  steps.push({
    description: 'Binary representation (A=0, B=1)',
    visualData: { type: 'binary', encodings, ciphertext }
  });

  steps.push({
    description: 'Encryption complete',
    visualData: { type: 'result', ciphertext, encodings }
  });

  return { steps, result: ciphertext };
}


function decryptBacon(text: string) {
  const clean = text.replace(/[^AB]/gi, '').toUpperCase();
  if (!clean || clean.length % 5 !== 0) {
    return { steps: [], result: '' };
  }

  const steps: CipherStep[] = [];
  let plaintext = '';
  const groups: { code: string; letter: string }[] = [];

  steps.push({
    description: `Ciphertext grouped into 5-bit blocks`,
    visualData: { type: 'ciphertext', text: clean }
  });

  for (let i = 0; i < clean.length; i += 5) {
    const block = clean.slice(i, i + 5);
    const letter = REVERSE_TABLE[block] || '?';
    groups.push({ code: block, letter });
    plaintext += letter;

    steps.push({
      description: `Decoding ${block} → "${letter}"`,
      visualData: {
        type: 'decoding',
        groups: [...groups],
        currentIndex: groups.length - 1,
        partial: plaintext
      }
    });
  }

  steps.push({
    description: 'Decryption complete',
    visualData: { type: 'result', ciphertext: plaintext }
  });

  return { steps, result: plaintext };
}


export function BaconCipher({ className }: BaconCipherProps) {
  const [text, setText] = useState('HELLO');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [output, setOutput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { steps } = useMemo(() => {
    if (!isAnimating) {
      return {
        steps: [
          { description: 'Enter text and run animation', visualData: { type: 'empty' } }
        ]
      };
    }

    return mode === 'encrypt'
      ? encryptBacon(text)
      : decryptBacon(text);
  }, [text, mode, isAnimating]);

  const {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useCipherAnimation({ steps, animationSpeed: 800 });

  const handleExecute = () => {
    setIsAnimating(true);
    const result =
      mode === 'encrypt'
        ? encryptBacon(text)
        : decryptBacon(text);

    setOutput(result.result);
    reset();
    setTimeout(play, 100);
  };

  const currentData = steps[currentStep]?.visualData as any;

  return (
    <div className={cn('space-y-6', className)}>
      <CipherInput
        plaintext={text}
        ciphertext={output}
        showKey={false}
        mode={mode}
        onPlaintextChange={setText}
        onModeChange={setMode}
        onExecute={handleExecute}
      />

      <div className="border border-border bg-card p-6">
        <p className="text-sm text-center text-muted-foreground mb-4">
          {steps[currentStep]?.description}
        </p>

        <div className="min-h-[220px] flex items-center justify-center">
          {currentData?.type === 'empty' && (
            <p className="text-muted-foreground">Configure and run</p>
          )}

          {currentData?.type === 'text' && (
            <div className="flex gap-2">
              {currentData.text.split('').map((c: string, i: number) => (
                <span key={i} className="cipher-cell">{c}</span>
              ))}
            </div>
          )}

          {currentData?.type === 'encoding' && (
            <div className="flex gap-4 flex-wrap justify-center">
              {currentData.encodings.map((e: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className={cn(
                    'cipher-cell',
                    i === currentData.currentIndex && 'cipher-cell-active'
                  )}>
                    {e.letter}
                  </span>
                  <div className="flex gap-1">
                    {e.code.split('').map((b: string, j: number) => (
                      <span
                        key={j}
                        className={cn(
                          'w-5 h-5 flex items-center justify-center text-xs font-mono',
                          b === 'A'
                            ? 'border border-border'
                            : 'bg-primary text-primary-foreground'
                        )}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentData?.type === 'decoding' && (
            <div className="flex gap-4 flex-wrap justify-center">
              {currentData.groups.map((g: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    {g.code.split('').map((b: string, j: number) => (
                      <span
                        key={j}
                        className={cn(
                          'w-5 h-5 flex items-center justify-center text-xs font-mono',
                          b === 'A'
                            ? 'border border-border'
                            : 'bg-primary text-primary-foreground'
                        )}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className={cn(
                    'cipher-cell',
                    i === currentData.currentIndex && 'cipher-cell-active'
                  )}>
                    {g.letter}
                  </span>
                </div>
              ))}
            </div>
          )}

          {currentData?.type === 'result' && (
            <p className="font-mono text-xl tracking-wider">
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
