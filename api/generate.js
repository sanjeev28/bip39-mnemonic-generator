const bip39 = require('bip39');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 1;
    
    // Increased limit to 5000
    if (count > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Maximum count is 5000'
      });
    }
    
    const mnemonics = [];
    
    for (let i = 0; i < count; i++) {
      // Generate 256 bits of entropy
      const entropy = crypto.randomBytes(32);
      
      // Convert to mnemonic
      const mnemonic = bip39.entropyToMnemonic(entropy);
      
      // Validate the mnemonic
      if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Generated invalid mnemonic');
      }
      
      mnemonics.push(mnemonic);
    }
    
    // Return the mnemonics
    res.status(200).json({
      success: true,
      mnemonics: mnemonics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
