import { CipherDocumentation } from '@/types/cipher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentationPanelProps {
  documentation: CipherDocumentation;
}

export function DocumentationPanel({ documentation }: DocumentationPanelProps) {
  return (
    <div className="border border-border bg-background h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">{documentation.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">Documentation & Reference</p>
      </div>

      <Tabs defaultValue="concept" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-2 bg-transparent border-b border-border rounded-none gap-0">
          <TabsTrigger value="concept" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Concept
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            History
          </TabsTrigger>
          <TabsTrigger value="steps" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Steps
          </TabsTrigger>
          <TabsTrigger value="analysis" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Analysis
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="concept" className="mt-0 text-white">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Core Concept
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {documentation.coreConcept}
                  </p>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Modern Relevance
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {documentation.modernRelevance}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 text-white">
              <div className="fade-in">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  Historical Background
                </h3>
                <p className="text-sm leading-relaxed">
                  {documentation.historicalBackground}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="mt-0 text-white">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Encryption Steps
                  </h3>
                  <ol className="space-y-2">
                    {documentation.encryptionSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 flex items-center justify-center bg-muted text-xs font-mono shrink-0">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Decryption Overview
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {documentation.decryptionOverview}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-0 text-white">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {documentation.strengths.map((strength, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-primary">+</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {documentation.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-muted-foreground">−</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
