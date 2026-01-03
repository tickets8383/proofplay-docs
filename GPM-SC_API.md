# GPM-SC Reasoning Verifier API Documentation

**Base URL:** `https://gpmsc-api.onrender.com`

**RapidAPI:** [gpm-sc-reasoning-verifier](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/)

All endpoints return JSON. Errors return `{"detail": "error message"}` with appropriate HTTP status codes.

---

## Overview

GPM-SC (Generative Paradox Machine - Stratified Coherence) provides formal logic verification and paradox resolution with cryptographic audit trails.

**New:** Natural Language Support! The `/verify/natural` endpoint allows you to verify statements in plain English - no formal logic knowledge required. Perfect for beginners or quick checks.

### Pricing Tiers

| Tier | What You Get | Cost |
|------|--------------|------|
| **Free** | Logic verification, paradox detection, coherence scoring | $0 |
| **Developer** | + LLM synthesis (BYOK) | Your API costs |
| **Pro** | + Audit certificates | $29/mo + Your API costs |
| **Enterprise** | + SLA, dedicated support | Contact us |

### BYOK (Bring Your Own Key)

For synthesis operations, provide your API key in the `X-Anthropic-Key` or `X-OpenAI-Key` header. You pay your API provider directly - we never see or store your key.

---

## Authentication

### RapidAPI

When using RapidAPI, include these headers:

```
X-RapidAPI-Key: YOUR_RAPIDAPI_KEY
X-RapidAPI-Host: gpmsc-api.onrender.com
```

RapidAPI automatically adds these headers when using their client libraries.

### Direct Access

For direct API access, authentication depends on the endpoint:
- **Free tier endpoints** (`/verify`, `/verify/natural`, `/verify/logic`, `/classify`, `/examples`): No authentication required
- **BYOK endpoints** (`/synthesize`, `/ask`): Provide `X-Anthropic-Key` or `X-OpenAI-Key` header
- **Pro tier features**: Requires RapidAPI subscription

---

## Info Endpoints

### GET `/`

Service information and welcome message.

**Response:**
```json
{
  "service": "GPM-SC Reasoning Verifier",
  "version": "1.0.0",
  "description": "Formal logic verification with paradox resolution",
  "docs": "/docs",
  "pricing": "/pricing",
  "endpoints": {
    "GET /status": "Service status",
    "POST /verify": "Free: Logic verification (no LLM)",
    "POST /synthesize": "BYOK: Paradox resolution (requires API key)"
  }
}
```

---

### GET `/status`

Get current service status and capabilities.

**Headers (Optional):**
- `X-Anthropic-Key`: Check Anthropic LLM availability
- `X-OpenAI-Key`: Check OpenAI LLM availability
- `X-Prefer-Local`: Set to "true" for Ollama
- `X-Ollama-Model`: Specify Ollama model name

**Response:**
```json
{
  "tier": "free",
  "llm_available": false,
  "llm_mode": "none",
  "llm_provider": "none",
  "llm_model": "",
  "smt_available": true,
  "matl_templates": 0,
  "features": {
    "verification": true,
    "synthesis": false,
    "classification": true,
    "audit_trails": true,
    "cryptographic_proofs": true
  },
  "cost_structure": {
    "verification": "$0.00",
    "synthesis": "BYOK",
    "ask": "BYOK"
  }
}
```

**Notes:**
- API keys are never logged or stored
- Keys are used only for the current request
- `llm_available` indicates if LLM features are accessible

---

### GET `/pricing`

Get pricing information for all tiers.

