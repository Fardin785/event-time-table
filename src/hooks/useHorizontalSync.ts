import * as React from "react";

export function useHorizontalTransformSync() {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const headerInnerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const grid = gridRef.current;
    const headerInner = headerInnerRef.current;
    if (!grid || !headerInner) return;

    const onScroll = () => {
      headerInner.style.transform = `translateX(${-grid.scrollLeft}px)`;
    };

    grid.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial sync

    return () => grid.removeEventListener("scroll", onScroll);
  }, []);

  return { gridRef, headerInnerRef };
}
