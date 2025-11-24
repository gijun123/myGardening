import {create} from "zustand";

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

interface CanvasStore {
    objects: TerrariumObject[];
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    setObjects: (objects: TerrariumObject[]) => void;
    addObject: (obj: TerrariumObject) => void;
    saveCanvas: () => void;
    loadCanvas: () => void;
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
    objects: [],
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
    setObjects: (objects) => set({ objects }),
    addObject: (obj) => set({ objects: [...get().objects, obj] }),

    saveCanvas: () => {
        localStorage.setItem("terrarium-canvas", JSON.stringify(get().objects));
    },

    loadCanvas: () => {
        const json = localStorage.getItem("terrarium-canvas");
        if (!json) return;
        set({ objects: JSON.parse(json) });
    },
}));