**Response:**
```json
{
  "tiers": {
    "free": {
      "name": "Free",
      "price": "$0",
      "features": [
        "Logic verification",
        "Paradox detection",
        "Coherence scoring",
        "SMT satisfiability check"
      ],
      "limits": "50 verifications/day",
      "llm": "None (pure logic)"
    },
    "developer": {
      "name": "Developer",
      "price": "$9/month + your API costs",
      "features": [
        "Everything in Free",
        "LLM synthesis (BYOK)",
        "Unlimited verifications"
      ],
      "limits": "Unlimited",
      "llm": "BYOK (Anthropic or OpenAI)"
    },
    "pro": {
      "name": "Pro",
      "price": "$29/month + your API costs",
      "features": [
        "Everything in Developer",
        "RFC 3161 audit certificates",
        "Compliance reports",
        "Priority support"
      ],
      "limits": "Unlimited",
      "llm": "BYOK (Anthropic or OpenAI)"
    },
    "enterprise": {
      "name": "Enterprise",
      "price": "Contact us",
      "features": [
        "Everything in Pro",
        "SLA guarantees",
        "Dedicated support",
        "Custom integrations",
        "On-premise deployment"
      ],
      "limits": "Custom",
      "llm": "Managed or BYOK"
    }
  },
  "notes": [
    "BYOK = Bring Your Own Key. You pay your API provider directly.",
    "All tiers include cryptographic audit trails.",
    "Free tier uses pure logic (no LLM calls)."
  ]
}
```

---

### GET `/health`

Health check endpoint for monitoring (liveness probe).

**Response:**
```json
{
  "status": "healthy",
  "timestamp": 1767381969.3696544
}
```

---

### GET `/ready`

Readiness check endpoint (checks dependencies).

**Response:**
```json
{
  "ok": true,
  "timestamp": "2025-01-02T14:20:00Z",
  "db_path": "/data/gpmsc.db"
}
```

Returns 503 if service is not ready.

---

## Verification Endpoints

### POST `/verify/natural`

Verify a statement in plain English. **FREE TIER** - No API key required, no LLM needed.

This is the **accessibility layer for non-experts**. It accepts plain English statements and translates them to formal logic internally, making GPM-SC accessible without requiring formal logic knowledge.

**Rate Limits:**
- Free: 50 requests/minute
- Pro: 500 requests/minute

**Request:**
```json
{
  "statement": "If it's raining, then it's raining",
  "explain_formal": true
}
```

**Response:**
```json
{
  "success": true,
  "is_logically_valid": true,
  "is_paradox": false,
  "paradox_type": null,
  "plain_english_explanation": "This is a tautology - a statement that is always true by its logical structure. The statement essentially says 'if A then A', which cannot be false.",
  "formal_translation": "∀p:Prop . p → p",
  "formal_explanation": "Your statement was translated to: ∀p:Prop . p → p\n\nIn this notation:\n• ∀ means 'for all' (universal quantifier)\n• → means 'implies' or 'if...then'\n• :Prop means 'of type Proposition'",
  "confidence": 0.9,
  "suggestions": null,
  "processing_time_ms": 45.2,
  "cost_usd": 0.0
}
```

**Supported Patterns:**
- **Tautology**: "If it's raining, then it's raining"
- **Liar Paradox**: "This statement is false"
- **Contradiction**: "Something is both true and false"
- **Universal**: "All humans are mortal"
- **Excluded Middle**: "A or not A"

**Example - Liar Paradox:**
```json
{
  "statement": "This statement is false"
}
```

Returns `is_paradox: true` with explanation of the paradox.

**Features:**
- Automatic translation to formal logic
- Beginner-friendly explanations
- Optional formal notation guide
- Learning suggestions
- Zero cost ($0.00)

---

### POST `/verify`

Verify a logical proposition. **FREE TIER** - No API key required.

Uses pure logic (no LLM):
- FAL parsing
- Paradox pattern detection
- SMT satisfiability check
- Coherence scoring

**Rate Limits:**
- Free: 10 requests/minute
- Pro: 1000 requests/minute

**Request:**
```json
{
  "proposition": "p → p"
}
```

**Headers (Optional):**
- `X-Legacy-Format: true` - Force legacy response format
- `X-Receipt-Format: true` - Request receipt format (default)

**Response (Receipt Format - Default):**
```json
{
  "result": {
    "valid": true,
    "coherent": true,
    "paradox_detected": false,
    "paradox_type": null,
    "coherence_score": 1.0,
    "smt_satisfiable": true,
    "warnings": [],
    "mode": "smt",
    "cost_usd": 0.0,
    "processing_time_ms": 45
  },
  "proof": {
    "hash": "sha256:abc123...",
    "timestamp": "2025-01-02T14:20:00Z",
    "anchor_id": null
  },
  "verification_method": "SMT_Z3"
}
```

