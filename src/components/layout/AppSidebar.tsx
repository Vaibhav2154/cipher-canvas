import { Lock, Key, Grid3X3, Binary, Shuffle, BookOpen } from 'lucide-react';
import { CipherType } from '@/types/cipher';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  selectedCipher: CipherType;
  onSelectCipher: (cipher: CipherType) => void;
}

const ciphers: { id: CipherType; name: string; icon: React.ElementType }[] = [
  { id: 'scytale', name: 'Scytale', icon: Lock },
  { id: 'route', name: 'Route', icon: Shuffle },
  { id: 'columnar', name: 'Columnar', icon: Grid3X3 },
  { id: 'bacon', name: "Bacon's", icon: Binary },
  { id: 'feistel', name: 'Feistel', icon: Key },
];

export function AppSidebar({ selectedCipher, onSelectCipher }: AppSidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-foreground">Cryptography</h1>
            <p className="text-xs text-sidebar-foreground/60">Visual Demonstrator</p>
          </div>
        </div>
      </div>

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
                    'w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
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

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/40 text-center">
          Interactive Learning Tool
        </p>
      </div>
    </aside>
  );
}
