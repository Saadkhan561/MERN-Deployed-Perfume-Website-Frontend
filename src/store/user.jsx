import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      isLoading: true,
      _hasHydrated: false,
      addUserInfo: (newUserInfo) =>
        set(() => ({ currentUser: newUserInfo, isLoading: false })),
      deleteUserInfo: () =>
        set(() => ({ currentUser: null, isLoading: false })),
      addUserAddress: (addressObj) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            user: {
              ...state.currentUser?.user,
              address: addressObj.address,
              city: addressObj.city,
            },
          },
        })),
      setHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "current-user",
      onRehydrateStorage: () => (state) => {
        state.setHydrated(); // Mark as hydrated
      },
    }
  )
);

export default useUserStore;
