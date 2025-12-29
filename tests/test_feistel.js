// Quick test for Feistel cipher logic
function simpleRoundFunction(data, key) {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    const d = data.charCodeAt(i) - 65;
    const k = key.charCodeAt(i % key.length) - 65;
    result += String.fromCharCode(((d + k) % 26) + 65);
  }
  return result;
}

function addStrings(a, b) {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    const aVal = a.charCodeAt(i) - 65;
    const bVal = b.charCodeAt(i) - 65;
    result += String.fromCharCode(((aVal + bVal) % 26) + 65);
  }
  return result;
}

function subStrings(a, b) {
  let result = '';
  for (let i = 0; i < a.length; i++) {
    const aVal = a.charCodeAt(i) - 65;
    const bVal = b.charCodeAt(i) - 65;
    result += String.fromCharCode(((aVal - bVal + 26) % 26) + 65);
  }
  return result;
}

function feistelEncrypt(plaintext, key, rounds = 4) {
  // Clean and pad input
  let cleanText = plaintext.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.padEnd(8, 'X').slice(0, 8);
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  console.log(`Starting encryption: "${cleanText}" -> L="${L}", R="${R}"`);
  
  for (let round = 1; round <= rounds; round++) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(R, roundKey);
    const newL = R;
    const newR = addStrings(L, fResult);
    
    console.log(`Round ${round}: F(${R}, ${roundKey.slice(0, 4)}) = ${fResult}, ADD(${L}, ${fResult}) = ${newR}`);
    
    L = newL;
    R = newR;
    
    console.log(`After round ${round}: L="${L}", R="${R}"`);
  }
  
  const ciphertext = L + R;
  console.log(`Encryption result: "${ciphertext}"`);
  return ciphertext;
}

function feistelDecrypt(ciphertext, key, rounds = 4) {
  // Clean input
  let cleanText = ciphertext.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.slice(0, 8).padEnd(8, 'A');
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  console.log(`Starting decryption: "${cleanText}" -> L="${L}", R="${R}"`);
  
  // In decryption, we reverse the process step by step
  // From encryption: L_{i+1} = R_i, R_{i+1} = L_i ⊕ F(R_i, K_i)
  // To decrypt: R_i = L_{i+1}, L_i = R_{i+1} ⊕ F(R_i, K_i) = R_{i+1} ⊕ F(L_{i+1}, K_i)
  
  for (let round = rounds; round >= 1; round--) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(L, roundKey);
    const newR = L;  // R_{i-1} = L_i
    const newL = subStrings(R, fResult);  // L_{i-1} = R_i - F(L_i, K_i)
    
    console.log(`Decrypt Round ${rounds - round + 1}: F(${L}, ${roundKey.slice(0, 4)}) = ${fResult}, SUB(${R}, ${fResult}) = ${newL}`);
    
    L = newL;
    R = newR;
    
    console.log(`After decrypt round ${rounds - round + 1}: L="${L}", R="${R}"`);
  }
  
  const plaintext = (L + R).replace(/X+$/, '');
  console.log(`Decryption result: "${plaintext}"`);
  return plaintext;
}

// Test the implementation
console.log('=== Testing Feistel Cipher ===');
const plaintext = 'SECURITY';
const key = 'CRYPTO';

console.log('\n--- ENCRYPTION ---');
const encrypted = feistelEncrypt(plaintext, key);

console.log('\n--- DECRYPTION ---');
const decrypted = feistelDecrypt(encrypted, key);

console.log('\n=== RESULTS ===');
console.log(`Original:  "${plaintext}"`);
console.log(`Encrypted: "${encrypted}"`);
console.log(`Decrypted: "${decrypted}"`);
console.log(`Match: ${plaintext === decrypted ? 'YES' : 'NO'}`);

// Test with the values you provided
console.log('\n=== Testing provided values ===');
console.log('\n--- Decrypt OF`\\NSBI ---');
const test1 = feistelDecrypt('OFNSBI', key);