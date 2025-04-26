import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
} from "react";
import type { CartProduct } from "../types/cart";
import cartProductsReducer from "../reducers/cartProductsReducer";
import type { ActionProps } from "../types/reducer";
import toBrazilianCurrency from "../utils/toBrazilianCurrency";
import { getCart } from "../services/localStorage";

type CartContextProps = {
  cartProducts: CartProduct[];
  cartAmount: number;
  cartTotalValue: string;
  dispatch: Dispatch<ActionProps>;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContextProps);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartProducts, dispatch] = useReducer(
    cartProductsReducer,
    getCart()
  );
  const [cartAmount, setCartAmount] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState('');

  const { cartAmountTemp, cartTotalValueTemp } = useMemo((): {
    cartAmountTemp: number;
    cartTotalValueTemp: number;
  } => {
    return cartProducts.reduce(
      (count, product) => ({
        cartAmountTemp: count.cartAmountTemp + product.amount,
        cartTotalValueTemp: count.cartTotalValueTemp + product.price * product.amount
      }),
      {
        cartAmountTemp: 0,
        cartTotalValueTemp: 0,
      }
    );
  }, [cartProducts]);

  useEffect(() => {
    setCartAmount(cartAmountTemp)
    setCartTotalValue(toBrazilianCurrency(cartTotalValueTemp))
  }, [cartAmountTemp, cartTotalValueTemp])

  return (
    <CartContext.Provider
      value={{
        cartProducts: cartProducts,
        cartAmount: cartAmount,
        cartTotalValue: cartTotalValue,
        dispatch: dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };

export default CartProvider;
