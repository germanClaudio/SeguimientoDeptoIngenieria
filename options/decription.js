const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

const ENCRYPTION_KEY=process.env.ENCRYPTION_KEY
const ENCODED_FILE_PATH=process.env.ENCODED_FILE_PATH
const algorithm = 'aes-256-ctr';
const encryptionKey = Buffer.from(ENCRYPTION_KEY, 'hex');

// Función para descifrar datos
function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    // console.log('3-decryted: ', decrypted.toString('utf8'))
    return decrypted.toString('utf8');
  }

  
  // Función para leer el archivo JSON codificado
  function readEncodedFile(filePath) {
      const encodedData = fs.readFileSync(filePath, 'utf8');
      const decodedData = decrypt(encodedData);
      return JSON.parse(decodedData);
    }

    const encodedFilePath = ENCODED_FILE_PATH;
    const credentials = readEncodedFile(encodedFilePath);

    // console.log('credentials: ', credentials)
    return credentials