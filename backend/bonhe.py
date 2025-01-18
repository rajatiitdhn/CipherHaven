import ciphey

# Initialize Ciphey's decryption object
cipher = ciphey.Ciphey()

def search_hash_using_ciphey(input_string):
    # Try decrypting using Ciphey's automatic decryption
    decrypted_message = cipher.decrypt(input_string)
    
    if decrypted_message['success']:
        print(f"Decrypted message: {decrypted_message['text']}")
        return decrypted_message['text']
    else:
        print("Failed to decrypt the input.")
        return None

# Example usage:
input_string = "U2FsdGVkX1+BTVODuVpdqH7hP9z/5mFzFhYmimxL4lI="  # Example encrypted text
decrypted = search_hash_using_ciphey(input_string)

if decrypted:
    print(f"Decrypted hash: {decrypted}")
else:
    print("No decryption possible.")
