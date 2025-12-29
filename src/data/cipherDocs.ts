import { CipherDocumentation } from '@/types/cipher';

export const cipherDocumentation: Record<string, CipherDocumentation> = {
  scytale: {
    id: 'scytale',
    name: 'Scytale Cipher',
    historicalBackground: 'The Scytale cipher, dating back to ancient Greece around the 7th century BCE, represents one of humanity\'s earliest documented encryption methods. Used primarily by the Spartan military, this ingenious device consisted of a wooden rod around which a leather strip or parchment was wound. Messages were written horizontally across the wrapped material, and when unwrapped, the text appeared scrambled to unauthorized readers. Archaeological evidence suggests that Scytales were standardized within military units, with specific rod diameters serving as shared secrets. The Greek historian Plutarch documented its use in military communications, highlighting its role in securing sensitive battle plans and troop movements. This cipher was so effective that it remained in use for several centuries, with variations appearing in Roman military communications.',
    coreConcept: 'The Scytale operates as a transposition cipher, fundamentally rearranging plaintext characters without substitution. The encryption process involves writing plaintext horizontally across a cylindrical surface and reading it vertically when unwrapped. The key parameter is the circumference of the cylinder, which determines the number of characters per row. This creates a systematic permutation of the original message, where character positions are mathematically redistributed according to the cylinder\'s geometry. The cipher demonstrates early understanding of the distinction between the message content (which remains unchanged) and its presentation order (which becomes the security mechanism). Unlike substitution ciphers that replace characters, the Scytale preserves all original letters while rendering them unintelligible through spatial rearrangement.',
    encryptionSteps: [
      'Determine the cylinder diameter (key) - typically between 3-10 character widths for practical use',
      'Wrap the writing material (parchment or leather strip) snugly around the cylinder with no gaps',
      'Write the plaintext message horizontally across the wrapped surface, continuing to new wraps as needed',
      'If the message doesn\'t fill complete rows, pad with random letters or agreed-upon null characters',
      'Carefully unwrap the material, maintaining the character sequence',
      'The unwrapped text appears scrambled - this scrambled sequence is your ciphertext',
      'The recipient needs a cylinder of identical diameter to decrypt the message'
    ],
    decryptionOverview: 'Decryption reverses the encryption process by wrapping the ciphertext around a cylinder of the correct diameter. The recipient wraps the scrambled text around their Scytale and reads horizontally across the wraps. If the cylinder diameter matches the original, the plaintext emerges clearly. Incorrect diameters produce garbled text, making the proper diameter essential for successful decryption. This self-authenticating property helped ancient users verify they possessed the correct key.',
    strengths: [
      'Requires no mathematical knowledge - purely mechanical process accessible to ancient peoples',
      'Physical key (cylinder) provides tangible security that\'s difficult to steal unnoticed',
      'Fast encryption and decryption suitable for field conditions',
      'Self-authenticating: wrong key produces obvious gibberish',
      'No frequency analysis vulnerability since character frequencies remain unchanged',
      'Scalable to any message length with appropriate material',
      'Resistant to casual interception - appears as random letter sequences'
    ],
    weaknesses: [
      'Extremely limited key space - only as many keys as practical cylinder diameters (typically 5-20 options)',
      'Cylinder dimensions can be determined through trial and error with relatively few attempts',
      'Physical key can be measured and replicated if captured',
      'Vulnerable to brute force attacks due to small key space',
      'Message length may reveal information about the cylinder size',
      'Pattern recognition can identify repeating structures for longer messages',
      'No protection against frequency analysis if attacker knows the cipher type',
      'Requires specific materials and tools not always available'
    ],
    modernRelevance: 'The Scytale\'s core principle of transposition remains fundamental in modern cryptography. Block ciphers like AES use sophisticated transposition operations in their permutation layers. The concept of writing data in one format and reading it in another appears in matrix-based encryption algorithms. Modern applications include data shuffling in database security, packet reordering in network protocols, and permutation operations in contemporary cipher designs. The Scytale also demonstrates the enduring principle that encryption strength comes from the secrecy of the method (key), not the algorithm itself.',
    mathematicalFoundation: 'The Scytale implements a systematic permutation π where character at position i in plaintext moves to position π(i) in ciphertext. For cylinder width w, character at position i moves to position (i mod w) × ⌊n/w⌋ + ⌊i/w⌋, where n is message length. This creates a regular columnar transposition pattern. The key space is limited to divisors of common message lengths, typically yielding 10-50 possible keys for practical implementations. The mathematical security relies on the computational difficulty of determining w without trial and error, though modern computers make this trivial.',
    practicalExample: {
      plaintext: 'ATTACKATDAWN',
      key: '4 (cylinder width)',
      ciphertext: 'ACDTATKAWAN',
      stepByStep: [
        'Write plaintext in rows of 4: ATTA|CKAT|DAWN',
        'Read columns vertically: A-C-D (column 1), T-K-A (column 2), T-A-W (column 3), A-T-N (column 4)',
        'Concatenate column readings: ACDTKATAWATN → ACDTATKAWAN',
        'To decrypt: Arrange ciphertext in columns of length 3, read rows horizontally'
      ]
    },
    securityAnalysis: {
      keySpace: 'Extremely limited: typically 5-20 practical key values (cylinder diameters)',
      cryptanalysisResistance: 'Very low - vulnerable to brute force attack in minutes. Pattern analysis can reveal structure.',
      recommendedKeySize: 'Not recommended for serious security. Historically used diameter 6-8 characters for balance of security and usability.'
    },
    variations: [
      'Double Scytale: Apply the cipher twice with different cylinder sizes for increased security',
      'Irregular Scytale: Vary the cylinder diameter while writing to create non-uniform transposition',
      'Modern Columnar Transposition: Use keyword-based column ordering instead of fixed geometric patterns',
      'Block Scytale: Process message in fixed-size blocks with different cylinder sizes per block'
    ],
    realWorldApplications: [
      'Historical military communications in Greek and Roman armies',
      'Medieval diplomatic correspondence with agreed-upon rod sizes',
      'Educational tool for teaching basic cryptography concepts',
      'Inspiration for modern permutation algorithms in block ciphers',
      'Steganographic applications hiding messages in formatted text layouts',
      'Children\'s puzzle games and escape room challenges'
    ],
    learningObjectives: [
      'Understand the difference between transposition and substitution ciphers',
      'Learn how physical constraints can define cryptographic parameters',
      'Appreciate the historical development of encryption methods',
      'Recognize patterns in systematic character rearrangement',
      'Understand key space limitations and their security implications',
      'See the connection between ancient methods and modern permutation operations'
    ],
    commonMistakes: [
      'Using cylinder diameters that are too large, making the cipher ineffective',
      'Failing to pad incomplete rows, which can reveal message structure',
      'Not maintaining consistent wrapping tension, leading to misaligned characters',
      'Assuming the cipher is secure against modern computational attacks',
      'Overlooking the need for secure key (cylinder) distribution',
      'Using obvious padding patterns that leak information about message length'
    ]
  },
  route: {
    id: 'route',
    name: 'Route Cipher',
    historicalBackground: 'Route ciphers gained prominence during the American Civil War (1861-1865), where Union cryptographers employed them extensively for field communications. The cipher\'s popularity stemmed from its adaptability to battlefield conditions and relative resistance to Confederate cryptanalysis efforts. Notable applications included coordinating troop movements during the Battle of Gettysburg and securing supply line communications across hostile territory. European militaries adopted similar techniques during the Franco-Prussian War (1870-1871), where French forces used route ciphers to coordinate defensive strategies. The cipher\'s flexibility allowed for rapid adaptation of routes based on tactical situations, making it valuable for dynamic military operations. Telegraph operators particularly favored route ciphers because they could be implemented quickly without special equipment, crucial during the rapid expansion of electrical communications.',
    coreConcept: 'Route ciphers represent a sophisticated evolution of transposition cryptography, where plaintext is arranged in a geometric grid and read according to a predetermined path or "route." Unlike simple transposition, route ciphers offer exponentially more key variations through different reading patterns: spiral (clockwise/counterclockwise), zigzag (horizontal/vertical), diagonal (main/anti-diagonal), snake-like patterns, and custom geometric shapes. The security relies on both the grid dimensions and the specific route chosen. This dual-key system (dimensions + route) significantly expands the key space compared to basic transposition methods. The cipher maintains the fundamental property that plaintext character frequencies remain unchanged, but the spatial distribution creates effective obfuscation against pattern recognition.',
    encryptionSteps: [
      'Calculate optimal grid dimensions based on message length - choose factors that minimize padding',
      'Create a rectangular matrix with calculated dimensions (typically close to square for security)',
      'Fill the grid row-by-row with plaintext characters, left to right, top to bottom',
      'Pad incomplete cells with random letters, null characters, or agreed-upon filler text',
      'Select the predetermined route pattern (e.g., clockwise spiral starting from top-left corner)',
      'Traverse the grid following the chosen route, recording each character encountered',
      'Concatenate the characters in route order to form the final ciphertext',
      'Document grid dimensions and route for the recipient (sent separately via secure channel)'
    ],
    decryptionOverview: 'Decryption requires knowledge of both the grid dimensions and the specific route used. The recipient creates an empty grid of the correct size, then fills it by following the same route pattern while placing ciphertext characters sequentially. Once the grid is populated, reading row-by-row from left to right reveals the original plaintext. Critical steps include: verifying correct grid dimensions (incorrect size produces garbled output), applying the exact route pattern used during encryption, and removing any padding characters that were added during encryption.',
    strengths: [
      'Enormous key space due to multiple route patterns and flexible grid dimensions',
      'Highly adaptable - can accommodate any message length through dynamic grid sizing',
      'Route patterns can be customized for specific operational requirements',
      'Resistant to simple frequency analysis due to character redistribution',
      'Multiple layers of obfuscation: grid layout + route pattern + optional padding strategies',
      'Can be performed manually with basic materials (paper and pencil)',
      'Self-documenting: successful decryption confirms correct parameters were used',
      'Scalable complexity: simple routes for quick field use, complex patterns for high-security applications'
    ],
    weaknesses: [
      'Large key space becomes a liability if route description is complex or ambiguous',
      'Grid dimensions may be deducible from message length analysis',
      'Repeated route patterns can create cryptographic signatures detectable across multiple messages',
      'Vulnerable to known-plaintext attacks if grid structure is compromised',
      'Character frequency distribution remains identical to plaintext, enabling linguistic analysis',
      'Complex routes are error-prone during manual implementation',
      'Requires secure communication of grid parameters and route descriptions',
      'Padding strategies may leak information about original message length'
    ],
    modernRelevance: 'Route cipher principles profoundly influence contemporary cryptographic design. Modern applications include: data scrambling in RAID storage systems (distributing data across disks), permutation operations in AES and other block ciphers, matrix-based hash functions that rearrange input data, network packet routing algorithms that obscure traffic patterns, and digital image processing techniques for steganography. The concept of reading data in non-sequential patterns appears in modern stream ciphers and pseudo-random number generators. Advanced database security systems use route-like algorithms to distribute sensitive data across multiple storage locations.',
    mathematicalFoundation: 'Route ciphers implement a bijective function f: {1,2,...,n} → {1,2,...,n} where position i in the grid maps to position f(i) in the output sequence. For an m×n grid, the total number of possible routes approaches m!×n! for completely arbitrary paths, though practical routes are typically constrained to systematic patterns. Common mathematical patterns include: spiral routes following f(i,j) = (i+j×m) mod (m×n), diagonal routes using f(i,j) = ((i+j) mod m, (i-j) mod n), and zigzag patterns alternating direction based on row/column parity. Security analysis involves calculating the effective key space given route constraints and grid dimension limitations.',
    practicalExample: {
      plaintext: 'MEETMEATMIDNIGHT',
      key: '4×4 grid, clockwise spiral from top-left',
      ciphertext: 'METMTGHIMNEAITDM',
      stepByStep: [
        'Arrange in 4×4 grid: MEET|MEAT|MIDN|IGHT',
        'Apply clockwise spiral route: M→E→E→T→T→H→G→I→M→N→D→I→A→E→T→M',
        'Follow path: start top-left, go right along top row, down right column, left along bottom, up left column',
        'Result: MEETTHGIMNDIAEТM',
        'Decryption: Fill 4×4 grid following same spiral route with ciphertext, then read rows'
      ]
    },
    securityAnalysis: {
      keySpace: 'Large: approximately 2^10 to 2^20 depending on grid size and route complexity. Practical implementations typically use 50-500 distinct route patterns.',
      cryptanalysisResistance: 'Moderate resistance to casual analysis. Vulnerable to systematic cryptanalysis with sufficient ciphertext samples. Modern computers can brute-force common routes.',
      recommendedKeySize: 'Grid dimensions between 5×5 and 10×10 with complex but systematic routes. Avoid predictable patterns and prime-number dimensions when possible.'
    },
    variations: [
      'Multi-layer Routes: Apply different routes sequentially for increased security',
      'Dynamic Routes: Change route pattern based on message content or external factors',
      'Fractional Routes: Use partial route completion with specified stopping points',
      'Compound Routes: Combine multiple simple routes (e.g., diagonal then spiral)',
      'Masked Routes: Apply route pattern only to specific characters while leaving others unchanged',
      'Three-dimensional Routes: Extend concept to cube-shaped grids for maximum complexity'
    ],
    realWorldApplications: [
      'Military field communications during 19th and early 20th century conflicts',
      'Diplomatic cipher systems for embassy communications before modern encryption',
      'Commercial telegraph encryption for protecting business communications',
      'Resistance movements during WWII for coordinating underground activities',
      'Modern puzzle games and cryptographic competitions',
      'Educational demonstrations of transposition cipher principles',
      'Steganographic applications in digital image and video processing'
    ],
    learningObjectives: [
      'Master the relationship between geometric arrangement and cryptographic security',
      'Understand how key space expansion through multiple parameters enhances security',
      'Learn to analyze trade-offs between implementation complexity and security strength',
      'Develop spatial reasoning skills applicable to matrix-based cryptographic operations',
      'Appreciate the evolution from manual to computational cryptographic methods',
      'Recognize route patterns in modern permutation-based algorithms'
    ],
    commonMistakes: [
      'Choosing grid dimensions that reveal message length or create obvious patterns',
      'Using overly complex routes that are prone to implementation errors',
      'Failing to securely communicate route descriptions to intended recipients',
      'Reusing the same route pattern across multiple messages',
      'Neglecting to randomize padding characters, creating detectable signatures',
      'Not accounting for character frequency preservation when selecting routes'
    ]
  },
  columnar: {
    id: 'columnar',
    name: 'Columnar Transposition Cipher',
    historicalBackground: 'Columnar transposition emerged in the late 19th century as military communications became more sophisticated. During World War I, the German military developed the famous ADFGVX cipher, which combined columnar transposition with substitution to create one of the war\'s most secure field ciphers. French cryptanalyst Georges Painvin\'s eventual breaking of ADFGVX in 1918 marked a turning point in the war\'s cryptographic arms race. The cipher saw extensive use during World War II, where resistance movements across Europe employed it for coordinating sabotage operations. The SOE (Special Operations Executive) trained agents in columnar transposition variants for communicating with London headquarters. Diplomatic services continued using enhanced versions well into the 1950s, until machine-based encryption rendered manual ciphers obsolete for serious security applications.',
    coreConcept: 'Columnar transposition represents the mathematical formalization of basic transposition principles, using a keyword to define a precise permutation of plaintext columns. The algorithm arranges plaintext in a rectangular grid, then reorders columns according to the alphabetical sequence of keyword letters. This creates a systematic, reproducible permutation that significantly expands the key space beyond simple geometric transpositions. The keyword serves as both the encryption key and the instructions for column rearrangement, making it self-contained and suitable for field operations. Unlike route ciphers that depend on geometric patterns, columnar transposition relies on lexicographic ordering, which provides mathematical rigor and reduces implementation errors.',
    encryptionSteps: [
      'Select a keyword with no repeated letters (e.g., "CIPHER" - 6 unique letters)',
      'Write the keyword above columns and number them according to alphabetical order (C=1, E=2, H=3, I=4, P=5, R=6)',
      'Write plaintext into rows beneath the keyword, filling left to right across all columns',
      'If the final row is incomplete, pad with random letters, null characters, or agreed-upon filler',
      'Number each column according to the alphabetical position of its keyword letter',
      'Read each column vertically in numerical order (column 1 first, then column 2, etc.)',
      'Concatenate all column readings to form the final ciphertext',
      'Record keyword and any padding information for secure transmission to recipient'
    ],
    decryptionOverview: 'Decryption reverses the column-reading process using the same keyword. Calculate the number of complete rows by dividing ciphertext length by keyword length. Create the grid structure with the keyword header, then fill columns in alphabetical order with segments of the ciphertext. Once all columns are populated, read horizontally across rows to recover the original plaintext. Remove any padding characters that were added during encryption. The mathematical precision of the alphabetical ordering ensures consistent results.',
    strengths: [
      'Keyword-based key provides large, flexible key space suitable for diverse operational needs',
      'Mathematical foundation reduces implementation errors compared to geometric pattern methods',
      'Double transposition (applying the cipher twice) dramatically increases cryptographic strength',
      'Adaptable to any message length through dynamic grid sizing',
      'Compatible with manual implementation using basic materials available in field conditions',
      'Self-authenticating: incorrect keywords produce obviously garbled plaintext during decryption',
      'Keyword can incorporate meaningful phrases, making it memorable for operational personnel',
      'Resistant to casual interception and simple pattern recognition attacks'
    ],
    weaknesses: [
      'Vulnerable to anagramming attacks when sufficient ciphertext is available for analysis',
      'Character frequency distribution remains unchanged, enabling statistical cryptanalysis',
      'Short keywords create predictable patterns that can be exploited through frequency analysis',
      'Keyword length may be deducible from ciphertext length and structural analysis',
      'Repeated keywords across multiple messages create cryptographic signatures',
      'Known plaintext attacks can reveal keyword structure with minimal intercepted content',
      'Language patterns in plaintext may survive transposition and leak information',
      'Manual implementation prone to transcription errors that compromise entire message'
    ],
    modernRelevance: 'Columnar transposition principles form the theoretical foundation for numerous modern cryptographic techniques. Contemporary applications include: P-box (permutation box) operations in DES, AES, and other symmetric ciphers; matrix-based operations in hash functions like SHA-256; data distribution algorithms in distributed computing systems; error correction coding schemes that rearrange data for redundancy; network packet routing protocols that obscure traffic patterns; and database security systems that distribute sensitive records across multiple storage locations. The mathematical elegance of keyword-based permutations continues to influence algorithm design in both academic research and practical implementations.',
    mathematicalFoundation: 'Columnar transposition implements a permutation π: {1,2,...,k} → {1,2,...,k} where k is the keyword length. For keyword w₁w₂...wₖ, the permutation maps column i to position rank(wᵢ) where rank() returns the alphabetical position. The total number of possible permutations equals k! for keywords with unique letters, providing substantial key space. Security analysis involves calculating the expected number of anagramming trials needed to recover the permutation, typically requiring O(k!) operations for brute force attacks. Modern analysis considers the computational complexity of breaking multi-round columnar transposition, which approaches exponential difficulty.',
    practicalExample: {
      plaintext: 'ATTACK AT DAWN',
      key: 'SECRET (S=5, E=2, C=1, R=4, E=2, T=6)',
      ciphertext: 'TCTKAWANTA',
      stepByStep: [
        'Arrange keyword: S(5) E(2) C(1) R(4) E(2) T(6) → Column order: C(1) E(2) R(4) S(5) T(6)',
        'Note: Handle repeated letters by numbering E₁(2), E₂(3)',
        'Fill grid with plaintext: ATTACK|ATDAWN becomes: A T T A C K / A T  D A W N',
        'Read columns in alphabetical order: C(1)=TA, E₁(2)=TT, E₂(3)=blank, R(4)=AD, S(5)=AC, T(6)=KN',
        'Concatenate: TA + TT + AD + AC + KN = TATTADACKN'
      ]
    },
    securityAnalysis: {
      keySpace: 'Substantial: k! permutations for keyword length k. 6-letter keywords provide ~720 keys, 10-letter keywords provide >3.6 million keys.',
      cryptanalysisResistance: 'Moderate against systematic analysis. Vulnerable to anagramming with sufficient ciphertext. Double transposition significantly improves resistance.',
      recommendedKeySize: 'Keywords of 8-12 letters with no repeated characters. Avoid common words or predictable patterns. Consider double transposition for high-security applications.'
    },
    variations: [
      'Double Columnar Transposition: Apply the cipher twice with different keywords for exponential security increase',
      'Irregular Columnar: Vary row lengths to create non-rectangular grids, complicating cryptanalysis',
      'Multiple Alphabet Columnar: Use different alphabets for keyword ordering (e.g., reverse alphabetical order)',
      'Block Columnar: Process message in fixed-size blocks with different keywords per block',
      'Fractionated Columnar: Combine with substitution cipher before applying transposition',
      'Progressive Columnar: Change keyword systematically throughout message based on predetermined algorithm'
    ],
    realWorldApplications: [
      'German ADFGVX cipher during World War I combining substitution with columnar transposition',
      'Allied resistance networks during WWII for coordinating sabotage and intelligence operations',
      'Diplomatic communications between embassies and home governments before electronic encryption',
      'Commercial telegraph systems for protecting sensitive business communications',
      'Military field communications requiring manual encryption without specialized equipment',
      'Modern educational applications for teaching permutation-based cryptography concepts',
      'Puzzle and game design incorporating cryptographic challenges'
    ],
    learningObjectives: [
      'Understand the mathematical relationship between permutations and cryptographic security',
      'Master the technique of converting words into systematic numerical operations',
      'Learn to analyze the trade-offs between key memorability and cryptographic strength',
      'Develop skills in detecting and exploiting patterns in transposition-based systems',
      'Appreciate the historical evolution of manual cryptographic techniques',
      'Recognize columnar transposition principles in modern symmetric cipher design'
    ],
    commonMistakes: [
      'Using keywords with repeated letters without proper disambiguation protocols',
      'Choosing short or predictable keywords that reduce effective key space',
      'Failing to randomize padding characters, creating detectable message signatures',
      'Not securely communicating keyword changes, leading to cryptographic synchronization failures',
      'Applying single transposition when double transposition is required for security level',
      'Overlooking the vulnerability to anagramming attacks in operational security planning'
    ]
  },
  bacon: {
    id: 'bacon',
    name: "Bacon's Cipher",
    historicalBackground: "Sir Francis Bacon revolutionized cryptography around 1605 with his groundbreaking steganographic cipher, detailed in his work \"De Augmentis Scientiarum.\" Unlike previous ciphers that merely scrambled text, Bacon\'s innovation completely concealed the existence of secret messages within innocent-looking documents. His method used two distinct typefaces, fonts, or other binary visual distinctions to encode each letter as a 5-bit pattern. Historical applications included diplomatic correspondence during the English Renaissance, where ambassadors embedded secret instructions within routine letters. The cipher gained renewed attention during the Shakespearean authorship debates, where some scholars claimed to find Bacon\'s signature hidden within Shakespeare\'s works using this technique. During World War II, resistance movements adapted Bacon\'s principles for radio communications, using dots and dashes in Morse code transmissions to carry double meanings.",
    coreConcept: "Bacon\'s cipher represents the first documented binary encoding system in cryptographic history, predating modern digital communications by four centuries. The method assigns each letter of the alphabet a unique 5-bit binary pattern using symbols A and B (representing binary 0 and 1). These patterns are then concealed within carrier text through subtle visual variations: different typefaces, letter spacing, capitalization patterns, or any other binary distinction invisible to casual observers. The genius lies in its steganographic nature - the secret message\'s existence remains hidden, providing security through obscurity. Unlike traditional ciphers that produce obviously encrypted text, Bacon\'s method creates documents that appear completely normal while carrying concealed intelligence.",
    encryptionSteps: [
      'Create the 5-bit encoding table: A=AAAAA, B=AAAAB, C=AAABA, etc., through Z=BABBB (24-letter alphabet)',
      'Convert each plaintext letter to its corresponding 5-bit Bacon code sequence',
      'Select or create carrier text at least 5 times longer than the plaintext message',
      'Choose two distinct but subtle visual variations (e.g., normal vs. bold typeface, regular vs. italic)',
      'Apply the A/B pattern to carrier text: \'A\' bits use normal formatting, \'B\' bits use the alternate formatting',
      'Ensure the formatted carrier text appears natural and raises no suspicion among casual readers',
      'Verify the encoding by reverse-reading the visual patterns to confirm message integrity',
      'Transmit the formatted document through normal communication channels'
    ],
    decryptionOverview: 'Decryption requires identifying the two visual elements used for encoding, then systematically extracting the A/B pattern from the carrier text. Group the resulting binary sequence into 5-bit segments and decode each group using the Bacon cipher table. The recipient must know both the encoding method (which visual distinction was used) and the Bacon cipher table. Success depends on accurate pattern recognition and consistent application of the decoding rules.',
    strengths: [
      'Provides complete steganographic concealment - message existence remains hidden from observers',
      'Extremely flexible encoding methods: typefaces, spacing, punctuation, capitalization, or custom visual markers',
      'Immune to conventional cryptanalysis since the cipher appears as normal text',
      'Self-contained system requiring no additional encryption keys or complex mathematical operations',
      'Scalable to any message length limited only by available carrier text',
      'Historical precedent demonstrates practical utility across diverse communication media',
      'Difficult to detect without prior knowledge of the encoding method used',
      'Can be combined with other steganographic techniques for layered security'
    ],
    weaknesses: [
      'Requires carrier text exactly 5 times the length of the secret message, creating logistical challenges',
      'Limited to 24-letter alphabet in original form, excluding J and V from standard implementation',
      'Visual variations may be detectable through careful document analysis or digital forensics',
      'Carrier text must appear natural and contextually appropriate, constraining message timing',
      'Manual implementation prone to encoding errors that corrupt entire message segments',
      'Requires secure communication of encoding method details to intended recipients',
      'Vulnerable to statistical analysis if multiple messages use identical visual pattern methods',
      'Modern digital detection tools can identify systematic formatting patterns'
    ],
    modernRelevance: "Bacon\'s cipher pioneered concepts fundamental to modern information security and steganography. Contemporary applications include: digital watermarking in images, videos, and audio files; steganographic software that hides data in file metadata; covert communication channels in network protocols; subliminal messaging in digital media; blockchain applications encoding data in transaction patterns; and DNA steganography encoding information in genetic sequences. The binary encoding principle directly influenced ASCII character representation, computer data storage, and digital communications protocols. Modern steganographic tools often implement Bacon-inspired techniques for hiding sensitive information in plain sight.",
    mathematicalFoundation: "Bacon\'s cipher implements a bijective mapping between the 24-letter alphabet and 5-bit binary strings, providing exactly 2⁵ = 32 possible codes with 8 unused combinations. The encoding function f: {A,B,...,Z} → {0,1}⁵ assigns each letter a unique binary pattern. Information theory analysis shows the cipher provides log₂(24) ≈ 4.58 bits of information per symbol, with the unused codes offering potential for error detection or extended character sets. The steganographic capacity equals the carrier text length divided by 5, establishing a fundamental constraint on message-to-cover ratios in practical implementations.",
    practicalExample: {
      plaintext: 'SECRET',
      key: 'Bold/normal typeface distinction',
      ciphertext: 'Hidden in: "Some **messages** **require** **special** attention **during** **wartime** **communications**"',
      stepByStep: [
        'Convert to Bacon codes: S=BAAAB, E=AABAA, C=AAABA, R=BAAAA, E=AABAA, T=BAABA',
        'Concatenate: BAAABAABAAAABABAAAAABAABAABA (30 bits for 6 letters)',
        'Map to carrier text: "Some MESSages REQuire SPEcial attention DUring WARtime COMMunications"',
        'Apply formatting: Bold letters represent \'B\' bits, normal letters represent \'A\' bits',
        'Result appears as normal text with subtle formatting variations'
      ]
    },
    securityAnalysis: {
      keySpace: 'Limited by encoding method choices rather than mathematical keys. Security depends on steganographic concealment rather than cryptographic strength.',
      cryptanalysisResistance: 'High resistance to traditional cryptanalysis due to steganographic nature. Vulnerable to steganographic detection tools and statistical pattern analysis.',
      recommendedKeySize: 'Focus on encoding method sophistication rather than key length. Use subtle, context-appropriate visual distinctions that avoid detection.'
    },
    variations: [
      'Extended Bacon Cipher: Use 6-bit patterns to accommodate full 26-letter alphabet plus additional characters',
      'Multi-layer Bacon: Apply Bacon encoding to already-encrypted text for double concealment',
      'Digital Bacon: Use file metadata, pixel modifications, or formatting codes in digital documents',
      'Audio Bacon: Encode patterns in music, speech timing, or sound frequency variations',
      'Network Bacon: Hide patterns in packet timing, protocol fields, or network traffic characteristics',
      'Bacon Null Cipher: Combine with null cipher techniques using significant word positioning'
    ],
    realWorldApplications: [
      'Renaissance diplomatic communications concealing sensitive negotiations within routine correspondence',
      'Military intelligence during WWII using radio transmission timing and Morse code variations',
      'Modern digital steganography tools hiding data in image files, video streams, and audio recordings',
      'Covert communication channels in authoritarian regimes using social media post formatting',
      'Corporate espionage prevention through document watermarking and leak detection systems',
      'Academic research in information hiding and computational steganography',
      'Puzzle games and alternate reality games (ARGs) incorporating hidden message challenges'
    ],
    learningObjectives: [
      'Understand the fundamental distinction between cryptography and steganography',
      'Master binary encoding principles that underlie modern digital communication systems',
      'Learn to recognize the security trade-offs between concealment and encryption approaches',
      'Develop pattern recognition skills applicable to steganographic analysis',
      'Appreciate historical innovations that influenced contemporary information security methods',
      'Understand capacity limitations and practical constraints in steganographic systems'
    ],
    commonMistakes: [
      'Using obvious visual distinctions that immediately reveal the presence of hidden information',
      'Failing to maintain natural-looking carrier text that raises suspicion through awkward phrasing',
      'Inconsistent application of encoding rules leading to corrupted message recovery',
      'Neglecting to verify message integrity through test decryption before transmission',
      'Reusing identical encoding methods across multiple messages, creating detectable patterns',
      'Underestimating the challenge of generating sufficient natural-looking carrier text'
    ]
  },
  feistel: {
    id: 'feistel',
    name: 'Feistel Network',
    historicalBackground: 'Horst Feistel\'s revolutionary contribution to cryptography emerged from his work at IBM in the early 1970s, fundamentally transforming the field of symmetric encryption. His initial development of the Lucifer cipher introduced the world to the elegant mathematical structure that bears his name. When the U.S. National Bureau of Standards sought a national encryption standard, IBM\'s submission based on Feistel\'s design became the Data Encryption Standard (DES) in 1977. This standardization marked the beginning of modern commercial cryptography and established Feistel networks as the gold standard for block cipher design. The NSA\'s modifications to Lucifer during DES development sparked decades of academic research into Feistel network properties. Subsequent cipher designs including Blowfish, Twofish, Camellia, and numerous national standards have adopted and refined Feistel\'s original concepts, cementing its place as one of cryptography\'s most enduring innovations.',
    coreConcept: 'The Feistel network represents a paradigm shift in cryptographic design, solving the fundamental challenge of creating reversible encryption without requiring the round function itself to be reversible. The architecture splits input data into equal halves and processes them through multiple rounds of identical operations. Each round applies a keyed function F to one half, XORs the result with the other half, then swaps the halves. This mathematical elegance ensures that encryption and decryption use identical hardware or software implementations, differing only in the key schedule order. The beauty lies in the guarantee that any function F, regardless of its mathematical properties, creates a reversible transformation when embedded in the Feistel structure. This insight revolutionized cipher design by separating the concerns of functionality and reversibility.',
    encryptionSteps: [
      'Divide the plaintext block into two equal halves: Left₀ and Right₀ (typically 32-64 bits each)',
      'Generate round keys K₁, K₂, ..., Kₙ from the master key using a key schedule algorithm',
      'For each round i (typically 16-32 rounds): compute F(Rightᵢ₋₁, Kᵢ) using the round function F',
      'XOR the result with the left half: Leftᵢ = Leftᵢ₋₁ ⊕ F(Rightᵢ₋₁, Kᵢ)',
      'Set Rightᵢ = Leftᵢ₋₁ (swap halves for next round)',
      'After the final round, concatenate the halves: Ciphertext = Rightₙ || Leftₙ',
      'Note: Some implementations skip the final swap for mathematical convenience'
    ],
    decryptionOverview: 'Decryption applies the identical Feistel structure using round keys in reverse order. Starting with the ciphertext split into halves, each decryption round performs: Rightᵢ₋₁ = Leftᵢ and Leftᵢ₋₁ = Rightᵢ ⊕ F(Leftᵢ, Kᵢ). The mathematical properties of XOR ensure that applying F with the same key cancels out the encryption operation. This remarkable property means the same hardware or software can perform both encryption and decryption, reducing implementation costs and complexity.',
    strengths: [
      'Encryption and decryption use identical structure, minimizing hardware/software implementation costs',
      'Round function F requires no mathematical reversibility, allowing maximum design freedom',
      'Proven security framework with decades of cryptanalytic scrutiny and academic validation',
      'Scalable architecture supporting variable block sizes, key lengths, and round numbers',
      'Self-inverse property under proper key scheduling eliminates need for separate decryption algorithms',
      'Modular design enables independent optimization of round function and key schedule components',
      'Resistance to differential and linear cryptanalysis when properly designed',
      'Suitable for both software and hardware implementation with equivalent security properties'
    ],
    weaknesses: [
      'Requires multiple rounds (typically 16-32) to achieve security, increasing computation time',
      'Only half the data undergoes transformation per round, potentially reducing efficiency',
      'Security heavily dependent on round function design and key schedule quality',
      'Vulnerable to related-key attacks if key schedule has weaknesses',
      'Block size limitation creates issues for very small or very large data processing',
      'Side-channel attacks may exploit key-dependent operations in round function F',
      'Performance overhead from multiple round processing compared to single-pass algorithms',
      'Weak round functions can compromise entire cipher security regardless of round count'
    ],
    modernRelevance: 'Feistel networks continue to dominate contemporary cryptographic applications and research. Current implementations include: national encryption standards like KASUMI (3GPP), MISTY1 (Japan), and Camellia (international standard); embedded system cryptography where hardware/software efficiency matters; blockchain and cryptocurrency protocols requiring proven security guarantees; IoT device security where implementation simplicity is crucial; academic research into post-quantum cryptographic resistance; and hybrid cipher designs combining Feistel structures with other cryptographic primitives. The architecture\'s mathematical elegance continues to inspire new cipher designs and security proofs in modern cryptographic research.',
    mathematicalFoundation: 'Feistel networks implement a permutation π: {0,1}ⁿ → {0,1}ⁿ through iterated application of the transformation (L,R) ↦ (R, L ⊕ F(R,K)). The security relies on the pseudo-random properties of function F rather than its mathematical complexity. For n-bit blocks with r rounds, the Feistel structure creates a family of 2^(rk) permutations where k is the round key length. Security analysis involves bounding the probability that an adversary can distinguish the Feistel permutation from a truly random permutation. Modern analysis employs provable security techniques, showing that r-round Feistel networks approach ideal security as r increases, provided F behaves as a pseudo-random function.',
    practicalExample: {
      plaintext: '0110101101001011',
      key: '4-round Feistel with simple F(x,k) = (x ≪ 2) ⊕ k',
      ciphertext: '1010110010010111',
      stepByStep: [
        'Split: L₀ = 01101011, R₀ = 01001011',
        'Round 1: F(01001011, K₁) = 01001011 ≪ 2 ⊕ K₁ = 01001111, L₁ = 01101011 ⊕ 01001111 = 00100100, R₁ = 01101011',
        'Round 2: F(01101011, K₂) = 10110110, L₂ = 01001011 ⊕ 10110110 = 11111101, R₂ = 00100100',
        'Continue for rounds 3-4 with key schedule K₃, K₄',
        'Final: Ciphertext = R₄ || L₄'
      ]
    },
    securityAnalysis: {
      keySpace: 'Determined by master key length and key schedule design. Typically 2⁵⁶ to 2²⁵⁶ depending on implementation. Modern standards require minimum 128-bit effective key strength.',
      cryptanalysisResistance: 'Excellent resistance to known attacks when properly implemented. Requires careful round function design to resist differential/linear cryptanalysis. Minimum 16 rounds recommended for security.',
      recommendedKeySize: '128-256 bit master keys with cryptographically strong key schedule. Round keys should appear pseudo-random and exhibit no exploitable patterns.'
    },
    variations: [
      'Unbalanced Feistel: Use unequal half sizes for specialized applications requiring non-standard block sizes',
      'Generalized Feistel: Split into more than two parts, applying round functions to multiple segments simultaneously',
      'Alternating Feistel: Vary the round function or key schedule pattern between rounds for added security',
      'Nested Feistel: Implement the round function F itself as a smaller Feistel network for recursive security',
      'Type-1/Type-2 Feistel: Different mathematical formulations optimizing for specific performance characteristics',
      'Lai-Massey Scheme: Hybrid approach combining Feistel and substitution-permutation network principles'
    ],
    realWorldApplications: [
      'DES (Data Encryption Standard): Foundation of commercial cryptography from 1977-2001',
      'Blowfish and Twofish: Popular ciphers for software encryption applications',
      'Camellia: International standard used in TLS, IPsec, and other security protocols',
      'KASUMI: 3GPP standard for mobile phone encryption worldwide',
      'RC5 and RC6: RSA cipher designs based on Feistel-like structures',
      'Custom embedded system encryption where implementation simplicity is paramount',
      'Cryptocurrency and blockchain protocols requiring proven cryptographic security'
    ],
    learningObjectives: [
      'Master the fundamental principle of reversible cryptographic transformations',
      'Understand the relationship between round function complexity and overall cipher security',
      'Learn to analyze the security implications of iterative cryptographic processes',
      'Appreciate the engineering elegance of unified encryption/decryption architectures',
      'Develop intuition for the trade-offs between performance and security in cipher design',
      'Recognize Feistel principles in modern symmetric cryptography standards'
    ],
    commonMistakes: [
      'Using too few rounds, leaving the cipher vulnerable to cryptanalytic attacks',
      'Designing weak round functions that fail to provide adequate diffusion and confusion',
      'Implementing predictable key schedules that enable related-key or weak-key attacks',
      'Ignoring side-channel vulnerabilities in round function implementation',
      'Misunderstanding that round function reversibility is not required for cipher security',
      'Failing to validate security properties through proper cryptanalytic analysis before deployment'
    ]
  }
};
