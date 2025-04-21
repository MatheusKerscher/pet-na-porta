import { useState } from "react";
import Spinner from "../../components/Spinner/indext";



const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  if (loading) {
    return (
      <Spinner tip="Buscando produtos..."/>
    );
  }

  return (
    <main className="w-full h-[calc(100vh-60px)] px-6">
      <section className="w-full"></section>

      <div className="w-full">
        <section></section>
        <section></section>
      </div>
    </main>
  );
};

export default Home;
