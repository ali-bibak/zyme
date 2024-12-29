import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import React from "react";
import { useEffect, useState } from "react";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";

import cx from "clsx";

export interface BlockNote {
  id: string;
  title: string;
  content: string;
  checked: boolean;
  estimatedTime: number;
  level: number;
  children?: BlockNote[]; // Include children in the interface
}

export default function LazyBlockNote({ item }: { item: BlockNote }) {
  const {
    content: markdown,
    title,
    estimatedTime,
    level,
    children = [],
    checked,
  } = item;
  const editor = useCreateBlockNote();
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false); // Default collapsed for level 1

  useEffect(() => {
    async function loadMarkdown() {
      const blocks = await editor.tryParseMarkdownToBlocks(markdown.trim());
      editor.replaceBlocks(editor.document, blocks);
      setIsLoading(false);
    }

    loadMarkdown();
  }, [editor, markdown]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const headingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements; // Ensure it doesn't exceed h6
  const headingClassName = `text-${
    level === 1 ? "3xl" : level === 2 ? "xl" : "lg"
  } font-semibold flex items-center py-1`;

  return (
    <div className={`relative my-4 pl-${level * 4}`}>
      <div>
        <div className={cx("py-2", level === 1 ? "custom-border-bottom" : "")}>
          <div className="flex center center">
            <div className="flex items-center space-x-2">
              {checked ? (
                <GoCheckCircleFill className="fill-primary-green bg-red" />
              ) : (
                <GoCheckCircle />
              )}
              {React.createElement(
                headingTag,
                {
                  onClick: toggleCollapse,
                  className: headingClassName,
                },
                title,
              )}
            </div>
          </div>
          {level === 1 && (
            <p className="text-gray-500 italic">
              Estimated Time: {estimatedTime} minutes
            </p>
          )}
        </div>

        <div
          className={cx(
            "overflow-hidden",
            isCollapsed ? "max-h-0" : "max-h-screen",
          )}
        >
          {!isLoading && (
            <div className="mt-2">
              <BlockNoteView editor={editor} editable={false} />
            </div>
          )}
        </div>
      </div>

      {/* Render children recursively */}
      {!isCollapsed && (
        <div className="px-2">
          {children.map((child) => (
            <LazyBlockNote key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}
