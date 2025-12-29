import { CipherDocumentation } from '@/types/cipher';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
        <p className="text-xs text-foreground/80 mt-1 font-medium">Comprehensive Documentation & Reference</p>
      </div>

      <Tabs defaultValue="concept" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 pt-3 bg-card border-b-2 border-primary/30 rounded-none gap-0 flex-wrap">
          <TabsTrigger value="concept" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            Overview
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            History
          </TabsTrigger>
          <TabsTrigger value="steps" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            How-to
          </TabsTrigger>
          <TabsTrigger value="example" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            Example
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            Security
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-none border-b-3 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card data-[state=active]:text-primary font-semibold text-xs text-foreground/70">
            Advanced
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 bg-card">
          <div className="p-5">
            <TabsContent value="concept" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Core Concept
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.coreConcept}
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Mathematical Foundation
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.mathematicalFoundation}
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {documentation.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-primary font-bold mt-1">→</span>
                        <span className="text-foreground font-medium leading-relaxed">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Modern Relevance
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.modernRelevance}
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Historical Background
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.historicalBackground}
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Real-World Applications
                  </h3>
                  <div className="space-y-2">
                    {documentation.realWorldApplications.map((application, index) => (
                      <div key={index} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-xs font-bold rounded-full shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground font-medium leading-relaxed">{application}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Encryption Steps
                  </h3>
                  <ol className="space-y-3">
                    {documentation.encryptionSteps.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-primary to-accent text-white text-xs font-bold rounded-lg shrink-0">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-foreground font-medium pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Decryption Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {documentation.decryptionOverview}
                  </p>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {documentation.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-accent font-bold mt-1">⚠</span>
                        <span className="text-foreground font-medium leading-relaxed">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="example" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Practical Example
                  </h3>
                  
                  <div className="bg-muted/50 border-2 border-primary/20 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-1">Plaintext</h4>
                        <code className="bg-primary/10 px-2 py-1 rounded text-sm font-mono">{documentation.practicalExample.plaintext}</code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-1">Key</h4>
                        <code className="bg-primary/10 px-2 py-1 rounded text-sm font-mono">{documentation.practicalExample.key}</code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-1">Ciphertext</h4>
                        <code className="bg-accent/10 px-2 py-1 rounded text-sm font-mono">{documentation.practicalExample.ciphertext}</code>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Step-by-Step Breakdown
                  </h3>
                  <ol className="space-y-2">
                    {documentation.practicalExample.stepByStep.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <Badge variant="outline" className="w-6 h-6 flex items-center justify-center text-xs p-0 shrink-0">
                          {index + 1}
                        </Badge>
                        <span className="leading-relaxed text-foreground font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Security Analysis
                  </h3>
                  
                  <div className="grid gap-4">
                    <div className="bg-muted/30 border border-primary/20 rounded-lg p-3">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Key Space</h4>
                      <p className="text-sm text-foreground font-medium">{documentation.securityAnalysis.keySpace}</p>
                    </div>
                    
                    <div className="bg-muted/30 border border-primary/20 rounded-lg p-3">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Cryptanalysis Resistance</h4>
                      <p className="text-sm text-foreground font-medium">{documentation.securityAnalysis.cryptanalysisResistance}</p>
                    </div>
                    
                    <div className="bg-muted/30 border border-primary/20 rounded-lg p-3">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-primary mb-2">Recommended Key Size</h4>
                      <p className="text-sm text-foreground font-medium">{documentation.securityAnalysis.recommendedKeySize}</p>
                    </div>
                  </div>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {documentation.strengths.map((strength, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-green-500 font-bold mt-1">✓</span>
                        <span className="text-foreground font-medium leading-relaxed">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Separator />

                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {documentation.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="text-red-500 font-bold mt-1">✗</span>
                        <span className="text-foreground font-medium leading-relaxed">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0 text-foreground">
              <div className="space-y-6 fade-in">
                <section>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Cipher Variations
                  </h3>
                  <div className="space-y-2">
                    {documentation.variations.map((variation, index) => (
                      <div key={index} className="flex gap-3 text-sm p-3 bg-muted/20 border border-primary/10 rounded-lg">
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          V{index + 1}
                        </Badge>
                        <span className="text-foreground font-medium leading-relaxed">{variation}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
