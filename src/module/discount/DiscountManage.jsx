import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import DialogCEDiscount from "./DialogCEDiscount.jsx";

const DiscountManage = () => {
  const [discountData, setDiscountData] = useState([]);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    dataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const [showDialog, setShowDialog] = useState({
    show: false,
    id: null,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("/discount");
      setDiscountData(response.data);
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
      dataToEdit: {},
    });
  };
  const handleCreate = async (data) => {
    try {
      if (showDialogCERef.current.show) {
        const formData = new FormData();
        typeof data.image === "string"
          ? formData.append("image", data.image)
          : formData.append("imageFile", data.image);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("quantity", data.quantity);
        formData.append("categoryId", data.categoryId);
        formData.append("description", data.description);
        const response = await axios.post("/discount/create", formData);
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Create discount successfully!", {
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
  const handleUpdateTrue = (id) => {
    console.log("ID for update:", id); // In ra ID trước khi cập nhật showDialogCE
    const dataEdit = discountData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      dataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (data) => {
    console.log("In ra id in handleUpdate:", showDialogCERef.current.id);
    try {
      const formData = new FormData();
      typeof data.image === "string"
        ? formData.append("image", data.image)
        : formData.append("imageFile", data.image);
      formData.append("discount", data.discount);
      formData.append("registerDate", data.registerDate);
      formData.append("expirationDate", data.expirationDate);
      formData.append("quantity", data.quantity);
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description);
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const response = await axios.put(
          `/discount/update/${showDialogCERef.current.id}`,
          formData
        );
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Update discount successfully!", {
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
  const handleDeleteTrue = (id) => {
    setShowDialog({
      show: true,
      id: id,
    });
  };
  const handleDelete = async () => {
    try {
      if (showDialog.show && showDialog.id) {
        await axios.delete(`/discount/delete/${showDialog.id}`);
        setDiscountData(
          discountData.filter((item) => item.id !== showDialog.id)
        );
        handleCloseDialog();
        toast.success("Delete discount successfully!", {
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
  const handleCloseDialogCE = () => {
    setShowDialogCE({
      show: false,
      id: null,
      isUpdate: false,
      action: null,
      dataToEdit: {},
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
        Add new discount
      </Button>
      <table className="w-full table-auto text-center">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Register Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Expiration Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Category</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {discountData.length > 0 &&
            discountData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.discount}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.registerDate}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.expirationDate}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.quantity}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "70px" }}
                  />
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.description}
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.categoryId}
                </td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                      onClick={() => handleUpdateTrue(item.id)}
                    >
                      <CiEdit />
                    </a>
                    <a
                      className="ml-2 p-2 text-2xl  hover:text-blue-500 cursor-pointer"
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
        title="discount"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEDiscount
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitDiscount={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Discount"
        dataToEdit={showDialogCE.dataToEdit}
      />
    </>
  );
};

export default DiscountManage;
