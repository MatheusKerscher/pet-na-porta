import { Checkbox, type CheckboxChangeEvent } from "antd";
import toBrazilianCurrency from "../../utils/toBrazilianCurrency";
import type { Dispatch, SetStateAction } from "react";

type FiltersProps = {
  categories: string[];
  prices: number[];
  selectCategory: string;
  selectPrice: number;
  setCategory: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
};

const Filters = ({
  categories,
  prices,
  selectCategory,
  selectPrice,
  setCategory,
  setPrice,
}: FiltersProps) => {
  const clearFilters = () => {
    setCategory("");
    setPrice(0);
  };

  return (
    <div className="mb-6 lg:mb-0">
      <section>
        <span className="font-medium text-sm lg:text-base">Por categoria</span>

        <ul className="ms-2 mt-1 flex flex-wrap gap-3 lg:block">
          {categories.map((category) => (
            <li key={category}>
              <Checkbox
                checked={selectCategory === category}
                onChange={(e: CheckboxChangeEvent) => {
                  setCategory(e.target.checked ? category : "");
                }}
              >
                {category}
              </Checkbox>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3">
        <span className="font-medium text-sm lg:text-base">Por preço</span>

        <ul className="ms-2 mt-1 flex flex-wrap gap-3 lg:block">
          {prices.map((price) => (
            <li key={price}>
              <Checkbox
                checked={selectPrice === price}
                onChange={(e: CheckboxChangeEvent) => {
                  setPrice(e.target.checked ? price : 0);
                }}
              >
                Até {toBrazilianCurrency(price)}
              </Checkbox>
            </li>
          ))}
        </ul>
      </section>

      {(selectCategory.length > 0 || selectPrice > 0) && (
        <button
          className="mt-4 rounded bg-primary text-white px-2 py-1 transition-all duration-200 hover:cursor-pointer hover:scale-102"
          onClick={clearFilters}
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default Filters;
