import {create} from "zustand";
import {
    TerrariumImageControllerApi,
    TerrariumLayerControllerApi,
    type TerrariumLayerDTO
} from "@/shared/api";

const imageApi = new TerrariumImageControllerApi();
const layerApi = new TerrariumLayerControllerApi();

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
    layerType?:string;
}

interface CanvasStore {
    objects: TerrariumObject[];
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
    setObjects: (objects: TerrariumObject[]) => void;
    addObject: (obj: TerrariumObject) => void;
    saveCanvas: (terrariumId:number) => Promise<void>;
    loadCanvas: (terrariumId:number) => void;
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
    saveCanvas: async (terrariumId: number) => {
        const { objects } = get();

        for (const o of objects) {
            if (o.type !== "image") continue;
            if (!o.url || !o.sysName) continue;

            // 1) 이미지 기록 저장
            await imageApi.saveImage({
                terrariumId,
                oriName: o.oriName,
                sysName: o.sysName,
                url: o.url,
            });

            // 2) 레이어 편집 상태 저장
            const layerPayload: TerrariumLayerDTO = {
                id: Number(o.id),
                terrariumId,
                layerType: "image",
                url: o.url,
                x: o.x,
                y: o.y,
                width: o.width,
                height: o.height,
                rotation: o.rotation ?? 0,
                zindex: o.zIndex ?? 0,
            };

            await layerApi.saveLayer(layerPayload);
        }
    },
    loadCanvas: async (terrariumId: number) => {
        try {
            const response = await layerApi.getLayers({ params: { terrariumId } });
            const layers = response.data;

            const objects: TerrariumObject[] = layers.map(layer => ({
                id: String(layer.id ?? crypto.randomUUID()), // id 없으면 대체값
                x: layer.x ?? 0,
                y: layer.y ?? 0,
                width: layer.width ?? 100,
                height: layer.height ?? 100,
                rotation: layer.rotation ?? 0,
                zIndex: layer.zindex ?? 0,
                type: "image",
                url: layer.url ?? undefined,
                oriName: layer.oriName ?? undefined,
                sysName: layer.sysName ?? undefined,
            }));

            set({ objects });
        } catch (err) {
            console.error("레이어 로드 실패:", err);
        }
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