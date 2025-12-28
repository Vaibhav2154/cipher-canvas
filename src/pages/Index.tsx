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

const cipherComponents: Record<CipherType, React.ComponentType<{ className?: string }>> = {
  scytale: ScytaleCipher,
  route: RouteCipher,
  columnar: ColumnarCipher,
  bacon: BaconCipher,
  feistel: FeistelCipher,
};

export default function Index() {
  const [selectedCipher, setSelectedCipher] = useState<CipherType>('scytale');
  
  const CipherComponent = cipherComponents[selectedCipher];
  const documentation = cipherDocumentation[selectedCipher];

  return (
    <div className="flex min-h-screen w-full dark">
      <AppSidebar 
        selectedCipher={selectedCipher} 
        onSelectCipher={setSelectedCipher} 
      />
      
      <main className="flex-1 flex">
        {/* Visual Demo Area */}
        <section className="flex-1 p-6 overflow-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">{documentation.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive step-by-step visualization
            </p>
          </header>
          
          <CipherComponent className="slide-in" />
        </section>

        {/* Documentation Panel */}
        <aside className="w-96 border-l border-border">
          <DocumentationPanel documentation={documentation} />
        </aside>
      </main>
    </div>
  );
}
