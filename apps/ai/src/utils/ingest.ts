// Services
import GithubClient from "../services/Github";

export async function getRepoIngest(url: string) {
  const repoUrl = url;
  const client = new GithubClient(repoUrl);
  let content = "";
  try {
    const data = await client.prepareIngest();
    data.forEach(
      ({
        filePath,
        promptFriendlyContent,
      }: { filePath: string; promptFriendlyContent: string }) => {
        content += promptFriendlyContent;
      },
    );
    return { data, content };
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
}
