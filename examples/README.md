# ProofPlay Examples

Code samples for integrating with the ProofPlay API.

## Verification Examples

These examples show how to perform client-side verification of game draws.

| File | Language | Description |
|------|----------|-------------|
| [verify_python.py](verify_python.py) | Python | Full verification with requests library |
| [verify_javascript.js](verify_javascript.js) | JavaScript | Browser/Node.js compatible with Web Crypto API |

### Running the Python example

```bash
pip install requests
python verify_python.py 077c56e6
```

### Running the JavaScript example (Node.js 18+)

```bash
node verify_javascript.js 077c56e6
```

### Running in browser

```html
<script src="verify_javascript.js"></script>
<script>
  verifyGame('077c56e6').then(passed => {
    console.log('Verification passed:', passed);
  });
</script>
```

## What the verification checks

1. **Hash verification:** `SHA256(seed) === seed_hash`
2. **Number derivation:** Reconstructs the available numbers list and verifies the drawn number matches the algorithm

## Web Verifier

For a visual verification experience, use our [Web Verifier](https://verification-logic-demo.vercel.app).
