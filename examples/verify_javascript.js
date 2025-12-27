/**
 * ProofPlay API Example - JavaScript
 * 
 * Demonstrates how to:
 * 1. Fetch verification data
 * 2. Client-side cryptographic verification using Web Crypto API
 * 
 * Works in browser or Node.js 18+
 */

const API_URL = "https://proofplay-sx3q.onrender.com";

/**
 * Convert hex string to Uint8Array
 */
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Convert ArrayBuffer to hex string
 */
function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Compute SHA256 hash of hex string
 */
async function sha256Hex(hexString) {
  const bytes = hexToBytes(hexString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  return bytesToHex(hashBuffer);
}

/**
 * Get first 4 bytes of hex string as big-endian uint32
 */
function hexToUint32BE(hexString) {
  return parseInt(hexString.slice(0, 8), 16);
}

/**
 * Fetch verification data for a game
 */
async function getVerificationData(gameId) {
  const resp = await fetch(`${API_URL}/games/${gameId}/verify`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch game: ${resp.status}`);
  }
  return resp.json();
}

/**
 * Verify a single draw
 */
async function verifyDraw(draw, previouslyDrawn) {
  const result = {
    sequence: draw.sequence,
    number: draw.number,
    hashValid: null,
    numberValid: null,
  };
  
  if (!draw.seed) {
    console.log(`  Draw #${draw.sequence}: No seed revealed (old draw)`);
    return result;
  }
  
  // Step 1: Verify SHA256(seed) === seed_hash
  const computedHash = await sha256Hex(draw.seed);
  result.hashValid = computedHash === draw.seed_hash;
  
  if (!result.hashValid) {
    console.log(`  Draw #${draw.sequence}: HASH MISMATCH!`);
    console.log(`    Expected: ${draw.seed_hash}`);
    console.log(`    Computed: ${computedHash}`);
    return result;
  }
  
  console.log(`  Draw #${draw.sequence}: Hash verified ✓`);
  
  // Step 2: Verify number derivation
  const available = [];
  for (let n = 1; n <= 75; n++) {
    if (!previouslyDrawn.has(n)) {
      available.push(n);
    }
  }
  
  const seedUint32 = hexToUint32BE(draw.seed);
  const index = seedUint32 % available.length;
  const expectedNumber = available[index];
  
  result.numberValid = expectedNumber === draw.number;
  
  if (!result.numberValid) {
    console.log(`    NUMBER MISMATCH! Expected ${expectedNumber}, got ${draw.number}`);
    return result;
  }
  
  console.log(`    Number derivation verified ✓ (number=${draw.number})`);
  return result;
}

/**
 * Fully verify all draws in a game
 */
async function verifyGame(gameId) {
  console.log(`Verifying game: ${gameId}`);
  console.log('-'.repeat(40));
  
  const data = await getVerificationData(gameId);
  const draws = data.draws || [];
  
  if (draws.length === 0) {
    console.log('No draws found.');
    return true;
  }
  
  console.log(`Found ${draws.length} draw(s)\n`);
  
  const drawnNumbers = new Set();
  let allPassed = true;
  
  for (const draw of draws) {
    const result = await verifyDraw(draw, drawnNumbers);
    if (result.hashValid === false || result.numberValid === false) {
      allPassed = false;
    }
    drawnNumbers.add(draw.number);
  }
  
  console.log('\n' + '-'.repeat(40));
  if (allPassed) {
    console.log('✅ ALL DRAWS VERIFIED');
  } else {
    console.log('❌ VERIFICATION FAILED');
  }
  
  return allPassed;
}

// Run if called directly (Node.js)
if (typeof require !== 'undefined' && require.main === module) {
  const gameId = process.argv[2] || '077c56e6';
  verifyGame(gameId).catch(console.error);
}

// Export for module usage
if (typeof module !== 'undefined') {
  module.exports = { verifyGame, verifyDraw, getVerificationData };
}
