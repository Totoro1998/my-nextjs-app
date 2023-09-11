// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const Theme = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
};

const useSettingStore = create(
  persist(
    (set, get) => ({
      config: {
        mode: Theme.LIGHT,
      },
      changeConfig(property, value) {
        set({
          config: {
            ...get().config,
            [property]: value,
          },
        });
      },
    }),
    {
      name: "guru-store",
    }
  )
);

export { Theme };

export default useSettingStore;
