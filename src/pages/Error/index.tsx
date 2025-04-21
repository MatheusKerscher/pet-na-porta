import { Link } from "react-router-dom";

import notFoundImage from "../../assets/images/not-found.svg";

const Error = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center px-6">
      <p className="flex gap-2 items-center font-medium text-gray-400 text-center">
        Ups... Não encontramos o que você estava procurando
      </p>

      <img
        src={notFoundImage}
        alt="Cachorro roxo com cara triste e jornal rasgado"
        className="w-8/12 md:max-w-2/12 my-8"
      />

      <Link
        to="/"
        replace
        className="bg-secondary text-white rounded px-5 py-2 font-medium transition-all duration-200 hover:scale-102"
      >
        Voltar
      </Link>
    </div>
  );
};

export default Error;
