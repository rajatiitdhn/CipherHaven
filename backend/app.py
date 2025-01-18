from flask import Flask, request, jsonify
from decimal import Decimal, getcontext
from primeNo import is_prime
from smalle import smalle
from weiner import weinerattack

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze_rsa():
    """
    Analyze RSA vulnerabilities based on input data (n, e, c).
    """
    data = request.get_json()
    
    # Extract parameters
    n = data.get("n")
    e = data.get("e")
    c = data.get("c")

    # Validate inputs
    try:
        n = int(n)
        e = int(e)
        c = int(c)
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid input. Ensure n, e, and c are integers."}), 400

    # Initialize results
    results = {
        "attacks": {
            "factorization": None,
            "weiner": None,
            "smalle": None,
        },
        "summary": [],
    }

    # Factorization Attack
    try:
        if is_prime(n):
            results["attacks"]["factorization"] = "Not vulnerable (n is a prime number)."
        else:
            factors = factorize(n)
            if factors:
                results["attacks"]["factorization"] = f"Vulnerable. Factors: {factors}."
                results["summary"].append("Factorization attack successful.")
            else:
                results["attacks"]["factorization"] = "Not vulnerable (no factors found)."
    except Exception as ex:
        results["attacks"]["factorization"] = f"Error during factorization: {str(ex)}."

    # Weiner's Attack
    try:
        success, d, plaintext = weinerattack(e, n, c)
        if success:
            results["attacks"]["weiner"] = {
                "success": True,
                "private_key": d,
                "plaintext": plaintext,
            }
            results["summary"].append("Weiner's attack successful.")
        else:
            results["attacks"]["weiner"] = {"success": False, "details": "Not vulnerable."}
    except Exception as ex:
        results["attacks"]["weiner"] = {"error": f"Error during Weiner's attack: {str(ex)}."}

    # Small e Attack
    try:
        flag = smalle(c)
        if flag:
            results["attacks"]["smalle"] = {
                "success": True,
                "plaintext": flag,
            }
            results["summary"].append("Small e attack successful.")
        else:
            results["attacks"]["smalle"] = {"success": False, "details": "Not vulnerable."}
    except Exception as ex:
        results["attacks"]["smalle"] = {"error": f"Error during small e attack: {str(ex)}."}

    # Return results
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
