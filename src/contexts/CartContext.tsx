import { createContext, ReactNode, useContext, useState } from "react";
import Cart from "../components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuatity: (id: number) => void;
  decreaseItemQuatity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

type CartItem = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems?.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuatity(id: number) {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuatity(id: number) {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuatity,
        decreaseItemQuatity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
      <Cart />
    </CartContext.Provider>
  );
}
