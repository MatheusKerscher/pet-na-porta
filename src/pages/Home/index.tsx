import { useEffect, useMemo, useRef, useState } from "react";

import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/indext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { api } from "../../services/api";

import type { Product } from "../../types/product";

import toBrazilianCurrency from "../../utils/toBrazilianCurrency";
import HomeProduct from "../../components/HomeProduct";
import Filters from "../../components/Filters";
import InputSearch from "../../components/InputSearch";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const [selectCategory, setSelectCategory] = useState("");
  const [selectPrice, setSelectPrice] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const filtersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .get("products")
      .then((response) => {
        const formattedProducts: Product[] = [];
        const categoryList: string[] = [];
        const priceList: number[] = [];

        response.data?.forEach((product: Product) => {
          const productPrice = Number(product.price.toFixed(0));

          formattedProducts.push({
            ...product,
            formattedPrice: toBrazilianCurrency(product.price),
          });

          if (
            categoryList.findIndex(
              (category) => category === product.category
            ) === -1
          ) {
            categoryList.push(product.category);
          }

          if (priceList.findIndex((price) => price === productPrice) === -1) {
            priceList.push(productPrice);
          }
        });

        setProducts(formattedProducts);
        setCategories(categoryList);
        setPrices(priceList.sort((a, b) => a - b));
      })
      .catch(() => {
        toast.error("Não foi possível trazer os produtos");
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterProducts = () => {
    let productsList: Product[] = [];

    products.filter((product) => {
      if (selectCategory.length && selectPrice > 0) {
        if (
          product.category === selectCategory &&
          product.price <= selectPrice
        ) {
          productsList.push(product);
        }
      } else if (selectPrice > 0) {
        if (product.price <= selectPrice) {
          productsList.push(product);
        }
      } else {
        if (product.category === selectCategory) {
          productsList.push(product);
        }
      }
    });

    if (searchValue.length) {
      productsList = productsList.length
        ? productsList.filter((product) =>
            product.title.toUpperCase().includes(searchValue.toUpperCase())
          )
        : products.filter((product) =>
            product.title.toUpperCase().includes(searchValue.toUpperCase())
          );
    }

    return productsList;
  };

  const productsFiltered: Product[] = useMemo(() => {
    return filterProducts();
  }, [selectCategory, selectPrice, searchValue]);

  if (loading) {
    return <Spinner tip="Buscando produtos..." />;
  }

  if (products.length === 0 && productsFiltered.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-84px)] px-6 text-zinc-500 font-medium flex justify-center items-center">
        Não encontramos nenhum produto :(
      </div>
    );
  }

  return (
    <main className="w-full h-[calc(100vh-104px)] px-6">
      <section className="w-full">
        <InputSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </section>

      <div className="w-full lg:max-w-11/12 mx-auto flex flex-col lg:flex-row my-5">
        <section className="w-full flex-1">
          <span className="font-medium mb-4 hidden lg:block">
            Filtrar produtos
          </span>

          <div className="block lg:hidden mb-5">
            <button
              className="w-full flex justify-between items-center cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <>
                  Esconder filtros <IoIosArrowUp />
                </>
              ) : (
                <>
                  Exibir filtros <IoIosArrowDown />
                </>
              )}
            </button>
          </div>

          <div className="hidden lg:block">
            <Filters
              categories={categories}
              prices={prices}
              selectCategory={selectCategory}
              selectPrice={selectPrice}
              setCategory={setSelectCategory}
              setPrice={setSelectPrice}
            />
          </div>

          <div
            ref={filtersContainerRef}
            className={`lg:hidden ${showFilters ? "block" : "hidden"}`}
          >
            <Filters
              categories={categories}
              prices={prices}
              selectCategory={selectCategory}
              selectPrice={selectPrice}
              setCategory={setSelectCategory}
              setPrice={setSelectPrice}
            />
          </div>
        </section>

        {selectCategory.length > 0 ||
        selectPrice > 0 ||
        searchValue.length > 0 ? (
          productsFiltered.length > 0 ? (
            <section className="flex-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 pb-5">
              {productsFiltered.map((product) => (
                <HomeProduct key={product.id} {...product} />
              ))}
            </section>
          ) : (
            <div className="h-[calc(100dvh-124px)] flex items-center justify-center flex-4 text-zinc-500 font-medium pt-5 lg:pt-0 text-center">
              Não encontramos nenhum produto com os filtros escolhidos :(
            </div>
          )
        ) : products.length > 0 ? (
          <section className="flex-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 pb-5">
            {products.map((product) => (
              <HomeProduct key={product.id} {...product} />
            ))}
          </section>
        ) : (
          <div className="h-[calc(100dvh-124px)] flex items-center justify-center flex-4 text-zinc-500 font-medium pt-5 lg:pt-0 text-center">
            Não encontramos nenhum produto :(
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
