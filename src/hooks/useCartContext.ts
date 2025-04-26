import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import type { ActionProps, ReducerCartProduct } from "../types/reducer";
import toast from "react-hot-toast";

const createCartProductAction = (product: ReducerCartProduct): ActionProps => ({
  type: "ADD_PRODUCT",
  payload: {
    newProduct: product,
  },
});

const addCartProductAction = (productId: number): ActionProps => ({
  type: "UPDATE_PRODUCT",
  payload: {
    productId: productId,
    productQuantityAction: "INCREASE",
  },
});

const removeCartProductAction = (productId: number): ActionProps => ({
  type: "UPDATE_PRODUCT",
  payload: {
    productId: productId,
    productQuantityAction: "DECREASE",
  },
});

const deleteCartProductAction = (productId: number): ActionProps => ({
  type: "DELETE_PRODUCT",
  payload: {
    productId: productId,
  },
});

const deleteCarAction = (): ActionProps => ({
  type: "DELETE_CART"
});

const useCartContext = () => {
  const { cartProducts, cartAmount, cartTotalValue, dispatch } =
    useContext(CartContext);

  const addCartProduct = (product: ReducerCartProduct) => {
    dispatch(createCartProductAction(product));
    toast.success(`Produto adicionado ao carrinho`);
  };

  const increaseCartProduct = (productId: number) => {
    dispatch(addCartProductAction(productId));
  };

  const decreaseCartProduct = (productId: number) => {
    dispatch(removeCartProductAction(productId));
  };

  const deleteCartProduct = (productId: number) => {
    dispatch(deleteCartProductAction(productId));
    toast.success("Produto removido do carrinho");
  };

  const deleteCart = () => {
    dispatch(deleteCarAction())
  }

  return {
    cartProducts,
    cartAmount,
    cartTotalValue,
    addCartProduct,
    increaseCartProduct,
    decreaseCartProduct,
    deleteCartProduct,
    deleteCart
  };
};

export default useCartContext;