**Response (Legacy Format - with `X-Legacy-Format: true`):**
```json
{
  "valid": true,
  "coherent": true,
  "paradox_detected": false,
  "paradox_type": null,
  "coherence_score": 1.0,
  "smt_satisfiable": true,
  "warnings": [],
  "mode": "smt",
  "cost_usd": 0.0,
  "processing_time_ms": 45
}
```

**Example - Paradox Detection:**
```json
{
  "proposition": "∀p:Prop . V(p) ↔ ¬V(p)"
}
```

This will detect the Liar Paradox and return `paradox_detected: true`.

---

### POST `/verify/logic`

Zero-cost logic verification endpoint (SMT Bridge direct). **FREE TIER** - No API key required.

This is a high-volume, free endpoint that uses pure Python + Z3 only - no LLM calls.

**Rate Limits:**
- Free: 100 requests/minute
- Pro: 1000 requests/minute

**Security:** Strict timeout (2.0s) and complexity limits (1000 chars) to prevent DoS attacks.

**Request:**
```json
{
  "proposition": "p → p"
}
```

**Response:**
```json
{
  "result": {
    "valid": true,
    "coherent": true,
    "paradox_detected": false,
    "coherence_score": 1.0,
    "smt_satisfiable": true,
    "warnings": [],
    "mode": "smt",
    "cost_usd": 0.0,
    "processing_time_ms": 32
  },
  "proof": {
    "hash": "sha256:def456...",
    "timestamp": "2025-01-02T14:20:00Z",
    "anchor_id": null
  },
  "verification_method": "SMT_Z3"
}
```

---

## Synthesis Endpoints

### POST `/synthesize`

Synthesize a resolution for a paradox. **BYOK TIER** - Requires API key.

Provide your API key in headers:
- `X-Anthropic-Key`: Your Anthropic API key
- `X-OpenAI-Key`: Your OpenAI API key
- `X-Prefer-Local`: Set to "true" for Ollama (local, free)

**Cost:**
- BYOK: You pay your API provider directly
- Local (Ollama): $0.00

**Headers:**
- `X-Anthropic-Key`: Your Anthropic API key (optional)
- `X-OpenAI-Key`: Your OpenAI API key (optional)
- `X-Prefer-Local`: Set to "true" for Ollama (optional)
- `X-Ollama-Model`: Specify Ollama model (optional)
- `X-Anthropic-Model`: Specify Anthropic model (optional)
- `X-OpenAI-Model`: Specify OpenAI model (optional)
- `X-Legacy-Format`: Force legacy format (optional)

**Request:**
```json
{
  "paradox": "The Liar Paradox: This statement is false",
  "require_validation": true
}
```

**Response:**
```json
{
  "result": {
    "resolution": "Stratified truth predicate resolves the paradox by...",
    "validated": true,
    "coherence_score": 0.95,
    "mode": "anthropic",
    "cost_usd": 0.0023,
    "processing_time_ms": 1250
  },
  "proof": {
    "hash": "sha256:ghi789...",
    "timestamp": "2025-01-02T14:20:00Z",
    "anchor_id": null
  },
  "verification_method": "LLM_Synthesis"
}
```

**Notes:**
- API keys are never logged, stored, or exposed
- Keys exist only in memory for the duration of the request
- `require_validation` validates the generated resolution (recommended)

---

### POST `/ask`

Ask a general question (not for paradox resolution). **BYOK TIER** - Requires API key.

This endpoint is for normal Q&A. For paradox resolution, use `/synthesize`.

**Headers:**
- `X-Anthropic-Key`: Your Anthropic API key (optional)
- `X-OpenAI-Key`: Your OpenAI API key (optional)
- `X-Prefer-Local`: Set to "true" for Ollama (optional)
- `X-Ollama-Model`: Specify Ollama model (optional)
- `X-Anthropic-Model`: Specify Anthropic model (optional)
- `X-OpenAI-Model`: Specify OpenAI model (optional)

