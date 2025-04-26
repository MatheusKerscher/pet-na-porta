import toast from "react-hot-toast";
import useCartContext from "../../hooks/useCartContext";

const PurchaseSummary = () => {
  const { cartProducts, cartAmount, cartTotalValue, deleteCart } =
    useCartContext();

  const handleClick = () => {
    deleteCart();
    toast.success("Compra finalizada com sucesso");
  };

  return (
    <>
      <section className="px-2">
        {cartProducts.map((cartProduct) => (
          <div
            key={cartProduct.id}
            className="flex justify-between gap-4 items-center py-3"
          >
            <span className="text-sm">
              {cartProduct.title} ({cartProduct.amount}x)
            </span>

            <span className="font-medium">{cartProduct.formattedTotal}</span>
          </div>
        ))}
      </section>

      <section className="mx-2 mt-2 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Qtd. total</span>
          <span className="font-medium">{cartAmount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Valor total</span>
          <span className="font-medium">{cartTotalValue}</span>
        </div>

        <button
          onClick={handleClick}
          className="uppercase font-medium text-white bg-secondary rounded py-2 cursor-pointer mt-3 transition-all duration-150 hover:scale-103"
        >
          Finalizar compra
        </button>
      </section>
    </>
  );
};

export default PurchaseSummary;
