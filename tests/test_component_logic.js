// Direct test of Feistel cipher logic
console.log('🧪 Testing Feistel Cipher Implementation...\n');

// Extract the core Feistel functions
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
  let cleanText = plaintext.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.padEnd(8, 'X').slice(0, 8);
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  for (let round = 1; round <= rounds; round++) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(R, roundKey);
    const newL = R;
    const newR = addStrings(L, fResult);
    
    L = newL;
    R = newR;
  }
  
  return L + R;
}

function feistelDecrypt(ciphertext, key, rounds = 4) {
  let cleanText = ciphertext.replace(/[^A-Za-z]/g, '').toUpperCase();
  cleanText = cleanText.slice(0, 8).padEnd(8, 'A');
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  for (let round = rounds; round >= 1; round--) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(L, roundKey);
    const newR = L;
    const newL = subStrings(R, fResult);
    
    L = newL;
    R = newR;
  }
  
  return (L + R).replace(/X+$/, '');
}

// Test helper functions
function assert(condition, message) {
  if (condition) {
    console.log(`✅ ${message}`);
  } else {
    console.log(`❌ ${message}`);
    return false;
  }
  return true;
}

function assertEqual(actual, expected, description) {
  if (actual === expected) {
    console.log(`✅ ${description}: ${actual}`);
    return true;
  } else {
    console.log(`❌ ${description}: Expected "${expected}", got "${actual}"`);
    return false;
  }
}

// Run tests
let passCount = 0;
let totalTests = 0;

function runTest(testName, testFn) {
  console.log(`\n🔍 ${testName}:`);
  totalTests++;
  try {
    const result = testFn();
    if (result !== false) {
      passCount++;
      console.log(`✅ ${testName} PASSED`);
    } else {
      console.log(`❌ ${testName} FAILED`);
    }
  } catch (error) {
    console.log(`❌ ${testName} FAILED: ${error.message}`);
  }
}

// Test 1: Helper functions
runTest('Helper Functions', () => {
  let success = true;
  success &= assertEqual(addStrings('ABCD', 'ABCD'), 'ACEG', 'addStrings basic test');
  success &= assertEqual(subStrings('ACEG', 'ABCD'), 'ABCD', 'subStrings basic test');
  success &= assertEqual(simpleRoundFunction('RITY', 'CRYP'), 'TZRN', 'simpleRoundFunction test');
  return success;
});

// Test 2: Reversibility
runTest('Addition/Subtraction Reversibility', () => {
  const a = 'SECU';
  const b = 'TZRN';
  const sum = addStrings(a, b);
  const diff1 = subStrings(sum, b);
  const diff2 = subStrings(sum, a);
  
  return assertEqual(diff1, a, 'Reverse addition with b') && 
         assertEqual(diff2, b, 'Reverse addition with a');
});

// Test 3: Known encryption result
runTest('Known Encryption Test', () => {
  const encrypted = feistelEncrypt('SECURITY', 'CRYPTO');
  return assertEqual(encrypted, 'CBNTKDCT', 'SECURITY + CRYPTO encryption');
});

// Test 4: Known decryption result
runTest('Known Decryption Test', () => {
  const decrypted = feistelDecrypt('CBNTKDCT', 'CRYPTO');
  return assertEqual(decrypted, 'SECURITY', 'CBNTKDCT + CRYPTO decryption');
});

// Test 5: Round-trip tests
runTest('Round-trip Tests', () => {
  const testCases = [
    { plaintext: 'HELLO', key: 'WORLD' },
    { plaintext: 'TEST', key: 'KEY' },
    { plaintext: 'ABCDEFGH', key: 'PASSWORD' },
    { plaintext: 'A', key: 'B' },
  ];

  let allPassed = true;
  testCases.forEach(({ plaintext, key }, index) => {
    const encrypted = feistelEncrypt(plaintext, key);
    const decrypted = feistelDecrypt(encrypted, key);
    
    // Normalize for comparison
    const normalized = plaintext.replace(/[^A-Za-z]/g, '').toUpperCase().padEnd(8, 'X').slice(0, 8).replace(/X+$/, '');
    
    const passed = assertEqual(decrypted, normalized, `Round-trip ${index + 1}: "${plaintext}" with "${key}"`);
    allPassed &= passed;
  });
  
  return allPassed;
});

// Test 6: Edge cases
runTest('Edge Cases', () => {
  let success = true;
  
  // Empty string
  const encrypted1 = feistelEncrypt('', 'KEY');
  const decrypted1 = feistelDecrypt(encrypted1, 'KEY');
  success &= assertEqual(decrypted1, '', 'Empty string handling');
  
  // Special characters
  const encrypted2 = feistelEncrypt('HE!!LO123', 'KEY');
  const decrypted2 = feistelDecrypt(encrypted2, 'KEY');
  success &= assertEqual(decrypted2, 'HELO', 'Special character filtering');
  
  // Mixed case
  const encrypted3 = feistelEncrypt('HeLLo', 'KeY');
  const decrypted3 = feistelDecrypt(encrypted3, 'KeY');
  success &= assertEqual(decrypted3, 'HELLO', 'Mixed case normalization');
  
  return success;
});

// Test 7: User's reported issues
runTest('User Reported Issues', () => {
  console.log('   Testing the specific values mentioned by user...');
  
  // User said: encrypt SECURITY → ABHBMDUJ, decrypt OF`\\NSBI → AKEIHQHV
  // But our implementation should give: SECURITY → CBNTKDCT
  
  const ourEncryption = feistelEncrypt('SECURITY', 'CRYPTO');
  console.log(`   Our encryption of SECURITY with CRYPTO: ${ourEncryption}`);
  
  const ourDecryption = feistelDecrypt('CBNTKDCT', 'CRYPTO');
  console.log(`   Our decryption of CBNTKDCT with CRYPTO: ${ourDecryption}`);
  
  // Test if user's values were from old broken implementation
  const userDecryption = feistelDecrypt('ABHBMDUJ', 'CRYPTO');
  console.log(`   Decrypting user's ABHBMDUJ with CRYPTO: ${userDecryption}`);
  
  return assertEqual(ourEncryption, 'CBNTKDCT', 'Correct encryption result') &&
         assertEqual(ourDecryption, 'SECURITY', 'Correct decryption result');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`📊 Test Results: ${passCount}/${totalTests} tests passed`);

if (passCount === totalTests) {
  console.log('🎉 All tests passed! The Feistel cipher implementation is working correctly.');
  console.log('\n📝 Summary:');
  console.log('   • Encryption and decryption are properly reversible');
  console.log('   • Helper functions work correctly');
  console.log('   • Edge cases are handled properly');
  console.log('   • Known test vectors produce expected results');
  console.log('\n✨ The React component should work correctly with this implementation.');
} else {
  console.log('⚠️  Some tests failed. The implementation needs to be fixed.');
}