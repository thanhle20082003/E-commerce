import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import { toast } from "react-toastify";
import axios from "../../config/axios.js";
import DialogCEVoucher from "./DialogCEVoucher";

const VoucherManage = () => {
  const [voucherData, setVoucherData] = useState([]);
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
      const response = await axios.get("/voucher");
      setVoucherData(response.data);
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
        formData.append("name", data.name);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("quantity", data.quantity);
        formData.append("typeDiscount", data.typeDiscount);
        formData.append("minTotal", data.minTotal);
        formData.append("maxDiscount", data.maxDiscount);
        formData.append("description", data.description);
        const response = await axios.post("/voucher/create", formData);
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Create category successfully!", {
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
    const dataEdit = voucherData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      dataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (data) => {
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const formData = new FormData();
        typeof data.image === "string"
          ? formData.append("image", data.image)
          : formData.append("imageFile", data.image);
        formData.append("name", data.name);
        formData.append("discount", data.discount);
        formData.append("registerDate", data.registerDate);
        formData.append("expirationDate", data.expirationDate);
        formData.append("quantity", data.quantity);
        formData.append("typeDiscount", data.typeDiscount);
        formData.append("minTotal", data.minTotal);
        formData.append("maxDiscount", data.maxDiscount);
        formData.append("description", data.description);
        const response = await axios.put(
          `/voucher/update/${showDialogCERef.current.id}`,
          formData
        );
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Update category successfully!", {
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
        await axios.delete(`/voucher/delete/${showDialog.id}`);
        setVoucherData(voucherData.filter((item) => item.id !== showDialog.id));
        handleCloseDialog();
        toast.success("Delete category successfully!", {
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
        className="float-right mb-2 mr-2 cursor-pointer bg-light-green-500"
        onClick={handleCreateTrue}
      >
        Add new voucher
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Image</th>
            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
            <th className="px-6 py-4 font-medium text-gray-900">Discount</th>
            <th className="px-6 py-4 font-medium text-gray-900">Quantity</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Min Total</th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Max Discount
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Register Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Expiration Date
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">
              Type Discount
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {voucherData.length > 0 &&
            voucherData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "70px" }}
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.discount}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.minTotal}</td>
                <td className="p-2">{item.maxDiscount}</td>
                <td className="p-2">{item.registerDate}</td>
                <td className="p-2">{item.expirationDate}</td>
                <td className="p-2">{item.typeDiscount}</td>
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
        title="voucher"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEVoucher
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitVoucher={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Voucher"
        dataToEdit={showDialogCE.dataToEdit}
      />
    </>
  );
};

export default VoucherManage;
