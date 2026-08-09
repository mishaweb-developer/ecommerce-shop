import { createContext,useContext } from 'react';
const CartContext=createContext(undefined);
export function CartProvider({children}){/* TASK-06
TODO: Implementiraj Cart state, add, remove, update, clear, total i ukupnu količinu.
HINT: Koristi React Context i useState; localStorage dolazi u TASK-07.
RULE: cartQuantity je zbir quantity vrednosti svih stavki, a Cart radi i za gosta.
*/const value={cart:[],addToCart:()=>{},removeFromCart:()=>{},updateQuantity:()=>{},clearCart:()=>{},cartTotal:0,cartQuantity:0};return <CartContext.Provider value={value}>{children}</CartContext.Provider>}
export function useCart(){const context=useContext(CartContext);if(context===undefined)throw new Error('useCart must be used inside CartProvider');return context}
