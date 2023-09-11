// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import request from "@/lib/request";

const useUserStore = create(
  persist(
    (set, get) => ({
      userInfo: null,
      fetchUserInfo: async () => {
        try {
          const response = await request.get({
            url: "/api/account/user_info",
          });
          set({ userInfo: response.data.data });
          return response.data.data;
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      },
      updateUserInfo(data) {
        set({
          userInfo: {
            ...get().userInfo,
            ...data,
          },
        });
      },
      clearUserInfo: () => {
        set({ userInfo: null });
      },
    }),
    {
      name: "guru-store",
    }
  )
);

export default useUserStore;
