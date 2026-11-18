import fs from "node:fs";
import path from "node:path";

// parse target version from cli args or semver bump keyword
const args = process.argv.slice(2);
const input = args[0]?.trim();

if (!input) {
  console.error("Usage: bun run bump-version <new-version | patch | minor | major>");
  process.exit(1);
}

const rootDir = process.cwd();

function readJson(relPath: string) {
  const fullPath = path.join(rootDir, relPath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

function writeJson(relPath: string, data: unknown) {
  const fullPath = path.join(rootDir, relPath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

const rootPkg = readJson("package.json");
const clientPkg = readJson("apps/client/package.json");
const currentVersion = rootPkg.version || clientPkg.version || "0.1.0";

function computeNextVersion(current: string, bumpType: string): string {
  const parts = current.split(".").map((n) => Number.parseInt(n, 10));
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid semver version: ${current}`);
  }

  let [major, minor, patch] = parts;
  if (bumpType === "patch") {
    patch += 1;
  } else if (bumpType === "minor") {
    minor += 1;
    patch = 0;
  } else if (bumpType === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (/^\d+\.\d+\.\d+/.test(bumpType)) {
    return bumpType;
  } else {
    throw new Error(`Unrecognized version or bump type: ${bumpType}`);
  }

  return `${major}.${minor}.${patch}`;
}

const targetVersion = computeNextVersion(currentVersion, input);
console.log(`Bumping version from ${currentVersion} -> ${targetVersion}...\n`);

const touchedFiles: string[] = [];

// 1. root package.json
rootPkg.version = targetVersion;
writeJson("package.json", rootPkg);
touchedFiles.push("package.json");

// 2. apps/client/package.json
clientPkg.version = targetVersion;
writeJson("apps/client/package.json", clientPkg);
touchedFiles.push("apps/client/package.json");

// 3. packages/ui/package.json
const uiPkg = readJson("packages/ui/package.json");
uiPkg.version = targetVersion;
writeJson("packages/ui/package.json", uiPkg);
touchedFiles.push("packages/ui/package.json");

// 4. packages/ui/src/settings.ts
const settingsPath = path.join(rootDir, "packages/ui/src/settings.ts");
let settingsContent = fs.readFileSync(settingsPath, "utf-8");
settingsContent = settingsContent.replace(
  /export const APP_VERSION = ".*?";/,
  `export const APP_VERSION = "${targetVersion}";`,
);
fs.writeFileSync(settingsPath, settingsContent, "utf-8");
touchedFiles.push("packages/ui/src/settings.ts");

// 5. mygo.config.ts
const mygoConfigPath = path.join(rootDir, "mygo.config.ts");
let mygoConfigContent = fs.readFileSync(mygoConfigPath, "utf-8");
mygoConfigContent = mygoConfigContent.replace(/version:\s*".*?",/, `version: "${targetVersion}",`);
fs.writeFileSync(mygoConfigPath, mygoConfigContent, "utf-8");
touchedFiles.push("mygo.config.ts");

// 6. CHANGELOG.md
const changelogPath = path.join(rootDir, "CHANGELOG.md");
if (fs.existsSync(changelogPath)) {
  let changelogContent = fs.readFileSync(changelogPath, "utf-8");
  if (!changelogContent.includes(`## [${targetVersion}]`)) {
    const today = new Date().toISOString().slice(0, 10);
    const newSection = `## [${targetVersion}] - ${today}\n\n### Changed\n- Version bump to ${targetVersion}\n\n`;
    changelogContent = changelogContent.replace(/(## \[\d+\.\d+\.\d+\])/, `${newSection}$1`);
    fs.writeFileSync(changelogPath, changelogContent, "utf-8");
    touchedFiles.push("CHANGELOG.md");
  }
}

console.log(`Updated ${touchedFiles.length} files:`);
for (const file of touchedFiles) {
  console.log(`  - ${file}`);
}
console.log(`\nVersion bumped to ${targetVersion}. Run 'bun install' to update the lockfile.`);
