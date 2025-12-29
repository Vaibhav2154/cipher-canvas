// Direct test of the React component logic
console.log('Testing React Component Logic Directly...\n');

// Copy exact functions from the React component
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

// Copy the exact encryption logic from React component
function testEncryption(text, key, rounds = 4) {
  console.log('=== TESTING ENCRYPTION ===');
  
  // Clean and normalize input text (exact same as component)
  let cleanText = text.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.padEnd(8, 'X').slice(0, 8);
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  console.log(`Input: "${text}" -> Cleaned: "${cleanText}"`);
  console.log(`Key: "${key}" -> Cleaned: "${cleanKey}"`);
  
  // Step 1: Initial split
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  console.log(`Initial: L="${L}", R="${R}"`);
  
  // Process each round (exact same as component)
  for (let round = 1; round <= rounds; round++) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(R, roundKey);
    const L_prev = L;
    const R_prev = R;
    const newL = R;
    const newR = addStrings(L, fResult);
    
    console.log(`Round ${round}:`);
    console.log(`  RoundKey: "${roundKey.slice(0, 4)}"`);
    console.log(`  F(${R}, ${roundKey.slice(0, 4)}) = ${fResult}`);
    console.log(`  ${L_prev} + ${fResult} = ${newR}`);
    
    // Update L and R for next round
    L = newL;
    R = newR;
    
    console.log(`  After round ${round}: L="${L}", R="${R}"`);
  }
  
  // Final combination
  const ciphertext = L + R;
  console.log(`\nFinal Result: "${ciphertext}"`);
  return ciphertext;
}

// Copy the exact decryption logic from React component
function testDecryption(ciphertext, key, rounds = 4) {
  console.log('\n=== TESTING DECRYPTION ===');
  
  // Clean input (exact same as component)
  let cleanText = ciphertext.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.slice(0, 8).padEnd(8, 'A');
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  console.log(`Input: "${ciphertext}" -> Cleaned: "${cleanText}"`);
  console.log(`Key: "${key}" -> Cleaned: "${cleanKey}"`);
  
  // Initial split
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  console.log(`Initial: L="${L}", R="${R}"`);
  
  // Reverse the rounds for decryption (exact same as component)
  for (let round = rounds; round >= 1; round--) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(L, roundKey);
    const newR = L;
    const newL = subStrings(R, fResult);
    
    console.log(`Decrypt Round ${rounds - round + 1}:`);
    console.log(`  RoundKey: "${roundKey.slice(0, 4)}"`);
    console.log(`  F(${L}, ${roundKey.slice(0, 4)}) = ${fResult}`);
    console.log(`  ${R} - ${fResult} = ${newL}`);
    
    // Update for next round
    L = newL;
    R = newR;
    
    console.log(`  After decrypt round ${rounds - round + 1}: L="${L}", R="${R}"`);
  }
  
  const plaintext = (L + R).replace(/X+$/, '');
  console.log(`\nDecryption Result: "${plaintext}"`);
  return plaintext;
}

// Run the tests with the exact same logic as React component
console.log('🧪 Testing with SECURITY and CRYPTO (same as React component):\n');

const encrypted = testEncryption('SECURITY', 'CRYPTO');
const decrypted = testDecryption(encrypted, 'CRYPTO');

console.log('\n' + '='.repeat(60));
console.log('FINAL RESULTS:');
console.log(`Original:   SECURITY`);
console.log(`Encrypted:  ${encrypted}`);
console.log(`Decrypted:  ${decrypted}`);
console.log(`Match:      ${decrypted === 'SECURITY' ? 'YES ✅' : 'NO ❌'}`);

// Test user's values
console.log('\n' + '='.repeat(60));
console.log('🔍 Testing user mentioned values:');
console.log('Expected: SECURITY -> ABHBMDUJ (from user)');
console.log(`Actual:   SECURITY -> ${encrypted} (from our component)`);

if (encrypted !== 'ABHBMDUJ') {
  console.log('\n❗ The component is giving different results than user expected!');
  console.log('This could be because:');
  console.log('1. User was using old/broken implementation');
  console.log('2. Different algorithm parameters');
  console.log('3. Different key or input processing');
} else {
  console.log('\n✅ Component matches user expectations!');
}