import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import StartRatting from "../StarRatting";

const HomeProduct = ({
  id,
  cover,
  title,
  category,
  formattedPrice,
  sold,
  rating,
}: Product) => {
  

  return (
    <div className="w-full bg-white p-3 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-lg">
      <Link to={`/product/${id}`} className="flex flex-col justify-between items-center">
        <img
          className="w-full max-w-9/12 mx-auto rounded"
          src={cover}
          alt={title}
        />

        <div className="text-tertiary flex gap-0.5 items-center">
          <StartRatting rating={rating}/>

          <span className="text-black text-sm ms-1">
            {rating} ({sold})
          </span>
        </div>

        <span className="text-xs font-medium mt-2 rounded-full bg-secondary text-white w-fit px-4 py-0.5">
          {category}
        </span>

        <p className="mb-2 mt-1 text-center text-sm">{title}</p>

        <span className="text-lg font-bold">{formattedPrice}</span>
      </Link>
    </div>
  );
};

export default HomeProduct;
