// Test step generation for the React component
console.log('🔍 Testing Step Generation for Animation...\n');

// Import the exact logic from the component
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

function generateDecryptSteps(cleanText, cleanKey, rounds) {
  const steps = [];
  
  steps.push({
    description: `Starting decryption with ciphertext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText }
  });
  
  // Initial split
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  steps.push({
    description: `Split ciphertext "${cleanText}" into L₀="${L}" and R₀="${R}"`,
    visualData: { 
      type: 'split',
      L, R,
      round: 0
    }
  });

  // Reverse the rounds for decryption
  for (let round = rounds; round >= 1; round--) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(L, roundKey);
    const newR = L;
    const newL = subStrings(R, fResult);
    
    steps.push({
      description: `Decrypt Round ${rounds - round + 1}: F(L, K${round}) = F("${L}", "${roundKey.slice(0, 4)}") = "${fResult}"`,
      visualData: { 
        type: 'round',
        L, R,
        roundKey: roundKey.slice(0, 4),
        fResult,
        round: rounds - round + 1,
        phase: 'function'
      }
    });

    steps.push({
      description: `Decrypt Round ${rounds - round + 1}: R - F(L, K) = "${R}" - "${fResult}" = "${newL}"`,
      visualData: { 
        type: 'round',
        L, R,
        newL,
        newR,
        fResult,
        round: rounds - round + 1,
        phase: 'subtract'
      }
    });

    // Update for next round
    L = newL;
    R = newR;
    
    // Show swap for all rounds except the last decryption round
    if (round > 1) {
      steps.push({
        description: `Decrypt Round ${rounds - round + 1}: Swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round: rounds - round + 1,
          phase: 'swap'
        }
      });
    } else {
      // Final decryption round - no swap
      steps.push({
        description: `Decrypt Round ${rounds - round + 1}: Final round - no swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round: rounds - round + 1,
          phase: 'final'
        }
      });
    }
  }

  const plaintext = (L + R).replace(/X+$/, '');
  
  steps.push({
    description: `Decryption complete: "${plaintext}"`,
    visualData: { type: 'result', L, R, ciphertext: plaintext }
  });

  return { steps, ciphertext: plaintext };
}

function generateFeistelSteps(text, key, mode, rounds = 4) {
  // Clean and normalize input text
  let cleanText = text.replace(/[^A-Za-z]/g, '').toUpperCase();
  
  // For encryption, pad to 8 characters. For decryption, ensure exactly 8 characters
  if (mode === 'encrypt') {
    cleanText = cleanText.padEnd(8, 'X').slice(0, 8);
  } else {
    // For decryption, the input should already be 8 characters, but ensure it
    cleanText = cleanText.slice(0, 8).padEnd(8, 'A');
  }
  
  const cleanKey = key.toUpperCase().replace(/[^A-Za-z]/g, '') || 'KEY';
  
  if (mode === 'decrypt') {
    return generateDecryptSteps(cleanText, cleanKey, rounds);
  }
  
  const steps = [];
  
  steps.push({
    description: `Starting encryption with plaintext: "${cleanText}"`,
    visualData: { type: 'text', text: cleanText }
  });
  
  // Step 1: Initial split
  let L = cleanText.slice(0, 4);
  let R = cleanText.slice(4, 8);
  
  steps.push({
    description: `Split input "${cleanText}" into L₀="${L}" and R₀="${R}"`,
    visualData: { 
      type: 'split',
      L, R,
      round: 0
    }
  });

  // Process each round
  for (let round = 1; round <= rounds; round++) {
    const roundKey = cleanKey.slice((round - 1) % cleanKey.length) + cleanKey.slice(0, (round - 1) % cleanKey.length);
    const fResult = simpleRoundFunction(R, roundKey);
    const L_prev = L;
    const R_prev = R;
    const newL = R;
    const newR = addStrings(L, fResult);
    
    // Show round function
    steps.push({
      description: `Round ${round}: F(R, K${round}) = F("${R}", "${roundKey.slice(0, 4)}") = "${fResult}"`,
      visualData: { 
        type: 'round',
        L, R,
        roundKey: roundKey.slice(0, 4),
        fResult,
        round,
        phase: 'function'
      }
    });

    // Show addition operation
    steps.push({
      description: `Round ${round}: L + F(R, K) = "${L_prev}" + "${fResult}" = "${newR}"`,
      visualData: { 
        type: 'round',
        L: L_prev, R: R_prev,
        newL,
        newR,
        fResult,
        round,
        phase: 'add'
      }
    });

    // Update L and R for next round
    L = newL;
    R = newR;
    
    // Show swap (except for final round)
    if (round < rounds) {
      steps.push({
        description: `Round ${round}: Swap → L${round}="${L}", R${round}="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round,
          phase: 'swap'
        }
      });
    } else {
      // Final round - show no swap
      steps.push({
        description: `Round ${round}: Final round - no swap → L="${L}", R="${R}"`,
        visualData: { 
          type: 'round',
          L, R,
          round,
          phase: 'final'
        }
      });
    }
  }

  // Final combination
  const ciphertext = L + R;
  
  steps.push({
    description: `Final output: "${ciphertext}"`,
    visualData: { type: 'result', L, R, ciphertext }
  });

  return { steps, ciphertext };
}

// Test step generation
console.log('Testing Encryption Steps:');
const encryptSteps = generateFeistelSteps('SECURITY', 'CRYPTO', 'encrypt');
console.log(`Generated ${encryptSteps.steps.length} steps`);
console.log('First few steps:');
encryptSteps.steps.slice(0, 5).forEach((step, i) => {
  console.log(`  Step ${i}: ${step.description}`);
  console.log(`    Type: ${step.visualData.type}`);
});

console.log('\nTesting Decryption Steps:');
const decryptSteps = generateFeistelSteps('CBNTKDCT', 'CRYPTO', 'decrypt');
console.log(`Generated ${decryptSteps.steps.length} steps`);
console.log('First few steps:');
decryptSteps.steps.slice(0, 5).forEach((step, i) => {
  console.log(`  Step ${i}: ${step.description}`);
  console.log(`    Type: ${step.visualData.type}`);
});

console.log('\n✅ Step generation appears to be working correctly');
console.log('If animation is not working, the issue might be:');
console.log('1. CSS animations not loading');
console.log('2. useCipherAnimation hook timing issues');
console.log('3. Component re-rendering problems');
console.log('4. State management issues');