import { CipherDocumentation } from '@/types/cipher';

export const cipherDocumentation: Record<string, CipherDocumentation> = {
  scytale: {
    id: 'scytale',
    name: 'Scytale Cipher',
    historicalBackground: 'The Scytale cipher dates back to ancient Greece, around 7th century BCE. It was used by the Spartans for military communication. A leather strip was wrapped around a wooden rod (the scytale), and the message was written across the wraps. Only someone with a rod of the same diameter could read the message.',
    coreConcept: 'The Scytale is a transposition cipher that rearranges the plaintext characters by writing them in rows across a cylinder and reading them in columns. The key is the diameter of the cylinder, which determines how many characters fit in each row.',
    encryptionSteps: [
      'Wrap a strip of parchment around the scytale (cylinder)',
      'Write the plaintext horizontally across the wrapped parchment',
      'Unwrap the parchment to reveal the scrambled message',
      'The ciphertext is read as the reordered characters'
    ],
    decryptionOverview: 'To decrypt, wrap the ciphertext strip around a cylinder of the same diameter. The original message becomes readable horizontally across the wraps.',
    strengths: [
      'Simple to implement with basic materials',
      'Physical key (cylinder diameter) adds security layer',
      'Fast encryption and decryption process'
    ],
    weaknesses: [
      'Limited key space (cylinder diameter)',
      'Vulnerable to frequency analysis',
      'Pattern recognition can break the cipher',
      'Physical key can be replicated by trial and error'
    ],
    modernRelevance: 'While not used for serious encryption today, the Scytale demonstrates fundamental transposition concepts. Its principles appear in modern block cipher modes and columnar transposition variations.'
  },
  route: {
    id: 'route',
    name: 'Route Cipher',
    historicalBackground: 'Route ciphers were extensively used during the American Civil War by Union forces. The cipher was favored because it could be quickly encoded and decoded in the field while providing reasonable security against Confederate interception.',
    coreConcept: 'A Route cipher writes plaintext into a grid and then reads it out following a specific path or route (spiral, zigzag, diagonal, etc.). The route pattern serves as the key, and different routes produce different ciphertexts from the same plaintext.',
    encryptionSteps: [
      'Write the plaintext into a rectangular grid row by row',
      'Choose a starting point and route pattern (spiral, zigzag, etc.)',
      'Read the characters following the chosen route',
      'The resulting sequence is the ciphertext'
    ],
    decryptionOverview: 'To decrypt, write the ciphertext into a grid following the same route pattern in reverse, then read the grid row by row to recover the plaintext.',
    strengths: [
      'Multiple route patterns increase key space',
      'Grid dimensions add another layer of variability',
      'Relatively easy to implement manually'
    ],
    weaknesses: [
      'Vulnerable to pattern analysis',
      'Limited number of practical routes',
      'Message length can reveal grid dimensions',
      'No character substitution - same letters in plaintext and ciphertext'
    ],
    modernRelevance: 'Route cipher concepts influence modern permutation-based cryptographic techniques. The idea of reading data in non-linear patterns appears in various block cipher designs and data shuffling algorithms.'
  },
  columnar: {
    id: 'columnar',
    name: 'Columnar Transposition Cipher',
    historicalBackground: 'Columnar transposition was used extensively during World War I and II. The German ADFGVX cipher combined it with substitution for added security. It remained in military and diplomatic use well into the 20th century.',
    coreConcept: 'Text is written into a grid row by row, then columns are rearranged according to a keyword. The ciphertext is read column by column in the new order. The keyword determines the column permutation, making it the key.',
    encryptionSteps: [
      'Write a keyword and number columns by alphabetical order',
      'Write plaintext into rows under the keyword',
      'Pad the last row if necessary',
      'Read columns in numerical order to form ciphertext'
    ],
    decryptionOverview: 'Determine column lengths from ciphertext and keyword, fill columns in keyword order, then read rows to recover plaintext.',
    strengths: [
      'Keyword provides flexible key space',
      'Can be applied multiple times (double transposition)',
      'Simple to perform manually with paper and pencil'
    ],
    weaknesses: [
      'Vulnerable to anagramming attacks',
      'Short messages may leak keyword length',
      'Frequency distribution unchanged from plaintext'
    ],
    modernRelevance: 'Columnar transposition principles appear in modern block cipher modes. The P-box (permutation box) in DES and AES uses similar column reordering concepts.'
  },
  bacon: {
    id: 'bacon',
    name: "Bacon's Cipher",
    historicalBackground: "Sir Francis Bacon invented this cipher around 1605. It was designed for steganography - hiding the existence of a message. Bacon was interested in encoding messages within seemingly innocent text using typeface variations.",
    coreConcept: "Each letter is encoded as a 5-bit binary pattern using 'A' and 'B' (or two distinct visual elements). The pattern is then hidden within carrier text using subtle variations like font style, capitalization, or spacing.",
    encryptionSteps: [
      'Convert each plaintext letter to its 5-bit Bacon code (AAAAA to BBBBB)',
      'Choose a carrier text at least 5× the plaintext length',
      'Apply the A/B pattern to the carrier using visual variations',
      'The modified carrier text conceals the secret message'
    ],
    decryptionOverview: "Identify the two distinct elements in the carrier text, extract the A/B sequence, group into 5-bit codes, and decode each group back to a letter.",
    strengths: [
      'Steganographic - hides message existence',
      'Flexible encoding method (fonts, spacing, etc.)',
      'Difficult to detect without knowing the encoding scheme'
    ],
    weaknesses: [
      'Requires 5× carrier text length',
      'Limited to 24-letter alphabet in original form',
      'Carrier text must appear natural',
      'Visual variations may be detectable'
    ],
    modernRelevance: "Bacon's cipher pioneered binary encoding of text, predating ASCII by centuries. Its steganographic principles are used in digital watermarking, hidden data in images, and covert communication channels."
  },
  feistel: {
    id: 'feistel',
    name: 'Feistel Network',
    historicalBackground: 'Horst Feistel developed this structure at IBM in the early 1970s while working on the Lucifer cipher. It became the foundation of DES (Data Encryption Standard) in 1977 and influenced countless subsequent block ciphers.',
    coreConcept: 'A Feistel network splits data into two halves. Each round applies a function to one half, XORs the result with the other half, then swaps the halves. This structure enables encryption and decryption using the same process with reversed key schedule.',
    encryptionSteps: [
      'Split the plaintext block into left (L) and right (R) halves',
      'For each round: compute F(R, key) and XOR with L',
      'Swap L and R for the next round',
      'After final round, combine halves for ciphertext'
    ],
    decryptionOverview: 'Apply the same process using round keys in reverse order. The Feistel structure guarantees that decryption works regardless of the round function F.',
    strengths: [
      'Encryption and decryption share the same structure',
      'Round function F need not be reversible',
      'Proven security with sufficient rounds',
      'Flexible design - can use various F functions'
    ],
    weaknesses: [
      'Requires multiple rounds for security',
      'Only half the data is transformed per round',
      'Key schedule design is critical',
      'Specific implementations may have weaknesses'
    ],
    modernRelevance: 'Feistel networks remain fundamental in modern cryptography. DES, Blowfish, and Camellia use Feistel structures. Even non-Feistel ciphers like AES borrow concepts from this elegant design.'
  }
};
