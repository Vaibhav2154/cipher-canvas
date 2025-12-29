import { useState, useMemo } from 'react';
import { useCipherAnimation } from '@/hooks/useCipherAnimation';
import { PlaybackControls } from '@/components/controls/PlaybackControls';
import { CipherInput } from '@/components/controls/CipherInput';
import { CipherStep } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface FeistelCipherProps {
  className?: string;
}

function simpleRoundFunction(data: string, key: string): string {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    const d = data.charCodeAt(i) - 65;
    const k = key.charCodeAt(i % key.length) - 65;
    result += String.fromCharCode(((d + k) % 26) + 65);
  }
  return result;
}

function addStrings(a: string, b: string): string {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    const aVal = a.charCodeAt(i) - 65;
    const bVal = b.charCodeAt(i) - 65;
    result += String.fromCharCode(((aVal + bVal) % 26) + 65);
  }
  return result;
}

function subStrings(a: string, b: string): string {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    const aVal = a.charCodeAt(i) - 65;
    const bVal = b.charCodeAt(i) - 65;
    result += String.fromCharCode(((aVal - bVal + 26) % 26) + 65);
  }
  return result;
}

function generateFeistelSteps(text: string, key: string, mode: 'encrypt' | 'decrypt', rounds: number = 4): { steps: CipherStep[]; ciphertext: string } {
  // Clean and normalize input text
  let cleanText = text.replace(/[^A-Za-z]/g, '').toUpperCase();
  
  // For encryption, pad to 8 characters. For decryption, ensure exactly 8 characters
  if (mode === 'encrypt') {
    cleanText = cleanText.padEnd(8, 'X').slice(0, 8);
  } else {
    // For decryption, the input should already be 8 characters, but ensure it
    cleanText = cleanText.slice(0, 8).padEnd(8, 'A');
  }
  
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  if (mode === 'decrypt') {
    return generateDecryptSteps(cleanText, cleanKey, rounds);
  }
  
  const steps: CipherStep[] = [];
  
  steps.push({
    description: `Starting encryption with plaintext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText }
  });
  
  // Step 1: Initial split
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  steps.push({
    description: `Split input "${cleanText}" into L₀="${L}" and R₀="${R}"`,
    visualData: { 
      type: 'split',
      L, R,
      round: 0
    }
  });

  // Process each round
  for (let round = 1; round <= rounds; round++) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(R, roundKey);
    const L_prev = L;
    const R_prev = R;
    const newL = R;
    const newR = addStrings(L, fResult);
    
    // Show round function
    steps.push({
      description: `Round ${round}: F(R, K${round}) = F("${R}", "${roundKey.slice(0, 4)}") = "${fResult}"`,
      visualData: { 
        type: 'round',
        L, R,
        roundKey: roundKey.slice(0, 4),
        fResult,
        round,
        phase: 'function'
      }
    });

    // Show addition operation
    steps.push({
      description: `Round ${round}: L + F(R, K) = "${L_prev}" + "${fResult}" = "${newR}"`,
      visualData: { 
        type: 'round',
        L: L_prev, R: R_prev,
        newL,
        newR,
        fResult,
        round,
        phase: 'add'
      }
    });

    // Update L and R for next round
    L = newL;
    R = newR;
    
    // Show swap (except for final round)
    if (round < rounds) {
      steps.push({
        description: `Round ${round}: Swap → L${round}="${L}", R${round}="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round,
          phase: 'swap'
        }
      });
    } else {
      // Final round - show no swap
      steps.push({
        description: `Round ${round}: Final round - no swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round,
          phase: 'final'
        }
      });
    }
  }

  // Final combination
  const ciphertext = L + R;
  
  steps.push({
    description: `Final output: "${ciphertext}"`,
    visualData: { type: 'result', L, R, ciphertext }
  });

  return { steps, ciphertext };
}

function generateDecryptSteps(ciphertext: string, key: string, rounds: number): { steps: CipherStep[]; ciphertext: string } {
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  const steps: CipherStep[] = [];
  
  steps.push({
    description: `Starting decryption with ciphertext: "${ciphertext}"`,
    visualData: { type: 'text', text: ciphertext }
  });
  
  // Initial split
  let L = ciphertext.slice(0, 4);
  let R = ciphertext.slice(4, 8);
  
  steps.push({
    description: `Split ciphertext "${ciphertext}" into L₀="${L}" and R₀="${R}"`,
    visualData: { 
      type: 'split',
      L, R,
      round: 0
    }
  });

  // Reverse the rounds for decryption
  for (let round = rounds; round >= 1; round--) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(L, roundKey);
    const newR = L;
    const newL = subStrings(R, fResult);
    
    steps.push({
      description: `Decrypt Round ${rounds - round + 1}: F(L, K${round}) = F("${L}", "${roundKey.slice(0, 4)}") = "${fResult}"`,
      visualData: { 
        type: 'round',
        L, R,
        roundKey: roundKey.slice(0, 4),
        fResult,
        round: rounds - round + 1,
        phase: 'function'
      }
    });

    steps.push({
      description: `Decrypt Round ${rounds - round + 1}: R - F(L, K) = "${R}" - "${fResult}" = "${newL}"`,
      visualData: { 
        type: 'round',
        L, R,
        newL,
        newR,
        fResult,
        round: rounds - round + 1,
        phase: 'subtract'
      }
    });

    // Update for next round
    L = newL;
    R = newR;
    
    // Show swap for all rounds except the last decryption round
    if (round > 1) {
      steps.push({
        description: `Decrypt Round ${rounds - round + 1}: Swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round: rounds - round + 1,
          phase: 'swap'
        }
      });
    } else {
      // Final decryption round - no swap
      steps.push({
        description: `Decrypt Round ${rounds - round + 1}: Final round - no swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round: rounds - round + 1,
          phase: 'final'
        }
      });
    }
  }

  const plaintext = (L + R).replace(/X+$/, '');
  
  steps.push({
    description: `Decryption complete: "${plaintext}"`,
    visualData: { type: 'result', L, R, ciphertext: plaintext }
  });

  return { steps, ciphertext: plaintext };
}

export function FeistelCipher({ className }: FeistelCipherProps) {
  const [plaintext, setPlaintext] = useState('SECURITY');
  const [keyValue, setKeyValue] = useState('CRYPTO');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [displayCiphertext, setDisplayCiphertext] = useState('');
  const [displayPlaintext, setDisplayPlaintext] = useState('');
  const [ciphertextInput, setCiphertextInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const { steps } = useMemo(() => {
    if (!isAnimating) return { steps: [{ description: 'Enter text and key, then click "Run Animation"', visualData: { type: 'empty' } }] };
    const inputText = mode === 'encrypt' ? plaintext : ciphertextInput || displayCiphertext || plaintext;
    return generateFeistelSteps(inputText, keyValue, mode);
  }, [plaintext, ciphertextInput, displayCiphertext, keyValue, mode, isAnimating]);

  const {
    currentStep,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useCipherAnimation({ steps, animationSpeed: 1200 });

  const handleExecute = () => {
    setIsAnimating(true);
    const inputText = mode === 'encrypt' ? plaintext : ciphertextInput || displayCiphertext;
    const result = generateFeistelSteps(inputText, keyValue, mode);
    
    if (mode === 'encrypt') {
      setDisplayCiphertext(result.ciphertext);
    } else {
      // For decryption, the result is plaintext - update the plaintext output field
      setDisplayPlaintext(result.ciphertext); // result.ciphertext contains the decrypted plaintext
    }
    
    reset();
    setTimeout(play, 100);
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setIsAnimating(false);
    // Clear outputs when switching modes
    if (newMode === 'encrypt') {
      setDisplayPlaintext('');
    } else {
      setDisplayCiphertext('');
    }
    if (newMode === 'decrypt' && displayCiphertext) {
      setCiphertextInput(displayCiphertext);
    }
  };

  const handlePlaintextChange = (value: string) => {
    if (mode === 'encrypt') {
      setPlaintext(value);
    } else {
      setCiphertextInput(value);
    }
  };

  const currentData = steps[currentStep]?.visualData as {
    type: string;
    text?: string;
    L?: string;
    R?: string;
    newL?: string;
    newR?: string;
    roundKey?: string;
    fResult?: string;
    round?: number;
    phase?: string;
    ciphertext?: string;
  };

  return (
    <div className={cn('space-y-6', className)}>
      <CipherInput
        plaintext={mode === 'encrypt' ? plaintext : ciphertextInput}
        ciphertext={mode === 'encrypt' ? displayCiphertext : displayPlaintext}
        keyValue={keyValue}
        mode={mode}
        onPlaintextChange={handlePlaintextChange}
        onKeyChange={setKeyValue}
        onModeChange={handleModeChange}
        onExecute={handleExecute}
        keyLabel="Key"
        keyPlaceholder="e.g., CRYPTO"
      />

      <div className="border border-border bg-card p-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            {steps[currentStep]?.description}
          </p>
        </div>

        <div className="min-h-[280px] flex items-center justify-center">
          {currentData?.type === 'empty' && (
            <p className="text-muted-foreground">Configure and run to see animation</p>
          )}

          {currentData?.type === 'text' && (
            <div className="flex gap-1 flex-wrap justify-center fade-in">
              {(currentData.text || '').split('').map((char, i) => (
                <span key={i} className="cipher-cell">
                  {char}
                </span>
              ))}
            </div>
          )}

          {currentData?.type === 'split' && (
            <div className="flex items-center gap-8 fade-in">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Left Half (L₀)</p>
                <div className="flex gap-1">
                  {(currentData.L || '').split('').map((c, i) => (
                    <span key={i} className="cipher-cell cipher-cell-highlight">{c}</span>
                  ))}
                </div>
              </div>
              <div className="text-2xl text-muted-foreground">|</div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Right Half (R₀)</p>
                <div className="flex gap-1">
                  {(currentData.R || '').split('').map((c, i) => (
                    <span key={i} className="cipher-cell cipher-cell-active">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentData?.type === 'round' && (
            <div className="space-y-6">
              {/* Feistel structure visualization */}
              <div className="flex items-center justify-center gap-12">
                {/* Left side */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">L</p>
                  <div className="flex gap-0.5">
                    {(currentData.L || '').split('').map((c, i) => (
                      <span key={i} className="cipher-cell">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Center - Feistel structure */}
                <div className="flex flex-col items-center gap-2">
                  {currentData.phase === 'function' && (
                    <div className="fade-in flex flex-col items-center">
                      <div className="px-4 py-2 border border-primary bg-primary/10">
                        <span className="font-mono text-sm">F(R, K{currentData.round})</span>
                      </div>
                      <div className="h-4 border-l border-primary" />
                      <span className="text-xs font-mono">{currentData.fResult}</span>
                    </div>
                  )}
                  
                  {currentData.phase === 'xor' && (
                    <div className="fade-in flex flex-col items-center">
                      <span className="text-2xl font-mono">⊕</span>
                      <span className="text-xs text-muted-foreground">XOR with L</span>
                    </div>
                  )}

                  {currentData.phase === 'add' && (
                    <div className="fade-in flex flex-col items-center">
                      <span className="text-2xl font-mono">+</span>
                      <span className="text-xs text-muted-foreground">ADD with L</span>
                    </div>
                  )}

                  {currentData.phase === 'subtract' && (
                    <div className="fade-in flex flex-col items-center">
                      <span className="text-2xl font-mono">-</span>
                      <span className="text-xs text-muted-foreground">SUB from R</span>
                    </div>
                  )}

                  {currentData.phase === 'swap' && (
                    <div className="fade-in flex items-center gap-2">
                      <span className="text-xl">↔</span>
                      <span className="text-xs text-muted-foreground">Swap</span>
                    </div>
                  )}
                </div>

                {/* Right side */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">R</p>
                  <div className="flex gap-0.5">
                    {(currentData.R || '').split('').map((c, i) => (
                      <span key={i} className={cn(
                        'cipher-cell',
                        currentData.phase === 'function' && 'cipher-cell-active'
                      )}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Round indicator */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4].map(r => (
                  <span
                    key={r}
                    className={cn(
                      'w-6 h-6 flex items-center justify-center text-xs font-mono border',
                      r === currentData.round
                        ? 'bg-primary text-primary-foreground border-primary'
                        : r < (currentData.round || 0)
                        ? 'bg-muted border-border'
                        : 'border-border'
                    )}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentData?.type === 'result' && (
            <div className="text-center fade-in space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">L Final</p>
                  <p className="font-mono text-lg text-foreground">{currentData.L}</p>
                </div>
                <span className="text-muted-foreground">+</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">R Final</p>
                  <p className="font-mono text-lg text-foreground">{currentData.R}</p>
                </div>
                <span className="text-muted-foreground">=</span>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Ciphertext</p>
                  <p className="font-mono text-xl text-foreground">{currentData.ciphertext}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                4 rounds completed using Feistel structure
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
