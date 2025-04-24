import { Checkbox, type CheckboxChangeEvent } from "antd";
import toBrazilianCurrency from "../../utils/toBrazilianCurrency";
import type { Dispatch, SetStateAction } from "react";

type FiltersProps = {
  categories: string[];
  prices: number[];
  setCategory: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
};

const Filters = ({
  categories,
  prices,
  setCategory,
  setPrice
}: FiltersProps) => {
  return (
    <div>
      <section>
        <span className="font-medium">Por categoria</span>

        <ul className="ms-2 mt-1">
          {categories.map((category) => (
            <li key={category}>
              <Checkbox
                onChange={(e: CheckboxChangeEvent) => {
                  setCategory(e.target.checked ? category : "")
                }}
              >
                {category}
              </Checkbox>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3">
        <span className="font-medium">Por preço</span>

        <ul className="ms-2 mt-1">
          {prices.map((price) => (
            <li key={price}>
              <Checkbox
                onChange={(e: CheckboxChangeEvent) => {
                  setPrice(e.target.checked ? price : 0)
                }}
              >
                Até {toBrazilianCurrency(price)}
              </Checkbox>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Filters;
