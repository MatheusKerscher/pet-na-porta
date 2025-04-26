import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { api } from "../../services/api";
import { ProductDetails } from "../../types/product";
import type { Comment } from "../../types/comment";

import toBrazilianCurrency from "../../utils/toBrazilianCurrency";

import Spinner from "../../components/Spinner/indext";
import ProductComment from "../../components/ProductComment";
import ProductInfo from "../../components/ProductInfo";
import BackButton from "../../components/BackButton";

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetails>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`products/${productId}`)
      .then((response) => {
        const formattedProduct: ProductDetails = {
          ...response.data,
          formattedPrice: toBrazilianCurrency(response.data.price),
        };

        setProduct(formattedProduct);

        api
          .get("reviews", {
            params: { productId: productId },
          })
          .then((response) => {
            setComments(response.data);
          })
          .catch(() => {
            console.error("Erro os buscar comentários");
          });
      })
      .catch(() => {
        toast.error("Não foi possível trazer os detalhes do produto");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Spinner tip="Buscando detalhes do produto..." />;
  }

  if (!product) {
    return (
      <div className="w-full lg:max-w-10/12 lg:mx-auto px-3 h-[calc(100dvh-60px)] flex flex-col justify-center items-center gap-3">
        <span className="font-medium text-zinc-400">
          Não foi possível encontrar o produto :(
        </span>

        <Link
          to="/"
          className="px-3 py-1 rounded bg-secondary text-white transition-all duration-200 hover:scale-103"
        >
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-10/12 lg:mx-auto px-3 h-[calc(100dvh-92px)] pt-4">
      <BackButton />

      <main className="w-full">
        <ProductInfo {...product} />

        {comments.length > 0 && (
          <section>
            <h4 className="font-medium text-center text-lg md:text-start lg:text-xl mb-4">
              Avaliações ({comments.length})
            </h4>

            <div className="w-full flex items-stretch flex-wrap gap-4 pb-4">
              {comments.map((comment) => (
                <ProductComment key={comment.id} {...comment} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Product;
