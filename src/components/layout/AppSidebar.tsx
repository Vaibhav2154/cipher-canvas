import {
  Lock,
  Key,
  Grid3X3,
  Binary,
  Shuffle,
  BookOpen,
  PanelLeft,
  Cat,
  Heart,
} from 'lucide-react';
import { CipherType } from '@/types/cipher';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  selectedCipher: CipherType;
  onSelectCipher: (cipher: CipherType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ciphers = [
  { id: 'scytale', name: 'Scytale', icon: Lock },
  { id: 'route', name: 'Route', icon: Shuffle },
  { id: 'columnar', name: 'Columnar', icon: Grid3X3 },
  { id: 'bacon', name: "Bacon's", icon: Binary },
  { id: 'feistel', name: 'Feistel', icon: Key },
] as const;

export function AppSidebar({
  selectedCipher,
  onSelectCipher,
  isOpen,
  onClose,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Header */}
      <div className="relative p-6 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center rounded-full shadow-lg">
            <Cat className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground flex items-center gap-1">
              Cipher Cats
              <Heart className="w-3 h-3 text-primary" />
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
              Cryptography Playground
            </p>
          </div>
        </div>

        {/* Close Sidebar Button */}
       <Button
  variant="ghost"
  size="icon"
  onClick={onClose}
  className="
    absolute top-4 right-4
    text-sidebar-foreground
    hover:bg-sidebar-accent
    hover:text-sidebar-accent-foreground
  "
>
  <PanelLeft className="w-4 h-4 rotate-180" />
</Button>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs uppercase tracking-wider text-sidebar-foreground/40 mb-4 px-3">
          Ciphers
        </p>
        <ul className="space-y-1">
          {ciphers.map((cipher) => {
            const Icon = cipher.icon;
            const isSelected = selectedCipher === cipher.id;

            return (
              <li key={cipher.id}>
                <button
                  onClick={() => onSelectCipher(cipher.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-md',
                    isSelected
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cipher.name} Cipher</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 ">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          <p className="text-xs text-sidebar-foreground/50 font-medium">
            Interactive Learning
          </p>
          <Heart className="w-4 h-4 text-primary" />
        </div>
      </div>
    </aside>
  );
}