**Request:**
```json
{
  "question": "How does stratified coherence resolve paradoxes?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "Stratified coherence resolves paradoxes by...",
  "provider": "anthropic",
  "model": "claude-3-5-sonnet-20241022",
  "input_tokens": 45,
  "output_tokens": 230,
  "estimated_cost_usd": 0.0015,
  "processing_time_ms": 890,
  "timestamp": "2025-01-02T14:20:00Z"
}
```

---

## Smart Processing Endpoints

### POST `/classify`

Classify input text to determine the best processing route. **FREE TIER** - No LLM required.

**Request:**
```json
{
  "text": "The Liar Paradox: This statement is false"
}
```

**Response:**
```json
{
  "type": "paradox",
  "confidence": 0.92,
  "recommended_endpoint": "/synthesize",
  "reasoning": "Detected self-referential structure with negation pattern",
  "detected_features": ["self_reference", "negation", "truth_predicate"],
  "scores": {
    "formal_logic": 0.3,
    "paradox": 0.92,
    "general_question": 0.1
  }
}
```

**Types:**
- `formal_logic`: Use `/verify`
- `paradox`: Use `/synthesize`
- `general_question`: Use `/ask`
- `unknown`: Cannot determine

---

### POST `/smart`

Smart processing: automatically classify and route input to the best handler. **DYNAMIC TIER** - May be free (verify) or require LLM (synthesize/ask).

This endpoint:
1. Analyzes your input to determine its type
2. Routes to `/verify` (formal logic), `/synthesize` (paradox), or `/ask` (general)
3. Returns unified response with routing information

**Headers:**
- `X-Anthropic-Key`: Your Anthropic API key (optional, needed for synthesis/ask)
- `X-OpenAI-Key`: Your OpenAI API key (optional)
- `X-Prefer-Local`: Set to "true" for Ollama (optional)
- `X-Ollama-Model`: Specify Ollama model (optional)

**Request:**
```json
{
  "text": "The Liar Paradox: This statement is false"
}
```

**Response:**
```json
{
  "classification": {
    "type": "paradox",
    "confidence": 0.92,
    "recommended_endpoint": "/synthesize"
  },
  "success": true,
  "response": {
    "resolution": "...",
    "validated": true
  },
  "endpoint_used": "/synthesize",
  "error": null,
  "fallback": null
}
```

---

### GET `/classify/stats`

Get statistics on input classifications. **FREE TIER** - No authentication required.

**Response:**
```json
{
  "total_classifications": 1523,
  "type_distribution": {
    "formal_logic": 450,
    "paradox": 623,
    "general_question": 400,
    "unknown": 50
  },
  "low_confidence_count": 23,
  "feature_frequencies": {
    "self_reference": 589,
    "negation": 456,
    "truth_predicate": 623
  },
  "average_confidence_by_type": {
    "formal_logic": 0.87,
    "paradox": 0.91,
    "general_question": 0.82
  }
}
```

---

### POST `/classify/feedback`

Submit feedback on a classification for learning. **FREE TIER** - No authentication required.

**Request:**
```json
{
  "classification_id": "class_abc123",
  "correct_type": "paradox"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback recorded"
}
```

**Correct Types:**
- `formal_logic`
- `paradox`
- `general_question`

---

## V2 Endpoints

### GET `/v2/usage`

Get usage statistics for the authenticated user. Requires RapidAPI key.

**Headers:**
- `X-RapidAPI-Key`: Your RapidAPI key (required)

**Response:**
```json
{
  "principal": "rapidapi-user-hash",
  "usage": {
    "requests_today": 42,
    "limit": null
  },
  "tier": "pro"
}
```

---

## Examples Endpoint

### GET `/examples`

Get example inputs for each endpoint. **FREE TIER** - No authentication required.

Returns example inputs showing how to use each endpoint, making it easier for new users to get started.

**Response:**
```json
{
  "description": "Example inputs for GPM-SC API endpoints",
  "endpoints": {
    "/verify/natural": {
      "description": "Verify statements in plain English (easiest, no formal logic required)",
      "examples": [
        {
          "input": {"statement": "If it's raining, then it's raining"},
          "expected": "Valid tautology - always true"
        },
        {
          "input": {"statement": "This statement is false"},
          "expected": "Liar Paradox detected"
        }
      ]
    },
    "/verify": {
      "description": "Verify formal logic propositions (requires FAL notation)",
      "examples": [...]
    },
    "/synthesize": {
      "description": "Paradox resolution using LLM (requires API key)",
      "examples": [...]
    }
  }
}
```

