import { execSync } from "child_process";
import fs from "fs";
import path from "path";

type FileContent = { [filePath: string]: string };
type PreparedData = { filePath: string; promptFriendlyContent: string };

export default class GitHubClient {
  private repoUrl: string;
  private cloneBaseDir: string;
  private cloneDir: string;

  constructor(repoUrl: string, cloneBaseDir: string = "./cloned_repo") {
    this.repoUrl = repoUrl;
    this.cloneBaseDir = cloneBaseDir;
    this.cloneDir = this.getCloneDirFromUrl();
  }

  private getCloneDirFromUrl(): string {
    const urlPath = new URL(this.repoUrl).pathname
      .replace(/^\//, "")
      .replace(/\/$/, "")
      .replace(/\//g, "-");
    return path.join(this.cloneBaseDir, urlPath);
  }

  cloneRepo(): void {
    /** Clones the repository to a structured directory based on its URL. */
    if (fs.existsSync(this.cloneDir)) {
      console.log(
        `Repository already exists at ${this.cloneDir}. Skipping clone.`,
      );
    } else {
      console.log(`Cloning repository into ${this.cloneDir}...`);
      execSync(`git clone ${this.repoUrl} ${this.cloneDir}`, {
        stdio: "inherit",
      });
    }
  }

  extractFiles(
    extensions: string[] = [".md", ".txt", ".js", ".html", ".css"],
  ): FileContent {
    /** Extracts content from files in the cloned repository. */
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

  summarizeFile(content: string, maxLength: number = 512): string {
    /** Summarizes file content to fit within the LLM-friendly limit. */
    const lines = content.split("\n");
    const summary: string[] = [];
    let currentLength = 0;

    for (const line of lines) {
      const strippedLine = line.trim();
      if (strippedLine && !strippedLine.startsWith("#")) {
        currentLength += strippedLine.length;
        if (currentLength > maxLength) {
          break;
        }
        summary.push(strippedLine);
      }
    }

    return summary.join("\n");
  }

  prepareIngest(): PreparedData[] {
    /** Prepares repository content for LLM ingestion. */
    this.cloneRepo();
    const files = this.extractFiles();
    const preparedData: PreparedData[] = [];

    for (const [filePath, content] of Object.entries(files)) {
      const summary = this.summarizeFile(content);
      const promptFriendlyContent = `File: ${filePath}\n\n${summary}`;
      preparedData.push({ filePath, promptFriendlyContent });
    }

    return preparedData;
  }
}
