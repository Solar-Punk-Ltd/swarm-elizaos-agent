import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { logger } from "@elizaos/core";

// Helper function to check if a file exists
function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

// Helper function to check if a directory exists
function directoryExists(dirPath: string): boolean {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

describe("Project Structure Validation", () => {
  const rootDir = path.resolve(__dirname, "../..");

  describe("Directory Structure", () => {
    it("should have the expected directory structure", () => {
      expect(directoryExists(path.join(rootDir, "src"))).toBe(true);
      expect(directoryExists(path.join(rootDir, "src", "__tests__"))).toBe(
        true
      );
    });
  });

  describe("Source Files", () => {
    it("should contain the required source files", () => {
      expect(fileExists(path.join(rootDir, "src", "index.ts"))).toBe(true);
      expect(fileExists(path.join(rootDir, "src", "plugin.ts"))).toBe(true);
    });

    it("should have properly structured main files", () => {
      // Check index.ts contains character definition
      const indexContent = fs.readFileSync(
        path.join(rootDir, "src", "index.ts"),
        "utf8"
      );
      expect(indexContent).toContain("character");
      expect(indexContent).toContain("plugin");

      // Check plugin.ts contains plugin definition
      const pluginContent = fs.readFileSync(
        path.join(rootDir, "src", "plugin.ts"),
        "utf8"
      );
      expect(pluginContent).toContain("export default");
      expect(pluginContent).toContain("actions");
    });
  });

  describe("Configuration Files", () => {
    it("should have proper TypeScript configuration", () => {
      const tsConfig = JSON.parse(
        fs.readFileSync(path.join(rootDir, "tsconfig.json"), "utf8")
      );

      // Check essential compiler options
      expect(tsConfig).toHaveProperty("compilerOptions");
      expect(tsConfig.compilerOptions).toHaveProperty("target");
      expect(tsConfig.compilerOptions).toHaveProperty("module");

      // Check paths inclusion
      expect(tsConfig).toHaveProperty("include");
    });
  });

  describe("Build Output", () => {
    it("should check for expected build output structure", () => {
      // Instead of checking specific files, check that the dist directory exists
      // and contains at least some files
      if (directoryExists(path.join(rootDir, "dist"))) {
        const files = fs.readdirSync(path.join(rootDir, "dist"));
        expect(files.length).toBeGreaterThan(0);

        // Check for common output patterns rather than specific files
        const hasJsFiles = files.some((file) => file.endsWith(".js"));
        expect(hasJsFiles).toBe(true);
      } else {
        // Skip test if dist directory doesn't exist yet
        logger.warn("Dist directory not found, skipping build output tests");
      }
    });
  });

  describe("Documentation", () => {
    it("should have README files", () => {
      expect(fileExists(path.join(rootDir, "README.md"))).toBe(true);
    });

    it("should have appropriate documentation content", () => {
      const readmeContent = fs.readFileSync(
        path.join(rootDir, "README.md"),
        "utf8"
      );
      expect(readmeContent).toContain("Project Starter");

      // Testing key sections exist without requiring specific keywords
      expect(readmeContent).toContain("Development");
      expect(readmeContent).toContain("Testing");
    });
  });
});

