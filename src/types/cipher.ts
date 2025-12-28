export interface CipherStep {
  description: string;
  visualData: unknown;
  highlight?: number[];
}

export interface CipherState {
  plaintext: string;
  ciphertext: string;
  key?: string;
  steps: CipherStep[];
  currentStep: number;
  isPlaying: boolean;
  mode: 'encrypt' | 'decrypt';
}

export interface CipherDocumentation {
  id: string;
  name: string;
  historicalBackground: string;
  coreConcept: string;
  encryptionSteps: string[];
  decryptionOverview: string;
  strengths: string[];
  weaknesses: string[];
  modernRelevance: string;
}

export type CipherType = 
  | 'scytale'
  | 'route'
  | 'columnar'
  | 'bacon'
  | 'feistel';
