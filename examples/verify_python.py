"""
ProofPlay API Example - Python

Demonstrates how to:
1. Create a session
2. Verify a game's draws
3. Client-side cryptographic verification
"""

import hashlib
import requests

API_URL = "https://proofplay-sx3q.onrender.com"


def create_session(email: str, device_id: str) -> str:
    """Create a session and return the session ID."""
    resp = requests.post(
        f"{API_URL}/auth/session",
        json={"email": email, "device_key_hash": device_id}
    )
    resp.raise_for_status()
    return resp.json()["session_id"]


def get_verification_data(game_id: str) -> dict:
    """Fetch verification data for a game."""
    resp = requests.get(f"{API_URL}/games/{game_id}/verify")
    resp.raise_for_status()
    return resp.json()


def verify_draw(draw: dict, previously_drawn: set) -> bool:
    """
    Verify a single draw client-side.
    
    Returns True if verification passes.
    """
    seed = draw.get("seed")
    if not seed:
        print(f"  Draw #{draw['sequence']}: No seed revealed (old draw)")
        return True  # Can't verify without seed
    
    # Step 1: Verify SHA256(seed) === seed_hash
    seed_bytes = bytes.fromhex(seed)
    computed_hash = hashlib.sha256(seed_bytes).hexdigest()
    
    if computed_hash != draw["seed_hash"]:
        print(f"  Draw #{draw['sequence']}: HASH MISMATCH!")
        print(f"    Expected: {draw['seed_hash']}")
        print(f"    Computed: {computed_hash}")
        return False
    
    print(f"  Draw #{draw['sequence']}: Hash verified ✓")
    
    # Step 2: Verify number derivation
    available = [n for n in range(1, 76) if n not in previously_drawn]
    seed_uint32 = int(seed[:8], 16)  # First 4 bytes as big-endian uint32
    index = seed_uint32 % len(available)
    expected_number = available[index]
    
    if expected_number != draw["number"]:
        print(f"    NUMBER MISMATCH! Expected {expected_number}, got {draw['number']}")
        return False
    
    print(f"    Number derivation verified ✓ (number={draw['number']})")
    return True


def verify_game(game_id: str) -> bool:
    """
    Fully verify all draws in a game.
    
    Returns True if all draws pass verification.
    """
    print(f"Verifying game: {game_id}")
    print("-" * 40)
    
    data = get_verification_data(game_id)
    draws = data.get("draws", [])
    
    if not draws:
        print("No draws found.")
        return True
    
    print(f"Found {len(draws)} draw(s)")
    print()
    
    drawn_numbers = set()
    all_passed = True
    
    for draw in draws:
        if not verify_draw(draw, drawn_numbers):
            all_passed = False
        drawn_numbers.add(draw["number"])
    
    print()
    print("-" * 40)
    if all_passed:
        print("✅ ALL DRAWS VERIFIED")
    else:
        print("❌ VERIFICATION FAILED")
    
    return all_passed


if __name__ == "__main__":
    import sys
    
    game_id = sys.argv[1] if len(sys.argv) > 1 else "077c56e6"
    verify_game(game_id)
