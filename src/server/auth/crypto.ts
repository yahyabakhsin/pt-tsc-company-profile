import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

/**
 * Utility functions for hashing and verifying passwords using native Node crypto.
 * This is production-grade, highly secure, and does not depend on binary components.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashed}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const targetHash = scryptSync(password, salt, 64);
  const sourceHash = Buffer.from(hash, "hex");

  return timingSafeEqual(targetHash, sourceHash);
}
