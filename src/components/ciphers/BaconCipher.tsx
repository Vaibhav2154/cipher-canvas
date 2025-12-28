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
  'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
  'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAA',
  'K': 'ABAAB', 'L': 'ABABA', 'M': 'ABABB', 'N': 'ABBAA', 'O': 'ABBAB',
  'P': 'ABBBA', 'Q': 'ABBBB', 'R': 'BAAAA', 'S': 'BAAAB', 'T': 'BAABA',
  'U': 'BAABB', 'V': 'BAABB', 'W': 'BABAA', 'X': 'BABAB', 'Y': 'BABBA',
  'Z': 'BABBB'
};

function generateBaconSteps(text: string): { steps: CipherStep[]; ciphertext: string } {
  const cleanText = text.replace(/[^A-Z]/g, '');
  
  if (!cleanText) {
    return { steps: [], ciphertext: '' };
  }

  const steps: CipherStep[] = [];
  
  // Step 1: Show input
  steps.push({
    description: `Starting with plaintext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText }
  });

  // Step 2: Convert each letter
  let ciphertext = '';
  const encodings: { letter: string; code: string }[] = [];
  
  for (let i = 0; i < cleanText.length; i++) {
    const letter = cleanText[i];
    const code = BACON_TABLE[letter] || 'AAAAA';
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

  // Step 3: Show binary representation
  steps.push({
    description: 'Complete binary encoding (A=0, B=1)',
    visualData: { 
      type: 'binary',
      encodings,
      ciphertext
    }
  });

  // Final step
  steps.push({
    description: `Ciphertext: "${ciphertext}"`,
    visualData: { type: 'result', ciphertext, encodings }
  });

  return { steps, ciphertext };
}

export function BaconCipher({ className }: BaconCipherProps) {
  const [plaintext, setPlaintext] = useState('HELLO');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [displayCiphertext, setDisplayCiphertext] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { steps } = useMemo(() => {
    if (!isAnimating) return { steps: [{ description: 'Enter text and click "Run Animation"', visualData: { type: 'empty' } }] };
    return generateBaconSteps(plaintext);
  }, [plaintext, isAnimating]);

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
    const result = generateBaconSteps(plaintext);
    setDisplayCiphertext(result.ciphertext);
    reset();
    setTimeout(play, 100);
  };

  const currentData = steps[currentStep]?.visualData as {
    type: string;
    text?: string;
    encodings?: { letter: string; code: string }[];
    currentIndex?: number;
    ciphertext?: string;
    partial?: string;
  };

  return (
    <div className={cn('space-y-6', className)}>
      <CipherInput
        plaintext={plaintext}
        ciphertext={displayCiphertext}
        showKey={false}
        mode={mode}
        onPlaintextChange={setPlaintext}
        onModeChange={setMode}
        onExecute={handleExecute}
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

          {currentData?.type === 'encoding' && currentData.encodings && (
            <div className="space-y-6">
              <div className="flex gap-4 flex-wrap justify-center">
                {currentData.encodings.map((enc, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      'flex flex-col items-center gap-2 transition-all duration-300',
                      i === currentData.currentIndex && 'scale-110'
                    )}
                  >
                    <span className={cn(
                      'cipher-cell',
                      i === currentData.currentIndex && 'cipher-cell-active'
                    )}>
                      {enc.letter}
                    </span>
                    <div className="flex gap-0.5">
                      {enc.code.split('').map((bit, j) => (
                        <span 
                          key={j}
                          className={cn(
                            'w-5 h-5 flex items-center justify-center text-xs font-mono border border-border transition-colors',
                            bit === 'A' ? 'bg-background' : 'bg-primary text-primary-foreground'
                          )}
                        >
                          {bit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {currentData.partial && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Encoded so far:</p>
                  <p className="font-mono text-sm tracking-wider break-all max-w-md text-foreground">
                    {currentData.partial}
                  </p>
                </div>
              )}
            </div>
          )}

          {currentData?.type === 'binary' && currentData.encodings && (
            <div className="space-y-4 fade-in">
              <div className="flex gap-4 flex-wrap justify-center">
                {currentData.encodings.map((enc, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="cipher-cell">{enc.letter}</span>
                    <div className="flex gap-0.5">
                      {enc.code.split('').map((bit, j) => (
                        <span 
                          key={j}
                          className={cn(
                            'w-5 h-5 flex items-center justify-center text-xs font-mono',
                            bit === 'A' ? 'bg-background border border-border' : 'bg-primary text-primary-foreground'
                          )}
                        >
                          {bit === 'A' ? '0' : '1'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Each letter encoded as 5-bit binary (A=0, B=1)
              </p>
            </div>
          )}

          {currentData?.type === 'result' && (
            <div className="text-center fade-in space-y-4">
              <p className="text-xs text-muted-foreground">Complete Ciphertext</p>
              <p className="font-mono text-lg tracking-wider break-all max-w-lg text-foreground">
                {currentData.ciphertext}
              </p>
              <p className="text-xs text-muted-foreground">
                {(currentData.ciphertext?.length || 0)} bits ({(currentData.ciphertext?.length || 0) / 5} letters × 5 bits)
              </p>
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
