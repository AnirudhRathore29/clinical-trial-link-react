import CryptoJS from 'crypto-js';

export const Encryption = (data) => {
  console.log("Encryption called");
  var Sha256 = CryptoJS.SHA256;
  var Hex = CryptoJS.enc.Hex;
  var Utf8 = CryptoJS.enc.Utf8;
  var Base64 = CryptoJS.enc.Base64;
  var AES = CryptoJS.AES;

  var secret_key = process.env.REACT_APP_SECRET_KEY;
  var secret_iv = process.env.REACT_APP_SECRET_IV;

  var key = Sha256(secret_key).toString(Hex).substr(0, 32);
  var iv = Sha256(secret_iv).toString(Hex).substr(0, 16);

  // Encryption
  var output = AES.encrypt(JSON.stringify(data), Utf8.parse(key), {
    iv: Utf8.parse(iv),
  }).toString();

  var output2ndB64 = Utf8.parse(output).toString(Base64);
  console.log("Encryption data", data);
  console.log("encryptedData", output2ndB64); // MWNjdVlVL1hBWGN2UFlpMG9yMGZBUT09
  return output2ndB64
}