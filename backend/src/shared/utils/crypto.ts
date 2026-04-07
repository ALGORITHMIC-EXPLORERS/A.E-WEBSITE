import crypto from "crypto";

const SCRYPT_KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`scrypt:${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const [algorithm, salt, hash] = storedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      const providedHash = Buffer.from(derivedKey.toString("hex"), "hex");
      const expectedHash = Buffer.from(hash, "hex");

      if (providedHash.length !== expectedHash.length) {
        resolve(false);
        return;
      }

      resolve(crypto.timingSafeEqual(providedHash, expectedHash));
    });
  });
}

export function hashOpaqueToken(token: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

export function generateOpaqueToken(size = 48): string {
  return crypto.randomBytes(size).toString("base64url");
}
