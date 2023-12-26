import axios from "../../config/axios.js";
import { useEffect, useRef, useState } from "react";
import DialogDelete from "../../components/dialog/DialogDelete";
import Button from "../../components/button/Button";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DiaLogCEPayment from "./DiaLogCEPayment";
import { toast } from "react-toastify";

const PaymentManage = () => {
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    paymentDataToEdit: {},
  });

  const showDialogCERef = useRef(null);

  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });

  const [paymentData, setPaymentData] = useState([]);

  //Call api
  const fetchData = async () => {
    try {
      const response = await axios.get("/payment");
      setPaymentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    showDialogCERef.current = showDialogCE;
  }, [showDialogCE]);

  const handleCreateTrue = () => {
    setShowDialogCE({
      show: true,
      id: null,
      isUpdate: false,
      action: handleCreate,
      paymentDataToEdit: {},
    });
  };
  const handleCreate = async (data) => {
    if (!showDialogCERef.current.show) return;
    const formData = new FormData();
    formData.append("imageFile", data.image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    //*Tạo mới payment
    try {
      const response = await axios.post("/payment/create", formData);
      console.log(response);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Add new payment successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  //update payment
  const handleUpdateTrue = (id) => {
    console.log("ID for update:", id); // In ra ID trước khi cập nhật showDialogCE
    const dataEdit = paymentData.find((item) => item.id === id);
    console.log(dataEdit);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      paymentDataToEdit: dataEdit,
    });
  };

  const handleUpdate = async (data) => {
    if (!showDialogCERef.current.show && !showDialogCERef.current.id) return;
    const formData = new FormData();
    typeof data.image === "string"
      ? formData.append("image", data.image)
      : formData.append("imageFile", data.image);
    formData.append("id", showDialogCERef.current.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    // const payment = {
    //   id: showDialogCERef.current.id,
    //   name: data.name,
    //   description: data.description,
    // };
    // formData.append("paymentDto", JSON.stringify(payment));
    try {
      const response = await axios.put(
        `/payment/update/${showDialogCERef.current.id}`,
        formData
      );
      console.log("Dữ liệu được hiển thị: ", response.data);
      fetchData();
      handleCloseDialogCE();
      toast.success("🦄 Edit payment successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  //delete payment
  const handleDeleteTrue = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };
  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/payment/delete/${showDialog.id}`);
        setPaymentData(paymentData.filter((item) => item.id !== showDialog.id));
        fetchData();
        handleCloseDialog();
        toast.success("🦄 Delete payment successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // close dialog
  const handleCloseDialogCE = () => {
    setShowDialogCE({
      show: false,
      id: null,
      isUpdate: false,
      action: null,
      paymentDataToEdit: {},
    });
  };
  const handleCloseDialog = () => {
    setShowDialog({
      show: false,
      id: null,
    });
  };
  return (
    <>
      <Button
        className="cursor-pointer float-right mr-2 mb-2 bg-light-green-500"
        onClick={handleCreateTrue}
      >
        Add new Payment
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {paymentData.map((item) => (
            <tr key={item.id} className="">
              <td className="p-2 font-medium text-gray-800">{item.name}</td>
              <td className="flex items-center justify-center p-2">
                <div></div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">
                <span className="flex items-center justify-center gap-3">
                  <a
                    className="p-3 text-2xl cursor-pointer hover:text-blue-500"
                    onClick={() => handleUpdateTrue(item.id)}
                  >
                    <CiEdit />
                  </a>
                  <a
                    className="p-2 ml-2 text-2xl cursor-pointer hover:text-blue-500"
                    onClick={() => handleDeleteTrue(item.id)}
                  >
                    <BsTrash3 />
                  </a>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DialogDelete
        show={showDialog.show}
        title="payment"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DiaLogCEPayment
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitPayment={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Payment"
        paymentDataToEdit={showDialogCE.paymentDataToEdit}
      />
    </>
  );
};

export default PaymentManage;
