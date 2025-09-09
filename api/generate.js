const bip39 = require('bip39');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    // Generate 256 bits of entropy
    const entropy = crypto.randomBytes(32);
    
    // Convert to mnemonic
    const mnemonic = bip39.entropyToMnemonic(entropy);
    
    // Validate the mnemonic
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Generated invalid mnemonic');
    }
    
    // Return the mnemonic
    res.status(200).json({
      success: true,
      mnemonic: mnemonic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
