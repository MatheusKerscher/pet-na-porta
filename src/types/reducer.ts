export interface ActionProps {
  type: "ADD_PRODUCT" | "DELETE_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_CART";
  payload?: PayloadData;
};

export type ProductQuantityAction = "INCREASE" | "DECREASE"

interface PayloadData {
  productId?: number;
  productQuantityAction?: ProductQuantityAction
  newProduct?: ReducerCartProduct;
};

export interface ReducerCartProduct {
  id: number;
  title: string;
  price: number;
  cover: string;
  formattedPrice: string
}