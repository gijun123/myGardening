import {create} from "zustand";
import {TerrariumImageControllerApi} from "@/shared/api";

const imageApi = new TerrariumImageControllerApi();

export interface TerrariumObject {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: "background" | "object" | "image";
    fill?: string;
    url?: string;
    rotation?:number;
    zIndex?:number;
    sysName?:string;
    oriName?:string;
}

interface CanvasStore {
    objects: TerrariumObject[];
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    setObjects: (objects: TerrariumObject[]) => void;
    addObject: (obj: TerrariumObject) => void;
    saveCanvas: (terrariumId:number) => Promise<void>;
    loadCanvas: () => void;
    moveForward: (id: string) => void;
    moveBackward: (id: string) => void;
    deleteObject: (id: string) => void;
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
    objects: [],
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
    setObjects: (objects) => set({ objects }),
    addObject: (obj) => set({ objects: [...get().objects, obj] }),
    saveCanvas: async(terrariumId:number)=>{
        const{objects}=get();
        const imageObjects = objects.filter(o => o.type === "image");
        for (const obj of imageObjects) {
            if (!obj.url || !obj.oriName || !obj.sysName) continue;

            try {
                await imageApi.uploadImage(terrariumId);
            } catch (err) {
                console.error("이미지 저장 실패:", err);
            }
        }
    },
    loadCanvas: () => {
        const json = localStorage.getItem("terrarium-canvas");
        if (!json) return;
        set({ objects: JSON.parse(json) });
    },
    moveForward: (id: string) => {
        set((state) => {
            const index = state.objects.findIndex(o => o.id === id);
            if (index === -1 || index === state.objects.length - 1) return state;
            const newArr = [...state.objects];
            [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
            return { objects: newArr };
        });
    },
    moveBackward: (id: string) => {
        set((state) => {
            const index = state.objects.findIndex(o => o.id === id);
            if (index <= 0) return state;
            const newArr = [...state.objects];
            [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
            return { objects: newArr };
        });
    },
    deleteObject: (id: string) => {
        set((state) => ({
            objects: state.objects.filter(o => o.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        }));
    }
}));