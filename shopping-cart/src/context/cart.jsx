import { createContext } from "react";
import { UseCartReducer } from "../hooks/useCartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { cart, addToCart, removeFromCart, clearCart } = UseCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
