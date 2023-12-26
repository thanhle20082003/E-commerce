import { useEffect, useState } from "react";
import OrderList from "../../components/list/OrderList";
import Tabs from "../../components/tabs/Tabs";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";

const AccountOrder = () => {
  const user = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [orders, setOrders] = useState([]);

  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "To Pay", value: "WAIT_TO_PAY" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Delivering", value: "DELIVERING" },
    { label: "Completed", value: "SUCCESSFUL" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Returned", value: "RETURNED" },
  ];

  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      try {
        const response = await axios.get(`/order?type=${activeTab}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        if (error.response.status === "404") {
          setOrders([]);
        }
      }
    };
    fetchOrdersByStatus();
  }, [activeTab, user.accessToken]);

  return (
    <div className="flex flex-col gap-5">
      <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
      <OrderList orders={orders} />
    </div>
  );
};

export default AccountOrder;
