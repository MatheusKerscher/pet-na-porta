import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div>
      <Link to="/" className="flex items-center">
        <IoChevronBack size={22} /> Voltar
      </Link>
    </div>
  );
};

export default BackButton;
