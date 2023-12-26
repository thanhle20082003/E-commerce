import OrderCard from "../card/OrderCard";
import PropTypes from "prop-types";
import orderImage from "../../assets/images/order.jpg";

const OrderList = ({ orders }) => {
  return (
    <>
      {orders.length > 0 &&
        orders.map((item, index) => (
          <OrderCard key={index} orders={item}></OrderCard>
        ))}
      {orders.length === 0 && (
        <div className="w-[702px] h-[420px] flex flex-col items-center justify-center">
          <img src={orderImage} alt="" className="object-cover w-64 h-56" />
          <span className="text-xl font-eculid">There is no order.</span>
        </div>
      )}
    </>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array,
};

export default OrderList;
