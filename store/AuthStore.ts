import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserInfoType = {
  access: string
  first_name: string
  last_name: string
  profile_image: string
  refresh: string
};

type AuthStoreType = {
  userInfo: UserInfoType | null;
  setUserInfo: (user: UserInfoType) => void;
  clearUserInfo: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "auth-store", // key in localStorage
    }
  )
);

