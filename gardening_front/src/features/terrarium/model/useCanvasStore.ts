import { useState } from "react";

export interface TerrariumObject {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: "background" | "object" | "image";
    fill?: string;
    url?: string;
}

export function useCanvasStore() {
    const [objects, setObjects] = useState<TerrariumObject[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const addObject = (obj: TerrariumObject) => setObjects(prev => [...prev, obj]);

    const saveCanvas = () => {
        localStorage.setItem("terrarium-canvas", JSON.stringify(objects));
    };

    const loadCanvas = () => {
        const json = localStorage.getItem("terrarium-canvas");
        if (!json) return;
        setObjects(JSON.parse(json));
    };

    return { objects, selectedId, setSelectedId, addObject, saveCanvas, loadCanvas };
}