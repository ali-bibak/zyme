import { execSync } from "child_process";
import fs from "fs";
import path from "path";

type FileContent = { [filePath: string]: string };
type PreparedData = { filePath: string; promptFriendlyContent: string };

function noop() {}

export default class GitHubClient {
  private repoUrl: string;
  private cloneBaseDir: string;
  private cloneDir: string;

  constructor(repoUrl: string, cloneBaseDir: string = "./cloned_repo") {
    this.repoUrl = repoUrl;
    this.cloneBaseDir = cloneBaseDir;
    this.cloneDir = this._getCloneDirFromUrl();
  }

  private _getCloneDirFromUrl(): string {
    const urlPath = new URL(this.repoUrl).pathname
      .replace(/^\//, "")
      .replace(/\/$/, "")
      .replace(/\//g, "-");
    return path.join(this.cloneBaseDir, urlPath);
  }

  _clone(): void {
    if (fs.existsSync(this.cloneDir)) {
      noop();
    } else {
      execSync(`git clone ${this.repoUrl} ${this.cloneDir}`, {
        stdio: "inherit",
      });
    }
  }

  _extractFiles(
    extensions: string[] = [".md", ".txt", ".js", ".html", ".css"],
  ): FileContent {
    const fileContents: FileContent = {};
    const walkDir = (dir: string): void => {
      fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          walkDir(fullPath);
        } else if (extensions.some((ext) => file.endsWith(ext))) {
          const content = fs.readFileSync(fullPath, "utf-8");
          fileContents[fullPath] = content;
        }
      });
    };

    walkDir(this.cloneDir);
    return fileContents;
  }

  _strippedFile(content: string, maxLength: number = 512): string {
    const lines = content.split("\n");
    const files: string[] = [];
    let currentLength = 0;
    for (const line of lines) {
      const strippedLine = line.trim();
      if (strippedLine && !strippedLine.startsWith("#")) {
        currentLength += strippedLine.length;
        if (currentLength > maxLength) {
          break;
        }
        files.push(strippedLine);
      }
    }

    return files.join("\n");
  }

  prepareIngest(): PreparedData[] {
    this._clone();
    const files = this._extractFiles();
    const preparedData: PreparedData[] = [];
    for (const [filePath, content] of Object.entries(files)) {
      const strippedFile = this._strippedFile(content);
      const promptFriendlyContent = `File: ${filePath}\n\n${strippedFile}`;
      preparedData.push({ filePath, promptFriendlyContent });
    }

    return preparedData;
  }
}
