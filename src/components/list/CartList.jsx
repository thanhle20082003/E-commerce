import { useSelector } from "react-redux";
import CartCard from "../card/CartCard";

const CartList = () => {
  const cartData = useSelector((state) => state.cart.products);
  return (
    <>
      {cartData?.length > 0 &&
        cartData.map((item) => (
          <CartCard key={item.productVariantId} cartData={item}></CartCard>
        ))}
    </>
  );
};

export default CartList;
