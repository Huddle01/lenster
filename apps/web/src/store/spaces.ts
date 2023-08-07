import { create } from 'zustand';

interface SpacesState {
  showSpacesLobby: boolean;
  setShowSpacesLobby: (showSpacesLobby: boolean) => void;
  showSpacesWindow: boolean;
  setShowSpacesWindow: (showSpacesWindow: boolean) => void;
  lensAccessToken: string;
  setLensAccessToken: (lensAccessToken: string) => void;
  space: {
    id: string;
    host: string;
    title: string;
  };
  setSpace: (space: { id: string; host: string; title: string }) => void;
}

export const useSpacesStore = create<SpacesState>((set) => ({
  showSpacesLobby: false,
  setShowSpacesLobby: (showSpacesLobby) => set(() => ({ showSpacesLobby })),
  showSpacesWindow: false,
  setShowSpacesWindow: (showSpacesWindow) => set(() => ({ showSpacesWindow })),
  lensAccessToken: '',
  setLensAccessToken: (lensAccessToken) => set(() => ({ lensAccessToken })),
  space: {
    id: '',
    host: '',
    title: ''
  },
  setSpace: (space) => set(() => ({ space }))
}));
