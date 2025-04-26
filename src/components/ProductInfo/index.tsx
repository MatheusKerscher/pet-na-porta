import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import type { ProductDetails } from "../../types/product";
import StartRatting from "../StarRatting";
import useCartContext from "../../hooks/useCartContext";
import type { ReducerCartProduct } from "../../types/reducer";

const ProductInfo = ({
  cover,
  category,
  title,
  description,
  formattedPrice,
  rating,
  sold,
  price,
  id,
}: ProductDetails) => {
  const { addCartProduct } = useCartContext();

  const handleClick = () => {
    const reducerCartProduct: ReducerCartProduct = {
      id: id,
      title: title, 
      price: price,
      formattedPrice: formattedPrice,
      cover: cover
    } 

    addCartProduct(reducerCartProduct)
  }

  return (
    <section className="flex flex-col md:flex-row mt-3 mb-6 bg-white rounded-lg px-3 py-4 shadow">
      <div className="flex-1">
        <img src={cover} alt={title} className="w-full" />
      </div>

      <div className="flex-2">
        <div className="flex justify-between items-center mb-3">
          <span className="select-none text-white font-medium text-sm bg-secondary px-2 rounded-full py-0.5">
            {category}
          </span>

          <div className="flex justify-end items-center gap-1 select-none">
            <span className="flex text-tertiary">
              <StartRatting rating={rating} />
            </span>
            ({rating}/5)
          </div>
        </div>

        <h2 className="font-medium text-center text-lg md:text-xl md:text-start">
          {title}
        </h2>

        <span className="block text-xs text-primary font-medium text-center md:text-start md:text-sm">
          {sold} (unidades vendidas)
        </span>

        <p className="mt-3 text-sm text-justify md:text-base md:text-start">
          {description}
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <h3 className="font-bold text-lg md:text-xl">{formattedPrice}</h3>

          <button
            className="text-white px-2 py-1 bg-primary rounded flex items-center gap-2 cursor-pointer transition-all duration-150 hover:scale-103"
            onClick={handleClick}
          >
            Adicionar ao carrinho
            <PiShoppingCartSimpleDuotone size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
