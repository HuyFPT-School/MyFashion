import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
  incrementWishlist: () => void;
  decrementWishlist: () => void;
}

const useWishlist = create(
  persist<WishlistStore>(
    (set) => ({
      wishlistCount: 0,
      setWishlistCount: (count: number) => set({ wishlistCount: count }),
      incrementWishlist: () =>
        set((state) => ({ wishlistCount: state.wishlistCount + 1 })),
      decrementWishlist: () =>
        set((state) => ({
          wishlistCount: Math.max(0, state.wishlistCount - 1),
        })),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlist;
