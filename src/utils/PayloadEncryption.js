import CryptoJS from 'crypto-js';

export const Encryption = (data) => {
  var Sha256 = CryptoJS.SHA256;
  var Hex = CryptoJS.enc.Hex;
  var Utf8 = CryptoJS.enc.Utf8;
  var Base64 = CryptoJS.enc.Base64;
  var AES = CryptoJS.AES;
  
  var secret_key = process.env.REACT_APP_SECRET_KEY;
  var secret_iv = process.env.REACT_APP_SECRET_IV;
  
  var key = Sha256(secret_key).toString(Hex).substr(0, 32); // Use the first 32 bytes (see 2.)
  var iv = Sha256(secret_iv).toString(Hex).substr(0, 16);
  
  // Encryption
  var output = AES.encrypt(JSON.stringify(data), Utf8.parse(key), {
    iv: Utf8.parse(iv),
  }).toString(); // First Base64 encoding, by default (see 1.)
  
  var output2ndB64 = Utf8.parse(output).toString(Base64); // Second Base64 encoding (see 1.)
  console.log("Encryption data", data);
  console.log("encryptedData", output2ndB64); // MWNjdVlVL1hBWGN2UFlpMG9yMGZBUT09
  return {body: output2ndB64}
}