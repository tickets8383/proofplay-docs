# ProofPlay Documentation

ProofPlay is **verifiable decision infrastructure**: deterministic rule/logic verification + tamper-evident audit trails + **RFC 3161 TSA timestamp anchoring** so a third party can re-verify what was decided, when, and that it wasn’t modified.

**Live Compliance Demo (recommended starting point):**  
- Demo UI: https://verification-logic-demo.vercel.app/  
- Shows: rule verification, Mermaid logic graph, audit IDs + integrity check, TSA evidence fields, and **PDF evidence export** (affidavit/attestation report).

---

## What you can do with ProofPlay

### ✅ Verify rules before deployment
- Check policies/rules for contradictions and edge cases using **Z3 (SMT)**.
- Supports strict formal logic (∧ ∨ ¬ →) and a deterministic “Business Mode” translator.

### ✅ Produce verifiable evidence for audits and disputes
- Every verification/decision can generate:
  - a durable **audit record ID**
  - **hash-chained integrity verification**
  - **RFC 3161 TSA timestamp token evidence**
- One-click **PDF “Affidavit / Attestation Report”** export from the demo UI, including:
  - audit ID, PASS/FAIL, TSA timestamp details, logic text, and a **forensic snapshot** of the Mermaid logic graph.

### ✅ Re-verify later (don’t trust us—verify)
- Audit stream + integrity endpoint lets anyone check tamper evidence after the fact.

---

## Products

### 🧾 ProofPlay Compliance Demo (Verifiable Decisions)
A web demo that shows the end-to-end "decision → audit → integrity → evidence PDF" workflow.

- **Demo UI:** https://verification-logic-demo.vercel.app/
- **API (GPM-SC backend):** https://gpmsc-api.onrender.com

**Demo highlights**
- Mermaid **logic flowchart/graph** rendering from expressions
- Deterministic "Business Mode" preprocessing:
  - jargon dictionary + structure normalization ("X if Y" → "if Y then X")
  - shows `normalized_statement` + `transforms_applied` for auditability
- Live **Audit Stream** + click-to-verify
- `📄 Download Affidavit` button exports a PDF evidence package

---

### 🎮 ProofPlay Bingo (Live iOS app + provably fair draws)
Provably fair bingo built on the same audit infrastructure: **commit-before-reveal** randomness with external timestamp anchoring.

- **iOS app:** https://apps.apple.com/us/app/proofplay/id6756788981
- **API:** https://proofplay-sx3q.onrender.com
- **Web Verifier:** https://proofplay-one.vercel.app
- **Docs:** `API.md`
- **Examples:** `examples/`

---

### 🧠 GPM-SC Reasoning Verifier (API)
A reasoning/verification API used by the compliance demo.

- **API:** https://gpmsc-api.onrender.com
- **Docs:** `GPM-SC_API.md`
- **RapidAPI listing:** gpm-sc-reasoning-verifier
- **Reselling:** `RESELLING.md`

---

## Quick Start

### 1) Formal verification (strict logic)
```bash
curl -X POST https://gpmsc-api.onrender.com/verify \
  -H "Content-Type: application/json" \
  -d '{"proposition": "(p ∧ q) → p"}'
````

### 2) Business Mode (deterministic natural language preprocessing)

```bash
curl -X POST https://gpmsc-api.onrender.com/verify/natural \
  -H "Content-Type: application/json" \
  -d '{"statement":"Coverage is denied if fraud is detected."}'
```

### 3) Audit endpoints (recent + integrity)

```bash
curl "https://gpmsc-api.onrender.com/audit/recent?limit=10"
curl "https://gpmsc-api.onrender.com/audit/<AUDIT_ID>/integrity"
```

---

## Why this matters (where it fits)

ProofPlay is most useful when decisions are regulated or contested and you need to prove:

* the rule set was logically consistent at the time,
* the decision record wasn’t modified later,
* and there’s externally anchored timestamp evidence.

Example domains:

* insurance & benefits adjudication
* fintech eligibility / underwriting rules
* healthcare approvals
* gaming compliance / provable fairness
* internal audit / governance workflows

---

## Documentation Index

### ProofPlay Bingo

* `API.md` — API reference
* `examples/` — integration samples

### GPM-SC Reasoning Verifier

* `GPM-SC_API.md` — API reference
* `RESELLING.md` — integration/reselling notes

---

## Contact

* [tickets8383@icloud.com](mailto:tickets8383@icloud.com)

---

## License

Documentation is MIT licensed. ProofPlay and GPM-SC services/infrastructure are proprietary.
