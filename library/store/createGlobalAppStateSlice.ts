import { immer } from "zustand/middleware/immer";

type State = {
  appActive: boolean;
  userAddress: string;
  userName: string;
  userAvatarURL: string;
  modalStep: {
    status: string;
  }[];
  txHashes: {
    [key: string]: string;
  };
};

type Actions = {
  setAppActive: (isActive: boolean) => void;
  setUserAddress: (address: string) => void;
  setUserName: (name: string) => void;
  setUserAvatarURL: (avatarURL: string) => void;
  setModalStep: (modalStep: { status: string }[]) => void;
  setModalStepIndex: (index: number, item: { status: string }) => void;
  setTransactionHashes: (txHashes: { [key: string]: string }) => void;
};

export default immer<State & Actions>((set, get) => ({
  appActive: false,
  userAddress: "",
  userName: "",
  userAvatarURL: "",
  modalStep: [],
  txHashes: {},

  setAppActive: (isActive) =>
    set((state) => {
      state.appActive = isActive;
    }),

  setUserAddress: (address) =>
    set((state) => {
      state.userAddress = address;
    }),

  setUserName: (name) =>
    set((state) => {
      state.userName = name;
    }),

  setUserAvatarURL: (avatarURL) =>
    set((state) => {
      state.userAvatarURL = avatarURL;
    }),

  setModalStep: (modalStep) =>
    set((state) => {
      state.modalStep = modalStep;
    }),

  setModalStepIndex: (index, item) => {
    const newSteps = [...get().modalStep];
    newSteps[index] = item;

    set((state) => {
      state.modalStep = newSteps;
    });
  },

  setTransactionHashes: (txHashes) =>
    set((state) => {
      state.txHashes = txHashes;
    }),
}));
