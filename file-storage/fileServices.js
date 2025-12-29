import * as fs from "fs/promises";
import path from "path";

const STORAGE_DIR = "./file-storage/storage";

async function initStorage() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
}

async function saveFile(filename, content) {
  const filePath = path.join(STORAGE_DIR, filename);
  await fs.writeFile(filePath, content);
}

async function readFile(filename) {
  const filePath = path.join(STORAGE_DIR, filename);
  return await fs.readFile(filePath, "utf-8");
}

export { initStorage, saveFile, readFile };