**Use Cases:**
- Learning how to use the API
- Understanding input formats
- Finding the right endpoint for your use case
- Copy-paste examples for testing

---

## Models Endpoint

### GET `/models`

List available models (local Ollama and cloud providers).

**Response:**
```json
{
  "local": {
    "ollama": ["llama2", "mistral"],
    "available": true
  },
  "cloud": {
    "anthropic": ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229"],
    "openai": ["gpt-4", "gpt-3.5-turbo"],
    "requires_keys": true
  }
}
```

**Notes:**
- Local Ollama models require Ollama to be running
- Cloud models require API keys to check availability

---

## Security Endpoint

### GET `/security.txt` or `/.well-known/security.txt`

Security disclosure endpoint (RFC 9116).

Provides contact information for security researchers to report vulnerabilities.

**Response:**
```
Contact: security@example.com
Expires: 2026-12-31T23:59:59Z
Preferred-Languages: en
```

---

## Error Responses

All endpoints return standard HTTP status codes:

- **200 OK**: Request successful
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Invalid or missing API key (for BYOK endpoints)
- **402 Payment Required**: LLM feature requires API key
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

**Error Format:**
```json
{
  "detail": "Error message here"
}
```

---

## Rate Limits

| Tier | Verification | Synthesis | Classification |
|------|-------------|-----------|----------------|
| **Free** | 10/min | N/A | 100/min |
| **Developer** | 100/min | BYOK | 500/min |
| **Pro** | 1000/min | BYOK | 1000/min |
| **Enterprise** | Custom | BYOK | Custom |

Rate limits are per API key (RapidAPI key or principal ID).

---

## Examples

### Python

```python
import requests

# Free verification
response = requests.post(
    "https://gpmsc-api.onrender.com/verify",
    json={"proposition": "p → p"},
    headers={
        "X-RapidAPI-Key": "YOUR_KEY",
        "X-RapidAPI-Host": "gpmsc-api.onrender.com"
    }
)
print(response.json())

# BYOK synthesis
response = requests.post(
    "https://gpmsc-api.onrender.com/synthesize",
    json={"paradox": "The Liar Paradox: This statement is false"},
    headers={
        "X-RapidAPI-Key": "YOUR_KEY",
        "X-RapidAPI-Host": "gpmsc-api.onrender.com",
        "X-Anthropic-Key": "YOUR_ANTHROPIC_KEY"
    }
)
print(response.json())
```

### JavaScript

```javascript
const axios = require('axios');

// Free verification
const response = await axios.post(
    'https://gpmsc-api.onrender.com/verify',
    { proposition: 'p → p' },
    {
        headers: {
            'X-RapidAPI-Key': 'YOUR_KEY',
            'X-RapidAPI-Host': 'gpmsc-api.onrender.com'
        }
    }
);
console.log(response.data);
```

### cURL

```bash
# Free verification
curl -X POST https://gpmsc-api.onrender.com/verify \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: gpmsc-api.onrender.com" \
  -H "Content-Type: application/json" \
  -d '{"proposition": "p → p"}'

# BYOK synthesis
curl -X POST https://gpmsc-api.onrender.com/synthesize \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: gpmsc-api.onrender.com" \
  -H "X-Anthropic-Key: YOUR_ANTHROPIC_KEY" \
  -H "Content-Type: application/json" \
  -d '{"paradox": "The Liar Paradox: This statement is false"}'
```

---

## Interactive Documentation

Visit `https://gpmsc-api.onrender.com/docs` for interactive Swagger/OpenAPI documentation.

---

## Support

- **RapidAPI**: [API Listing](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/)
- **Reselling Guide**: [RESELLING.md](RESELLING.md)
- **Examples**: See [examples/](examples/) directory

---

## License

Documentation is MIT licensed. The GPM-SC service and infrastructure are proprietary.

