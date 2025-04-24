import { useEffect, useMemo, useState } from "react";
import Spinner from "../../components/Spinner/indext";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import type { Product } from "../../types/product";
import toBrazilianCurrency from "../../utils/toBrazilianCurrency";
import HomeProduct from "../../components/HomeProduct";
import Filters from "../../components/Filters";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectPrice, setSelectPrice] = useState<number>(0);

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

  useEffect(() => {
    const productList: Product[] = [];

    products.forEach((product) => {
      if (selectCategory.length > 0 && selectPrice > 0) {
        if (
          product.category === selectCategory &&
          product.price <= selectPrice
        ) {
          productList.push(product);
        }
      } else if (selectPrice > 0) {
        if (product.price <= selectPrice) {
          productList.push(product);
        }
      } else {
        if (product.category === selectCategory) {
          productList.push(product);
        }
      }
    });

    setProductsFiltered(productList);
  }, [selectCategory, selectPrice])

  if (loading) {
    return <Spinner tip="Buscando produtos..." />;
  }

  return (
    <main className="w-full h-[calc(100vh-60px)] px-6">
      <section className="w-full"></section>

      <div className="w-full max-w-11/12 mx-auto flex flex-col lg:flex-row my-5">
        <section className="w-full flex-1">
          <span className="font-medium block text-center mb-4">
            Filtrar produtos
          </span>

          <Filters
            categories={categories}
            prices={prices} 
            setCategory={setSelectCategory}
            setPrice={setSelectPrice}
          />
        </section>

        <section className="flex-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 pb-5">
          {selectCategory.length > 0 || selectPrice > 0 ? (
            productsFiltered.length > 0 ? (
              productsFiltered.map((product) => (
                <HomeProduct key={product.id} {...product} />
              ))
            ) : (
              <div>Não encontramos nenhum produto :(</div>
            )
          ) : products.length > 0 ? (
            products.map((product) => (
              <HomeProduct key={product.id} {...product} />
            ))
          ) : (
            <div>Não encontramos nenhum produto :(</div>
          )}
          {}
        </section>
      </div>
    </main>
  );
};

export default Home;
