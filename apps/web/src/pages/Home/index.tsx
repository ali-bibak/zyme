import { useState } from "react";
import Blocknote from "../../components/Blocknote";
import {
  generateBlockNotes,
  groupBlockNotesFlat,
} from "../../utils/generateMarkdownFiles";

const notes = generateBlockNotes();
const groupedNotesFlat = groupBlockNotesFlat(notes);
function Home() {
  const [markdownFiles] = useState(groupedNotesFlat);

  return (
    <div className="text-white min-h-screen w-full flex items-center justify-center">
      <Blocknote items={markdownFiles} />
    </div>
  );
}
export default Home;
