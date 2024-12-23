import { PlayIcon } from "@sanity/icons";
import { muxVideo } from "./muxVideo";

export const muxVideoWithCaption = {
  type: "object",
  name: "muxVideoWithCaption",
  title: "Video",
  fields: [
    ...muxVideo.fields,
    {
      type: "string",
      name: "caption",
      title: "Caption",
    },
  ],
  preview: {
    select: {
      title: "caption",
    },
    prepare(selection: { title: string }) {
      const { title } = selection;
      return {
        title: title,
        media: PlayIcon,
      };
    },
  },
};
