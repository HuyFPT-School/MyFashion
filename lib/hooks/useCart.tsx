import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (IdToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

// Lưu trữ các store instances
const stores = new Map<string, ReturnType<typeof createCartStore>>();

// Tạo function để tạo store với clerkId
const createCartStore = (clerkId: string) => {
  return create(
    persist<CartStore>(
      (set, get) => ({
        cartItems: [],
        addItem: (data: CartItem) => {
          const { item, quantity, color, size } = data;
          const currentItems = get().cartItems;
          const isExisting = currentItems.find(
            (cartItem) =>
              cartItem.item._id === item._id &&
              cartItem.color === color &&
              cartItem.size === size
          );
          if (isExisting) {
            const newCartItems = currentItems.map((cartItem) =>
              cartItem.item._id === item._id &&
              cartItem.color === color &&
              cartItem.size === size
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            );
            set({ cartItems: newCartItems });
            toast.success("Item quantity increased", { icon: "🛒" });
          } else {
            set({ cartItems: [...currentItems, { item, quantity, color, size }] });
            toast.success("Item added to cart", { icon: "🛒" });
          }
        },
        removeItem: (idToRemove: string) => {
          const newCartItems = get().cartItems.filter(
            (cartItem) => cartItem.item._id !== idToRemove
          );
          set({ cartItems: newCartItems });
          toast.success("Item removed from cart");
        },
        increaseQuantity: (idToIncrease: string) => {
          const newCartItems = get().cartItems.map((cartItem) =>
            cartItem.item._id === idToIncrease
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          set({ cartItems: newCartItems });
          toast.success("Item quantity increased");
        },
        decreaseQuantity: (idToDecrease: string) => {
          const newCartItems = get().cartItems.map((cartItem) =>
            cartItem.item._id === idToDecrease
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
          set({ cartItems: newCartItems });
          toast.success("Item quantity decreased");
        },
        clearCart: () => set({ cartItems: [] }),
      }),
      { 
        name: `cart-storage-${clerkId}`,
        storage: createJSONStorage(() => localStorage) 
      }
    )
  );
};

// Hook để sử dụng cart
const useCart = () => {
  const { user } = useUser();
  const clerkId = user?.id || "guest";
  
  // Lấy hoặc tạo store instance duy nhất cho clerkId
  const store = useMemo(() => {
    if (!stores.has(clerkId)) {
      stores.set(clerkId, createCartStore(clerkId));
    }
    return stores.get(clerkId)!;
  }, [clerkId]);
  
  return store();
};

export default useCart;