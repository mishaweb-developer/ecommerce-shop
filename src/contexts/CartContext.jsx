import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* TASK-06
TODO: Implementiraj Cart state, add, remove, update, clear, total i ukupnu količinu.
HINT: Koristi React Context i useState; localStorage dolazi u TASK-07.
RULE: cartQuantity je zbir quantity vrednosti svih stavki, a Cart radi i za gosta.
*/
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function addToCart(newItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          item.productId === newItem.productId && item.size === newItem.size,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === newItem.productId && item.size === newItem.size
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
              }
            : item,
        );
      }

      return [...currentCart, newItem];
    });
  }

  function removeFromCart(productId, size) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  }

  function updateQuantity(productId, size, quantity) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId && item.size === size
          ? {
              ...item,
              quantity: quantity < 1 ? 1 : quantity,
            }
          : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartQuantity,
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCart must be used inside CartProvider");
  return context;
}
