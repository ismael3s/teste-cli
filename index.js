#!/usr/bin/env bun
import { exec, spawnSync } from "child_process";
import {
  createReadStream,
  createWriteStream,
  existsSync,
  writeFileSync
} from "fs";
import { readFile } from "fs/promises";
import { cwd } from "process";
import { pipeline } from "stream/promises";
import { promisify } from "util";
console.log("Hello via Bun!");

function shadcnComponentFileExists() {
  return existsSync("components.json");
}

if (!shadcnComponentFileExists()) {
  throw new Error("Está CLI depende do shadcn-ui para funcionar.");
}

const { aliases } = JSON.parse(await readFile("components.json", "utf-8"));
const componentsFolder = `${aliases.components}/ui/`;
const utilsFolder = aliases.utils;

// const testeStream = new TransformStream({
//   readableType: "utf-8",
//   transform(chunk, controller) {
//     if (chunk.includes("import { cn }")) {
//       chunk = chunk.replace(
//         "import { cn }",
//         `import { cn } from "${utilsFolder}"`
//       );
//     }
//     controller.enqueue(chunk);
//   }
// });

await pipeline(
  createReadStream("./src/components/input.tsx"),
  // testeStream,
  createWriteStream(`${componentsFolder}/input-teste.tsx`)
);
