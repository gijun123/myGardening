import {create} from "zustand";

export type PanelType = "images"|"icons"|"myDesigns"|null;

export interface PanelItem{
    id: number | string;
    url: string;
    name?:string;
}

interface PanelStore{
    panelType:PanelType;
    items:PanelItem[];
    isOpen:boolean;

    setPanelType:(type:PanelType)=>void;
    setItems:(items:PanelItem[])=>void;

    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const usePanelStore = create<PanelStore>((set, get) => ({
    panelType: null,
    items: [],
    isOpen: false,

    setPanelType: (type) => set({ panelType: type }),
    setItems: (items) => set({ items }),

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen }),
}));