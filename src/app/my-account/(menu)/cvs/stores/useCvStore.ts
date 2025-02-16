import { UserCV } from "@prisma/client";
import { create } from "zustand";

interface CvStoreState {
    cvs: UserCV[] | [] ;
    setCVs: (cv: UserCV[]) => void;
    resetCV: () => void;
}

export const useCvStore = create<CvStoreState>((set) => ({
    cvs: [],
    setCVs: (cvs) => set({ cvs }),
    resetCV: () => set({ cvs: [] }),
}))