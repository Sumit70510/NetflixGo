import { create } from 'zustand';

export const ContentStore = create((set) => ({
    contentType:'Movie',
    setContentType:(type) => set({ contentType:type }),  
}))
