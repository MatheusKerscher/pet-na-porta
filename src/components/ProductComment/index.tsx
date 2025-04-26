import type { Comment as ProductComment } from "../../types/comment";
import StartRatting from "../StarRatting";

const ProductComment = ({ comment, name, rating }: ProductComment) => {
  return (
    <div className="w-full md:max-w-4/12 lg:max-w-3/12 bg-white shadow-md shadow-gray-200 rounded p-3">
      <div className="flex justify-between mb-3 flex-wrap">
        <span className="font-medium text-sm md:text-base">{name}</span>

        <div className="flex items-center gap-1 text-sm">
          <span className="flex text-tertiary">
            <StartRatting rating={rating} />
          </span>
          ({rating}/5)
        </div>
      </div>

      <span className="italic block text-center text-sm md:text-base">"{comment}"</span>
    </div>
  );
};

export default ProductComment;
