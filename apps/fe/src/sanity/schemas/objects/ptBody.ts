import CustomPTEditor from "@/sanity/lib/CustomPTEditor";
import { getCustomBody } from "../../helpers/getCustomBody";
import { codeSnippet } from "./codeSnippet";
import { imageBlock } from "./image";
import { quoteBlock } from "./quoteBlock";
import { ptTable } from "./table";
import { twitterEmbed } from "./twitterEmbed";
import { youtubeVideo } from "./youtubeVideo";

const ptBlocks = [
  // muxVideoWithCaption,
  youtubeVideo,
  imageBlock,
  twitterEmbed,
  codeSnippet,
  quoteBlock,
  ptTable,
];

export const ptBody = {
  name: "ptBody",
  title: "Rich Text with blocks",
  ...getCustomBody({
    styles: true,
    lists: true,
    blockTypes: [...ptBlocks /*collapsible */].map((block) => block.name),
  }),
  components: {
    input: CustomPTEditor,
  },
};

export const ptBodyCollapsible = {
  name: "ptBodyCollapsible",
  title: "Rich Text with blocks without collapsible",
  ...getCustomBody({
    styles: true,
    lists: true,
    blockTypes: ptBlocks.map((block) => block.name),
  }),
  components: {
    input: CustomPTEditor,
  },
};
