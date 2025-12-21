import { create } from "zustand";
export const useTreeStructureStore = create((set) => ({
    treeStructure: null,
    projectId: null,

    setProjectId: (projectId) =>
        set({ projectId }),

    setTreeStructure: (treeStructure) =>
        set({ treeStructure }),

    resetTree: () =>
        set({ treeStructure: null }),

    clearAll: () =>
        set({ treeStructure: null, projectId: null }),
}));