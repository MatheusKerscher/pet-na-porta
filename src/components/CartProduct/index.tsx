import { Link } from "react-router-dom";

import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import type { CartProduct } from "../../types/cart";
import useCartContext from "../../hooks/useCartContext";

const CartProduct = ({
  id,
  cover,
  title,
  formattedTotal,
  amount,
}: CartProduct) => {
  const { 
    increaseCartProduct, 
    decreaseCartProduct, 
    deleteCartProduct 
  } = useCartContext();

  return (
    <div className="flex flex-col md:flex-row items-center w-full relative py-2">
      <Link to={`/product/${id}`} className="w-4/12 md:w-3/12">
        <img src={cover} alt={title} className="w-full" />
      </Link>

      <div className="flex flex-col items-center md:items-start">
        <Link to={`/product/${id}`} className="hover:underline">
          <h4 className="font-medium text-sm text-center md:text-start">
            {title}
          </h4>
        </Link>

        <div className="flex items-center gap-2 my-2 select-none">
          <button
            onClick={() => decreaseCartProduct(id)}
            className="text-white bg-primary p-1 rounded-sm cursor-pointer"
          >
            <FiMinus size={18} />
          </button>

          <span className="px-1 py-0.5">{amount}</span>

          <button
            onClick={() => increaseCartProduct(id)}
            className="text-white bg-primary p-1 rounded-sm cursor-pointer"
          >
            <FiPlus size={18} />
          </button>
        </div>

        <span className="font-medium">{formattedTotal}</span>
      </div>

      <button
        onClick={() => deleteCartProduct(id)}
        className="absolute top-2 right-2 text-secondary cursor-pointer"
      >
        <FiTrash size={18} />
      </button>
    </div>
  );
};

export default CartProduct;
