import { CipherDocumentation } from '@/types/cipher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentationPanelProps {
  documentation: CipherDocumentation;
}

export function DocumentationPanel({ documentation }: DocumentationPanelProps) {
  return (
    <div className="border-2 border-primary bg-card h-full flex flex-col rounded-lg shadow-sm">
      <div className="p-5 border-b-2 border-primary bg-gradient-to-r from-primary/20 to-accent/20">
        <h2 className="text-lg font-bold text-primary">
          {documentation.name}
        </h2>
        <p className="text-xs text-foreground/80 mt-1 font-medium">Documentation & Reference</p>
      </div>

      <Tabs defaultValue="concept" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-3 bg-card border-b-2 border-primary/30 rounded-none gap-0">
          <TabsTrigger value="concept" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-sm text-foreground/70">
            Concept
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-sm text-foreground/70">
            History
          </TabsTrigger>
          <TabsTrigger value="steps" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-sm text-foreground/70">
            Steps
          </TabsTrigger>
          <TabsTrigger value="analysis" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-sm text-foreground/70">
            Analysis
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 bg-card">
          <div className="p-5">
            <TabsContent value="concept" className="mt-0 text-foreground">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-2">
                    Core Concept
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.coreConcept}
                  </p>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-2">
                    Modern Relevance
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.modernRelevance}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 text-foreground">
              <div className="fade-in">
                <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-2">
                  Historical Background
                </h3>
                <p className="text-sm leading-relaxed text-foreground font-medium">
                  {documentation.historicalBackground}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="mt-0 text-foreground">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3">
                    Encryption Steps
                  </h3>
                  <ol className="space-y-2">
                    {documentation.encryptionSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-primary to-accent text-white text-xs font-bold rounded-full shrink-0">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-foreground font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-2">
                    Decryption Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.decryptionOverview}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-0 text-foreground">
              <div className="space-y-4 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {documentation.strengths.map((strength, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-foreground font-medium">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3">
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {documentation.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-accent font-bold">✗</span>
                        <span className="text-foreground font-medium">{weakness}</span>
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
