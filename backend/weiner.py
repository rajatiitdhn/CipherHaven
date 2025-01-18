import owiener
from Crypto.Util.number import long_to_bytes

def weinerattack(e, n, c):
    d = owiener.attack(e, n)
    success = False
    plaintext = ""
    
    if d:
        try:
            m = pow(c, d, n)
            plaintext = long_to_bytes(m).decode('utf-8')  # Ensure utf-8 decoding
            success = True
        except Exception as ex:
            plaintext = f"Error during decoding: {ex}"
            success = False
    else:
        plaintext = "Wiener's attack failed"
        success = False
        
    return success, d, plaintext
