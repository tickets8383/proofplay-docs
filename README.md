# ProofPlay

**Provably fair gaming infrastructure with cryptographic audit trails.**

ProofPlay is a bingo game built on enterprise-grade audit infrastructure. Every random draw is committed to a third-party timestamp authority *before* the number is revealed, creating an immutable, court-admissible proof that the game wasn't rigged.

🎮 **API:** `https://proofplay-sx3q.onrender.com`  
🔍 **Verifier:** [proofplay-one.vercel.app](https://proofplay-one.vercel.app)  
📱 **iOS:** Coming soon  
📱 **Android:** Coming soon

---

## How It Works

```
1. Server generates random seed (32 bytes)
2. Server hashes seed → seed_hash
3. Server anchors seed_hash to RFC 3161 timestamp authority
4. Server derives bingo number from seed
5. Number is revealed to players
6. After draw: seed is published for verification
```

**The key insight:** The seed is committed (anchored) *before* the number is derived. This proves the server couldn't have manipulated the outcome.

---

## Try It Now

1. Visit the [Web Verifier](https://proofplay-one.vercel.app)
2. Enter game ID: `077c56e6`
3. Click "Verify Game Integrity"
4. Watch the client-side cryptographic verification

All verification runs in your browser — no trust in our servers required.

---

## Documentation

- [API Reference](API.md) — Full endpoint documentation
- [Examples](examples/) — Integration code samples

---

## Use Cases

ProofPlay's audit infrastructure can power any scenario requiring provable fairness:

| Industry | Application |
|----------|-------------|
| 🎲 Gaming | Loot boxes, gacha, dice rolls |
| 🎁 Marketing | Influencer giveaways, promotional contests |
| 🏈 Fantasy Sports | Draft order, tiebreakers, bankroll auditing |
| 🏛️ Government | Procurement selection, lottery |
| 🏥 Healthcare | Clinical trial randomization |
| 🎪 Events | Raffle drawings, door prizes |

---

## Quick Start

### Create a session

```bash
curl -X POST https://proofplay-sx3q.onrender.com/auth/session \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "device_key_hash": "my-device-123"}'
```

### Verify a game

```bash
curl https://proofplay-sx3q.onrender.com/games/077c56e6/verify | jq .
```

### Client-side verification (JavaScript)

```javascript
// Verify SHA256(seed) === seed_hash
const seedBytes = new Uint8Array(seed.match(/.{2}/g).map(b => parseInt(b, 16)));
const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes);
const computedHash = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, '0')).join('');

console.assert(computedHash === seed_hash, 'Verification failed!');
```

See [examples/](examples/) for complete integration samples.

---

## Security Features

- **RFC 3161 Timestamps** — Third-party, legally recognized proof
- **Commit-before-reveal** — Seed hash anchored before number generation  
- **Hash-chained audit log** — Tamper-evident, append-only
- **Client-side verification** — Don't trust us, verify the math yourself

---

## API Access

**Free tier:** Public endpoints (verify, game state)

**Coming soon:** RapidAPI listing for full RNG-as-a-Service

For enterprise licensing or custom integration, contact us.

---

## Contact

- **Email:** tickets8383@icloud.com
- **Support:** [Support Page](https://proofplay-sx3q.onrender.com/static/support.html)

---

## License

Documentation is MIT licensed. The ProofPlay service and infrastructure are proprietary.
