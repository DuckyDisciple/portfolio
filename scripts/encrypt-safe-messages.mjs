#!/usr/bin/env node
/**
 * Encrypt messages for /safe (same algorithm as the browser decrypt in safe/index.astro).
 *
 * Usage:
 *   PASSPHRASE='your gate passphrase' node scripts/encrypt-safe-messages.mjs "First message" "Second"
 *
 * Or pipe one message per line:
 *   printf '%s\n' "Line one" | PASSPHRASE='...' node scripts/encrypt-safe-messages.mjs
 *
 * Paste the printed `export const ENCRYPTED_SAFE_MESSAGES = [...]` into src/lib/safe-messages.ts.
 * Do not commit PASSPHRASE or plaintext.
 */
import { randomBytes, pbkdf2Sync, createCipheriv } from 'node:crypto';
import { readFileSync } from 'node:fs';

const PBKDF2_ITERATIONS = 100_000;

const passphrase = process.env.PASSPHRASE;
if (!passphrase || !passphrase.length) {
  console.error('Set PASSPHRASE in the environment to the same string used for the /safe gate.');
  process.exit(1);
}

let messages = process.argv.slice(2).filter(Boolean);
if (!messages.length) {
  try {
    const stdin = readFileSync(0, 'utf8');
    messages = stdin
      .split('\n')
      .map((l) => l.replace(/\r$/, ''))
      .filter((l) => l.length > 0);
  } catch {
    messages = [];
  }
}

if (!messages.length) {
  console.error('Provide messages as arguments or stdin (one per line).');
  process.exit(1);
}

function encryptOne(plaintext) {
  const salt = randomBytes(16);
  const key = pbkdf2Sync(passphrase, salt, PBKDF2_ITERATIONS, 32, 'sha256');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const ct = Buffer.concat([enc, tag]);
  return {
    v: 1,
    iter: PBKDF2_ITERATIONS,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
  };
}

const blobs = messages.map(encryptOne);
const lines = blobs.map(
  (o) => `  '${Buffer.from(JSON.stringify(o), 'utf8').toString('base64')}',`,
);

console.log(`/** Generated with scripts/encrypt-safe-messages.mjs. Do not edit ciphertext by hand. */
export const ENCRYPTED_SAFE_MESSAGES: string[] = [
${lines.join('\n')}
];
`);
