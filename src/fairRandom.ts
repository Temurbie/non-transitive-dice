import crypto from 'crypto';

export function generateSecretKey(): Buffer {
  return crypto.randomBytes(32); //
}

export function generateFairRandomInt(maxExclusive: number): { key: Buffer, number: number, hmac: string } {
  const key = generateSecretKey();
  const number = crypto.randomInt(0, maxExclusive);
  const hmac = crypto.createHmac('sha3-256', key).update(number.toString()).digest('hex');

  return { key, number, hmac };
}

export function verifyHMAC(key: Buffer, message: string, hmac: string): boolean {
  const computedHmac = crypto.createHmac('sha3-256', key).update(message).digest('hex');
  return computedHmac === hmac;
}
