import { useState } from "react";
import ProductCard from "../../components/card/ProductCard";
import Heading from "../../components/heading/Heading";
import { useEffect } from "react";
import axios from "../../config/axios";

const HomeCard = () => {
  const [topProduct, setTopProduct] = useState([]);
  const top = 4;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/statistic/top-product?top=${top}`);
        setTopProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Heading className="text-center">The Highest-Priced Products.</Heading>
      <div className="flex items-center justify-center gap-5">
        {topProduct?.length > 0 &&
          topProduct.map((item) => (
            <ProductCard
              className="w-96"
              key={item.id}
              item={item}
            ></ProductCard>
          ))}
      </div>
    </>
  );
};

export default HomeCard;
