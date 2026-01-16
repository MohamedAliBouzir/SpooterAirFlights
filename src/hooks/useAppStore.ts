import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    mode: 'light' | 'dark';
    isFullScreen: boolean;
    language: string;
    toggleMode: () => void;
    toggleFullScreen: () => void;
    setLanguage: (lang: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            mode: 'dark',
            isFullScreen: false,
            language: 'en',
            toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
            toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
            setLanguage: (lang: string) => set({ language: lang }),
        }),
        {
            name: 'spooter-app-state',
        }
    )
);
