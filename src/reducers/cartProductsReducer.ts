import type { CartProduct } from "../types/cart";
import toBrazilianCurrency from "../utils/toBrazilianCurrency";
import type { ActionProps, ReducerCartProduct } from "../types/reducer";
import { deleteCart, saveCart } from "../services/localStorage";

const increaseProduct = (
  cartProductList: CartProduct[],
  productId: number
): CartProduct[] => {
  return cartProductList.map((product) => {
    if (product.id === productId) {
      product.amount += 1;
      product.total = product.price * product.amount;
      product.formattedTotal = toBrazilianCurrency(product.total);
    }

    return product;
  });
};

const removeProduct = (
  cartProductList: CartProduct[],
  productId: number
): CartProduct[] => {
  return cartProductList.filter((product) => product.id !== productId);
};

const cartProductsReducer = (state: CartProduct[], action: ActionProps) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      if (action.payload?.newProduct) {
        const newProduct: ReducerCartProduct = action.payload.newProduct;
        let newState: CartProduct[] = [];

        if (state.findIndex((product) => product.id === newProduct.id) === -1) {
          newState = [
            ...state,
            {
              ...newProduct,
              amount: 1,
              formattedTotal: newProduct.formattedPrice,
              total: newProduct.price,
            },
          ];

          saveCart(newState);

          return newState;
        }

        newState = increaseProduct(state, newProduct.id);
        saveCart(newState);

        return newState;
      }

      saveCart(state);
      return state;
    }

    case "DELETE_PRODUCT": {
      if (action.payload?.productId) {
        const newState: CartProduct[] = removeProduct(
          state,
          action.payload.productId
        );

        saveCart(newState);
        return newState;
      }

      saveCart(state);
      return state;
    }

    case "UPDATE_PRODUCT": {
      if (action.payload?.productId) {
        const productId = action.payload.productId;
        let newState: CartProduct[] = [];

        if (action.payload.productQuantityAction === "INCREASE") {
          newState = increaseProduct(state, productId);

          saveCart(newState);
          return newState;
        }

        const productAmount =
          state.find((product) => product.id === productId)?.amount || 1;

        if (productAmount > 1) {
          newState = state.map((product) => {
            if (product.id === productId) {
              product.amount -= 1;
              product.total = product.price * product.amount;
              product.formattedTotal = toBrazilianCurrency(product.total);
            }

            return product;
          });

          saveCart(newState);
          return newState;
        }

        newState = removeProduct(state, productId);

        saveCart(newState);
        return newState;
      }

      saveCart(state);
      return state;
    }

    case "DELETE_CART": {
      deleteCart();
      return [];
    }

    default:
      saveCart(state);
      return state;
  }
};

export default cartProductsReducer;
