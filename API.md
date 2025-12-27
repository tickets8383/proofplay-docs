# ProofPlay API Documentation

**Base URL:** `https://proofplay-sx3q.onrender.com`

All endpoints return JSON. Errors return `{"detail": "error message"}` with appropriate HTTP status codes.

---

## Authentication

ProofPlay uses session-based authentication. Create a session first, then pass the session ID in the `X-Session-Id` header.

### Create Session

```http
POST /auth/session
Content-Type: application/json

{
  "email": "player@example.com",
  "device_key_hash": "unique-device-identifier"
}
```

**Response:**
```json
{
  "session_id": "a1b2c3d4e5f6...",
  "role": "player",
  "email": "player@example.com"
}
```

**Notes:**
- `device_key_hash` should be a unique identifier for the device (e.g., hashed device ID)
- Sessions persist across requests
- Admins are designated via server configuration

---

## Games

### Create Game (Admin only)

```http
POST /games
X-Session-Id: {session_id}
Content-Type: application/json

{
  "name": "Friday Night Bingo"
}
```

**Response:**
```json
{
  "game_id": "cca78b7e",
  "pin": "4829",
  "name": "Friday Night Bingo",
  "status": "waiting"
}
```

**Notes:**
- Only admin sessions can create games
- PIN is 4 digits, share with players to join
- Game ID is 8 hex characters

---

### Join Game

```http
POST /games/{game_id}/join
X-Session-Id: {session_id}
Content-Type: application/json

{
  "pin": "4829"
}
```

**Response:**
```json
{
  "status": "joined",
  "card_id": "card_abc123",
  "numbers": [[12, 34, 0, 56, 78], ...],
  "marked": [[false, false, true, false, false], ...],
  "game_name": "Friday Night Bingo"
}
```

**Notes:**
- `numbers` is a 5x5 grid (center is always 0 = free space)
- `marked` tracks which squares are marked
- 5 incorrect PIN attempts triggers 15-minute lockout

**Errors:**
- `400 Invalid game ID or PIN`
- `400 Incorrect PIN`
- `400 Too many failed attempts. Try again in X minutes.`

---

### Draw Number (Admin only)

```http
POST /games/{game_id}/draw
X-Session-Id: {session_id}
```

**Response:**
```json
{
  "number": 42,
  "sequence": 1,
  "seed_hash": "9f3af1af...",
  "anchor_id": "tsa_freetsa_or_20251227_132350_9f3af1af",
  "drawn_at": "2025-12-27T13:23:50.821895+00:00"
}
```

**Notes:**
- Only the game creator can draw
- Numbers are 1-75 (standard bingo)
- Each number can only be drawn once
- `seed_hash` is the SHA256 of the random seed (committed before draw)
- `anchor_id` proves the timestamp authority anchoring

**Errors:**
- `400 Not authorized or all numbers drawn`

---

### Get Game State (Public)

```http
GET /games/{game_id}
```

**Response:**
```json
{
  "game": {
    "id": "cca78b7e",
    "name": "Friday Night Bingo",
    "status": "active",
    "created_at": "2025-12-27T13:00:00Z"
  },
  "draws": [
    {"sequence": 1, "number": 42, "drawn_at": "..."},
    {"sequence": 2, "number": 17, "drawn_at": "..."}
  ],
  "player_count": 5
}
```

**Notes:**
- No authentication required
- Does not include seeds (use `/verify` endpoint for full audit data)

---

### Get My Card

```http
GET /games/{game_id}/card
X-Session-Id: {session_id}
```

**Response:**
```json
{
  "card_id": "card_abc123",
  "numbers": [[12, 34, 0, 56, 78], ...],
  "marked": [[false, false, true, false, false], ...],
  "game_id": "cca78b7e"
}
```

---

### Mark Number

```http
POST /games/{game_id}/mark
X-Session-Id: {session_id}
Content-Type: application/json

{
  "row": 2,
  "col": 3
}
```

**Response:**
```json
{
  "marked": [[false, false, true, false, false], ...],
  "bingo": false
}
```

**Notes:**
- `row` and `col` are 0-indexed (0-4)
- `bingo` is true if marking completes a winning pattern

---

## Verification

### Get Verification Data (Public)

```http
GET /games/{game_id}/verify
```

**Response:**
```json
{
  "game_id": "cca78b7e",
  "draws": [
    {
      "game_id": "cca78b7e",
      "sequence": 1,
      "number": 42,
      "seed_hash": "9f3af1afb69b2874c335081241cc253f...",
      "seed": "8269f2d174de480c39d6a89b523ac62a...",
      "anchor_id": "tsa_freetsa_or_20251227_132350_9f3af1af",
      "drawn_at": "2025-12-27T13:23:50.821895+00:00"
    }
  ],
  "audit_chain_valid": true,
  "audit_entries_verified": "Chain verified: 3 entries",
  "verification_timestamp": "2025-12-27T14:00:00Z"
}
```

**Notes:**
- `seed` is revealed after the draw for verification
- Client can verify: `SHA256(seed) === seed_hash`
- Number derivation: `int(seed[0:4]) % available_numbers`

---

## Health Checks

### Liveness

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "version": "2.0.0"
}
```

### Readiness

```http
GET /ready
```

**Response:**
```json
{
  "ok": true,
  "timestamp": "2025-12-27T14:00:00Z",
  "db_path": "/data/proofplay.db"
}
```

**Notes:**
- Returns 503 if database is unavailable
- Use for deployment health checks

---

## Client-Side Verification

For full trustless verification, use our [web verifier](https://proofplay-one.vercel.app) or implement client-side:

```javascript
// 1. Fetch verification data
const resp = await fetch(`${API}/games/${gameId}/verify`);
const data = await resp.json();

// 2. For each draw, verify hash
for (const draw of data.draws) {
  const seedBytes = hexToBytes(draw.seed);
  const hash = await crypto.subtle.digest('SHA-256', seedBytes);
  const computedHash = bytesToHex(hash);
  
  console.assert(computedHash === draw.seed_hash, 'Hash mismatch!');
}

// 3. Verify number derivation
const drawnSet = new Set();
for (const draw of data.draws) {
  const available = [];
  for (let n = 1; n <= 75; n++) {
    if (!drawnSet.has(n)) available.push(n);
  }
  
  const seedInt = parseInt(draw.seed.slice(0, 8), 16);
  const index = seedInt % available.length;
  const expected = available[index];
  
  console.assert(expected === draw.number, 'Number mismatch!');
  drawnSet.add(draw.number);
}
```

---

## Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| GET requests | 60/minute per IP |
| POST requests | 15/minute per IP |
| PIN attempts | 5 per game, then 15-min lockout |

---

## Errors

| Status | Meaning |
|--------|---------|
| 400 | Bad request (invalid input) |
| 401 | Session required |
| 403 | Not authorized |
| 404 | Not found |
| 429 | Rate limit exceeded |
| 503 | Service unavailable |

---

## SDKs & Libraries

Coming soon:
- Python SDK
- JavaScript/TypeScript SDK
- React Native hooks

---

## Support

- **Email:** tickets8383@icloud.com
- **Web Verifier:** [proofplay-one.vercel.app](https://proofplay-one.vercel.app)
