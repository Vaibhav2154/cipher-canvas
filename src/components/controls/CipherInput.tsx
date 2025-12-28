import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';

interface CipherInputProps {
  plaintext: string;
  ciphertext: string;
  keyValue?: string;
  showKey?: boolean;
  mode: 'encrypt' | 'decrypt';
  onPlaintextChange: (value: string) => void;
  onKeyChange?: (value: string) => void;
  onModeChange: (mode: 'encrypt' | 'decrypt') => void;
  onExecute: () => void;
  keyLabel?: string;
  keyPlaceholder?: string;
}

export function CipherInput({
  plaintext,
  ciphertext,
  keyValue = '',
  showKey = true,
  mode,
  onPlaintextChange,
  onKeyChange,
  onModeChange,
  onExecute,
  keyLabel = 'Key',
  keyPlaceholder = 'Enter key...',
}: CipherInputProps) {
  return (
    <div className="space-y-4 p-4 border border-border bg-card">
      <div className="flex gap-2">
        <Button
          variant={mode === 'encrypt' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onModeChange('encrypt')}
          className="flex items-center gap-2"
        >
          <Lock className="w-3 h-3" />
          Encrypt
        </Button>
        <Button
          variant={mode === 'decrypt' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onModeChange('decrypt')}
          className="flex items-center gap-2"
        >
          <Unlock className="w-3 h-3" />
          Decrypt
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="plaintext" className="text-xs uppercase tracking-wider text-muted-foreground">
            {mode === 'encrypt' ? 'Plaintext' : 'Input'}
          </Label>
          <Input
            id="plaintext"
            value={plaintext}
            onChange={(e) => onPlaintextChange(e.target.value.toUpperCase())}
            placeholder="Enter text..."
            className="font-mono"
          />
        </div>

        {showKey && (
          <div className="space-y-2">
            <Label htmlFor="key" className="text-xs uppercase tracking-wider text-muted-foreground">
              {keyLabel}
            </Label>
            <Input
              id="key"
              value={keyValue}
              onChange={(e) => onKeyChange?.(e.target.value)}
              placeholder={keyPlaceholder}
              className="font-mono"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={onExecute} className="px-8">
          Run Animation
        </Button>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {mode === 'encrypt' ? 'Ciphertext' : 'Output'}
          </p>
          <p className="font-mono text-lg tracking-wider">
            {ciphertext || '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
