import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const HomeProduct = ({
  id,
  cover,
  title,
  category,
  formattedPrice,
  sold,
  rating,
}: Product) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} size={14} />);
    } else if (i === fullStars && halfStar) {
      stars.push(<FaRegStarHalfStroke key={i} size={14} />);
    } else {
      stars.push(<FaRegStar key={i} size={14} />);
    }
  }

  return (
    <div className="w-full bg-white p-3 rounded-xl transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-lg">
      <Link to={`/product/${id}`} className="flex flex-col justify-between items-center">
        <img
          className="w-full max-w-9/12 mx-auto rounded"
          src={cover}
          alt={title}
        />

        <div className="text-tertiary flex gap-0.5 items-center">
          {stars.map((start) => start)}

          <span className="text-black text-sm ms-1">
            {rating} ({sold})
          </span>
        </div>

        <span className="text-xs mt-2 rounded-full bg-secondary text-black w-fit px-4 py-0.5">
          {category}
        </span>

        <p className="mb-2 mt-1 text-center text-sm">{title}</p>

        <span className="text-lg font-bold">{formattedPrice}</span>
      </Link>
    </div>
  );
};

export default HomeProduct;
