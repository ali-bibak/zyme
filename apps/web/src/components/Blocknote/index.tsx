import { useEffect, useRef, useState } from "react";
import LazyBlockNote, { type BlockNote } from "./LazyBlockNote";

export default function Blocknote({
  items,
}: {
  items: Record<string, any>;
}) {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute("data-item-id");
            if (itemId && !visibleItems.includes(itemId)) {
              setVisibleItems((prev) => [...prev, itemId]);
            }
          }
        });
      },
      { root: containerRef.current, rootMargin: "200px", threshold: 0.1 },
    );

    if (containerRef.current) {
      const children = containerRef.current.children;
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, [visibleItems]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-auto flex flex-col items-center"
    >
      {items.map((item: BlockNote) => (
        <div key={item.id} data-item-id={item.id} className="my-3 w-[800px]">
          {visibleItems.includes(item.id) ? (
            <>
              <LazyBlockNote item={item} />
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
