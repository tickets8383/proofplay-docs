# ProofPlay Documentation

This repository contains documentation for ProofPlay services and APIs.

---

## Products

### 🎮 ProofPlay Bingo

Provably fair gaming infrastructure with cryptographic audit trails. A bingo game built on enterprise-grade audit infrastructure where every random draw is committed to a third-party timestamp authority *before* the number is revealed.

- **API:** `https://proofplay-sx3q.onrender.com`
- **Verifier:** [proofplay-one.vercel.app](https://proofplay-one.vercel.app)
- **Documentation:** [API Reference](API.md)
- **Examples:** [examples/](examples/)

### 🧠 GPM-SC Reasoning Verifier

Formal logic verification and paradox resolution with cryptographic audit trails. A hybrid neuro-symbolic logic engine for Enterprise AI, AI safety evaluations, RegTech, and regulated applications.

- **API:** `https://gpmsc-api.onrender.com`
- **RapidAPI:** [gpm-sc-reasoning-verifier](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/)
- **Documentation:** [API Reference](GPM-SC_API.md)
- **Reselling Guide:** [RESELLING.md](RESELLING.md)

---

## ProofPlay Bingo

### How It Works

```
1. Server generates random seed (32 bytes)
2. Server hashes seed → seed_hash
3. Server anchors seed_hash to RFC 3161 timestamp authority
4. Server derives bingo number from seed
5. Number is revealed to players
6. After draw: seed is published for verification
```

**The key insight:** The seed is committed (anchored) *before* the number is derived. This proves the server couldn't have manipulated the outcome.

### Try It Now

1. Visit the [Web Verifier](https://proofplay-one.vercel.app)
2. Enter game ID: `077c56e6`
3. Click "Verify Game Integrity"
4. Watch the client-side cryptographic verification

All verification runs in your browser — no trust in our servers required.

### Quick Start

#### Create a session

```bash
curl -X POST https://proofplay-sx3q.onrender.com/auth/session \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "device_key_hash": "my-device-123"}'
```

#### Verify a game

```bash
curl https://proofplay-sx3q.onrender.com/games/077c56e6/verify | jq .
```

#### Client-side verification (JavaScript)

```javascript
// Verify SHA256(seed) === seed_hash
const seedBytes = new Uint8Array(seed.match(/.{2}/g).map(b => parseInt(b, 16)));
const hashBuffer = await crypto.subtle.digest('SHA-256', seedBytes);
const computedHash = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, '0')).join('');

console.assert(computedHash === seed_hash, 'Verification failed!');
```

See [examples/](examples/) for complete integration samples.

### Security Features

- **RFC 3161 Timestamps** — Third-party, legally recognized proof
- **Commit-before-reveal** — Seed hash anchored before number generation  
- **Hash-chained audit log** — Tamper-evident, append-only
- **Client-side verification** — Don't trust us, verify the math yourself

### Use Cases

ProofPlay's audit infrastructure can power any scenario requiring provable fairness:

| Industry | Application |
|----------|-------------|
| 🎲 Gaming | Loot boxes, gacha, dice rolls |
| 🎁 Marketing | Influencer giveaways, promotional contests |
| 🏈 Fantasy Sports | Draft order, tiebreakers, bankroll auditing |
| 🏛️ Government | Procurement selection, lottery |
| 🏥 Healthcare | Clinical trial randomization |
| 🎪 Events | Raffle drawings, door prizes |

### API Access

**Free tier:** Public endpoints (verify, game state)

**Coming soon:** RapidAPI listing for full RNG-as-a-Service

For enterprise licensing or custom integration, contact us.

---

## GPM-SC Reasoning Verifier

### Overview

GPM-SC (Generative Paradox Machine - Stratified Coherence) provides:

- **Formal Logic Verification** — Verify logical propositions using pure logic (free tier)
- **Paradox Resolution** — Resolve paradoxes using LLM synthesis (BYOK)
- **Cryptographic Audit Trails** — Every response includes cryptographic proof
- **Enterprise Compliance** — Legal templates for GDPR, HIPAA, contract law
- **BYOK Architecture** — Bring your own API keys for LLM features

### Pricing Tiers

| Tier | What You Get | Cost |
|------|--------------|------|
| **Free** | Logic verification, paradox detection, coherence scoring | $0 |
| **Developer** | + LLM synthesis (BYOK) | Your API costs |
| **Pro** | + Audit certificates | $29/mo + Your API costs |
| **Enterprise** | + SLA, dedicated support | Contact us |

### Quick Start

#### Free Verification

```bash
curl -X POST https://gpmsc-api.onrender.com/verify \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: gpmsc-api.onrender.com" \
  -H "Content-Type: application/json" \
  -d '{"proposition": "p → p"}'
```

#### BYOK Synthesis

```bash
curl -X POST https://gpmsc-api.onrender.com/synthesize \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: gpmsc-api.onrender.com" \
  -H "X-Anthropic-Key: YOUR_ANTHROPIC_KEY" \
  -H "Content-Type: application/json" \
  -d '{"paradox": "The Liar Paradox: This statement is false"}'
```

See [GPM-SC API Documentation](GPM-SC_API.md) for complete reference.

### Reselling

You can integrate GPM-SC into your own products and services. See the [Reselling Guide](RESELLING.md) for details.

---

## Documentation

### ProofPlay Bingo
- [API Reference](API.md) — Full endpoint documentation
- [Examples](examples/) — Integration code samples

### GPM-SC Reasoning Verifier
- [API Reference](GPM-SC_API.md) — Full endpoint documentation
- [Reselling Guide](RESELLING.md) — Integrate into your products

---

## Contact

- **Email:** tickets8383@icloud.com
- **ProofPlay Support:** [Support Page](https://proofplay-sx3q.onrender.com/static/support.html)
- **GPM-SC RapidAPI:** [gpm-sc-reasoning-verifier](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/)

---

## License

Documentation is MIT licensed. The ProofPlay and GPM-SC services and infrastructure are proprietary.
