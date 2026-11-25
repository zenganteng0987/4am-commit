import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";
const MAX_LENGTH = 200;

function buildCommitMessage(): string {
  const parts = [
    "fix: the bug was mine,",
    "the fix is mine,",
    "the 4am is also mine \u2014",
    "merging before I review my own work",
  ];
  return parts.join(" ");
}

function validateMessage(message: string): void {
  if (message.length < 1 || message.length > MAX_LENGTH) {
    throw new Error(
      `commit message must be 1-${MAX_LENGTH} characters, got ${message.length}`,
    );
  }
  if (message.includes("\n") || message.includes("\r")) {
    throw new Error("commit message must be a single line");
  }
}

function writeEntry(message: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, message + "\n", "utf8");
}

const message = buildCommitMessage();
validateMessage(message);
writeEntry(message);
console.log(message);
