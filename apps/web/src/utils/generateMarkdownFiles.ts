import { faker } from "@faker-js/faker";

export interface BlockNote {
  id: string;
  title: string;
  content: string;
  checked: boolean;
  estimatedTime: number;
  level: number;
}

export function generateBlockNotes(): BlockNote[] {
  const notes: BlockNote[] = [];
  const createNote = (level: number, parentId: string | null): BlockNote => ({
    id: faker.string.ulid(),
    title: `${parentId ? `${parentId}.` : ""}${level !== 1 ? level : ""} ${faker.lorem.words(3)}`,
    content: faker.lorem.paragraphs(
      faker.number.int({ min: 1, max: 3 }),
      "\n\n",
    ),
    checked: faker.datatype.boolean(),
    estimatedTime: faker.number.int({ min: 10, max: 100 }),
    level,
  });

  for (let i = 1; i <= 10; i++) {
    const level1 = createNote(1, null);
    notes.push(level1);

    for (let j = 1; j <= 3; j++) {
      const level2 = createNote(2, `${i}`);
      notes.push(level2);

      for (let k = 1; k <= 2; k++) {
        const level3 = createNote(3, `${i}.${j}`);
        notes.push(level3);

        for (let l = 1; l <= 2; l++) {
          const level4 = createNote(4, `${i}.${j}.${k}`);
          notes.push(level4);
        }
      }
    }
  }

  return notes;
}

export function groupBlockNotesFlat(blockNotes: BlockNote[]): any[] {
  const grouped = blockNotes.reduce((acc, note) => {
    if (note.level === 1) {
      acc[note.id] = { ...note, children: [] };
    } else {
      const parentId = findParentId(note, blockNotes);
      if (parentId && acc[parentId]) {
        acc[parentId].children.push(note);
      }
    }
    return acc;
  }, {});

  return Object.values(grouped);
}

function findParentId(note: BlockNote, blockNotes: BlockNote[]): string | null {
  for (let i = blockNotes.indexOf(note) - 1; i >= 0; i--) {
    if (blockNotes[i].level === note.level - 1) {
      return blockNotes[i].id;
    }
  }
  return null;
}
