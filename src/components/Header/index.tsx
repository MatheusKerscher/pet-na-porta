import { Link } from "react-router-dom";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";

const Header = () => {
  return (
    <header className="w-full bg-primary py-4">
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-4 text-tertiary">
        <Link to="/" className="font-bold text-xl uppercase">Pet na Porta</Link>

        <Link to="/cart" className="relative">
          <PiShoppingCartSimpleDuotone size={24} />

          <span className="absolute -top-3 -right-3 flex justify-center items-center rounded-full h-5 w-5 text-xs font-bold bg-tertiary text-black">12</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
