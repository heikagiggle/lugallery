'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useFetchAllCartItems } from '@/app/hooks/users/cart/get-all-cart';
import { useAddToCart } from '@/app/hooks/users/cart/add-cart';
import { useUpdateCartQuantity } from '@/app/hooks/users/cart/update-cart';
import { useRemoveFromCart } from '@/app/hooks/users/cart/remove-cart';
import { useClearCart } from '@/app/hooks/users/cart/clear-cart';
import { toast } from 'react-hot-toast';

type CartContextType = {
  cartItems: any[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addItemToCart: (productId: string) => Promise<void>;
  updateQuantity: (
    cartItemId: string,
    action: 'increase' | 'decrease'
  ) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, mutate } = useFetchAllCartItems();
  const { handleAddToCart } = useAddToCart();
  const { handleUpdateQuantity } = useUpdateCartQuantity();
  const { handleRemoveFromCart } = useRemoveFromCart();
  const { handleClearCart } = useClearCart();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (data?.products) {
      setCartItems(data.products);
      setCartCount(data.products.reduce((acc, item) => acc + item.quantity, 0));
      setCartTotal(data.cart_total || 0);
    }
  }, [data]);

  // 🔁 Recalculate totals when cartItems changes
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
    setCartTotal(total);

    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const refreshCart = async () => {
    try {
      await mutate();
    } catch {
      toast.error('Failed to refresh cart');
    }
  };

  const addItemToCart = async (productId: string) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === productId
    );

    if (existingItem) {
      await handleUpdateQuantity(existingItem.id, 'increase');
    } else {
      await handleAddToCart({
        items: [{ product_id: productId, quantity: 1, variation: [] }],
      });
    }

    await refreshCart();
  };

  const updateQuantity = async (
    cartItemId: string,
    action: 'increase' | 'decrease'
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const newQuantity = Math.max(
            1,
            item.quantity + (action === 'increase' ? 1 : -1)
          );
          const newTotalPrice = (item.price || 0) * newQuantity;
          return { ...item, quantity: newQuantity, total_price: newTotalPrice };
        }
        return item;
      })
    );

    setCartCount((prev) =>
      action === 'increase' ? prev + 1 : Math.max(prev - 1, 0)
    );

    try {
      await handleUpdateQuantity(cartItemId, action);
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId: string) => {
    await handleRemoveFromCart(cartItemId);

    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    setCartCount((prev) => prev - 1);
  };

  const clearCart = async () => {
    await handleClearCart();
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        refreshCart,
        addItemToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCartContext must be used within a CartProvider');
  return context;
};
