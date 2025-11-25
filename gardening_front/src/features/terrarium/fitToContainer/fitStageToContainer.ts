import { useEffect, useState } from "react";

export function useFitStage(containerRef: React.RefObject<HTMLDivElement | null>) {
    const [size, setSize] = useState({ width: 800, height: 600 });

    useEffect(() => {
        function fit() {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        }

        fit();
        window.addEventListener("resize", fit);
        return () => window.removeEventListener("resize", fit);
    }, [containerRef]);

    return size;
}