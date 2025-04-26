import { Link } from "react-router-dom";

import useCartContext from "../../hooks/useCartContext";
import CartProduct from "../../components/CartProduct";
import PurchaseSummary from "../../components/PurchaseSummary";


const Cart = () => {
  const { cartProducts } = useCartContext();

  if (cartProducts.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-60px)] px-6 flex flex-col gap-4 justify-center items-center">
        <span className="text-zinc-500 font-medium">
          Seu carrinho está vazio :(
        </span>

        <Link
          to="/"
          className="text-white bg-secondary px-2 py-1 rounded duration-150 transition-all hover:scale-104"
        >
          Descobrir produtos
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full lg:max-w-10/12 lg:mx-auto h-[calc(100vh-60px)] px-4 flex flex-col sm:grid sm:grid-cols-3">
      <section className="sm:col-span-2 py-4">
        <h3 className="text-lg md:text-xl font-medium">Meu carrinho</h3>

        <div className="flex flex-col bg-white shadow rounded-lg p-2 mt-3 divide-y divide-gray-300">
          {cartProducts.map((cartProduct) => (
            <CartProduct key={cartProduct.id} {...cartProduct} />
          ))}
        </div>
      </section>

      <section className="py-4 mx-0 sm:mx-4">
        <h3 className="text-lg md:text-xl font-medium text-start sm:text-center">
          Resumo da compra
        </h3>

        <div className="flex flex-col bg-white shadow rounded-lg p-2 mt-3 divide-y divide-gray-300">
          <PurchaseSummary />
        </div>
      </section>
    </main>
  );
};

export default Cart;
