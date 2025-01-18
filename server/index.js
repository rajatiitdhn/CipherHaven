const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const app = express();
const port = 5000;

app.use(cors());  // Enable CORS for all origins

app.use(bodyParser.json());

// Helper function to check deprecated algorithms and key lengths
const validateConfiguration = (config) => {
  const issues = [];

  // Check for deprecated hash function
  if (config.hashFunction === 'SHA1') {
    issues.push('SHA1 is deprecated. Consider transitioning to SHA256 or SHA3.');
  }

  // Check for weak RSA key length
  if (config.rsaKeySize < 2048) {
    issues.push('RSA Key size is too small. Use at least 2048 bits.');
  }

  // Check for deprecated TLS protocols
  if (config.tlsVersion === 'TLS 1.0' || config.tlsVersion === 'TLS 1.1') {
    issues.push('TLS 1.0 and TLS 1.1 are deprecated. Use TLS 1.2 or TLS 1.3.');
  }

  // Check for weak cipher suites
  if (config.cipherSuite === 'RC4-SHA') {
    issues.push('RC4-SHA is a weak cipher suite. Consider using AES256-GCM or AES128-GCM.');
  }

  // Add key length recommendations
  if (config.aesKeySize < 256) {
    issues.push('AES key size is too small. Use at least 256 bits.');
  }

  return issues;
};

app.post('/validate', (req, res) => {
  const { config } = req.body;
  const issues = validateConfiguration(config);

  if (issues.length > 0) {
    res.status(400).json({ status: 'error', issues });
  } else {
    res.status(200).json({ status: 'success', message: 'Configuration is secure!' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
