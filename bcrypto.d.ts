declare module 'bcrypto' {
    export function randomBytes(size: number): Buffer;
    export function createCipheriv(algorithm: string, key: Buffer, iv: Buffer): Cipher;
    export function createDecipheriv(algorithm: string, key: Buffer, iv: Buffer): Decipher;
  
    interface Cipher {
      update(data: Buffer): Buffer;
      final(): Buffer;
    }
  
    interface Decipher {
      update(data: Buffer): Buffer;
      final(): Buffer;
    }
  }
  