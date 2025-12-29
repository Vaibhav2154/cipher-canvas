import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { DocumentationPanel } from '@/components/documentation/DocumentationPanel';
import { ScytaleCipher } from '@/components/ciphers/ScytaleCipher';
import { RouteCipher } from '@/components/ciphers/RouteCipher';
import { ColumnarCipher } from '@/components/ciphers/ColumnarCipher';
import { BaconCipher } from '@/components/ciphers/BaconCipher';
import { FeistelCipher } from '@/components/ciphers/FeistelCipher';
import { cipherDocumentation } from '@/data/cipherDocs';
import { CipherType } from '@/types/cipher';
import { Button } from '@/components/ui/button';
import { PanelLeft, Cat, Heart } from 'lucide-react';

const cipherComponents: Record<
  CipherType,
  React.ComponentType<{ className?: string }>
> = {
  scytale: ScytaleCipher,
  route: RouteCipher,
  columnar: ColumnarCipher,
  bacon: BaconCipher,
  feistel: FeistelCipher,
};

export default function Index() {
  const [selectedCipher, setSelectedCipher] =
    useState<CipherType>('scytale');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const CipherComponent = cipherComponents[selectedCipher];
  const documentation = cipherDocumentation[selectedCipher];

  return (
    <div className="relative flex min-h-screen bg-background ">
      {/* Sidebar */}
      <AppSidebar
        selectedCipher={selectedCipher}
        onSelectCipher={setSelectedCipher}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'ml-0'
        } pt-14`}  
      >
        {/* Open Sidebar Button */}
        {!sidebarOpen && (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setSidebarOpen(true)}
    className="
      fixed top-4 left-4 z-50
      text-foreground
      bg-background/80 backdrop-blur
      hover:bg-accent
      hover:text-accent-foreground
      shadow-sm
    "
  >
    <PanelLeft className="w-5 h-5" />
  </Button>
)}


        <section
          className={`flex-1 overflow-auto ${
            sidebarOpen ? 'p-6' : 'p-8'  /* ⬅ extra padding when sidebar closed */
          }`}
        >
          <header className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Cat className="w-8 h-8 text-primary" />
              {documentation.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <Heart className="w-4 h-4 text-primary" />
              Interactive step-by-step visualization
            </p>
          </header>

          <CipherComponent className="slide-in" />
        </section>

        <footer className="border-t border-border h-96 bg-background p-4">
          <DocumentationPanel documentation={documentation} />
        </footer>
      </main>
    </div>
  );
}
