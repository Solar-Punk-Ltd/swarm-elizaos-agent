import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { $ } from "bun";
import { getViteOutDir } from "./vite-config-utils";

describe("Build Order Integration Test", () => {
  const rootDir = path.resolve(__dirname, "../..");
  const distDir = path.join(rootDir, "dist");
  let viteBuildDir: string;
  const tsupBuildMarker = path.join(distDir, "index.js"); // TSup creates this

  beforeAll(async () => {
    // Get the actual vite build directory from config
    const viteOutDirRelative = await getViteOutDir(rootDir);
    viteBuildDir = path.join(rootDir, viteOutDirRelative);

    // Clean dist directory before test
    if (fs.existsSync(distDir)) {
      await fs.promises.rm(distDir, { recursive: true, force: true });
    }
  });

  afterAll(async () => {
    // Clean up after test
    if (fs.existsSync(distDir)) {
      await fs.promises.rm(distDir, { recursive: true, force: true });
    }
  });
});

