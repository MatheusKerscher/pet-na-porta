import type { CartProduct } from "../types/cart";

const LS_CART_KEY = "@PET_NA_PORTA_CART";

const saveCart = (cartProducts: CartProduct[]) => {
  localStorage.setItem(LS_CART_KEY, JSON.stringify(cartProducts));
};

const getCart = (): CartProduct[] => {
  const cart = localStorage.getItem(LS_CART_KEY);

  if (cart) {
    return JSON.parse(cart);
  }

  return [];
};

const deleteCart = () => {
  localStorage.removeItem(LS_CART_KEY);
};

export { saveCart, getCart, deleteCart };
