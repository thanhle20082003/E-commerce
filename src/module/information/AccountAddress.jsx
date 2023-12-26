import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import DialogDelete from "../../components/dialog/DialogDelete.jsx";
import DialogCEDeliveryAddress from "../information/DialogCEDeliveryAddress.jsx";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import axios from "../../config/axios.js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";
import { toast } from "react-toastify";

const AccountAddress = () => {
  const user = useSelector(selectCurrentUser);
  const [deliveryAddressData, setDeliveryAddressData] = useState([]);
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
      const response = await axios.get("/deliveryAddress/account", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setDeliveryAddressData(response.data);
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
        const dataDTO = {
          phoneNumber: data.phoneNumber,
          apartmentNumber: data.apartmentNumber,
          city: data.selectedCity,
          district: data.selectedDistrict,
          ward: data.selectedWard,
          cityCode: data.cityCode,
          districtCode: data.districtCode,
          wardCode: data.wardCode,
        };
        const response = await axios.post("/deliveryAddress/create", dataDTO, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Create delivery address successfully!", {
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
    const dataEdit = deliveryAddressData.find((item) => item.id === id);
    console.log("In ra dataEdit:", dataEdit);
    const dataEditDTO = {
      phoneNumber: dataEdit.phoneNumber,
      apartmentNumber: dataEdit.apartmentNumber,
      city: dataEdit.cityCode,
      district: dataEdit.districtCode,
      ward: dataEdit.wardCode,
      cityCode: dataEdit.cityCode,
      districtCode: dataEdit.districtCode,
      wardCode: dataEdit.wardCode,
    };
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      dataToEdit: dataEditDTO,
    });
  };
  const handleUpdate = async (data) => {
    const dataDTO = {
      phoneNumber: data.phoneNumber,
      apartmentNumber: data.apartmentNumber,
      city: data.selectedCity,
      district: data.selectedDistrict,
      ward: data.selectedWard,
      cityCode: data.cityCode,
      districtCode: data.districtCode,
      wardCode: data.wardCode,
    };
    console.log("In ra deliveryAddressDTO:", dataDTO);
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const response = await axios.put(
          `/deliveryAddress/update/${showDialogCERef.current.id}`,
          dataDTO,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Update delivery address successfully!", {
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
        await axios.delete(`/deliveryAddress/delete/${showDialog.id}`);
        setDeliveryAddressData(
          deliveryAddressData.filter((item) => item.id !== showDialog.id)
        );
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
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between mt-2 ml-3 pl-10 pt-5">
          <div>
            <p className="text-2xl text-blue-gray-600">My Addresses</p>
            <p className="text-gray-600">All previously saved addresses</p>
          </div>
          <div>
            <Button
              className="float-right mb-2 mr-2 cursor-pointer bg-light-green-500"
              onClick={handleCreateTrue}
            >
              Add New Delivery Address
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full px-3 h-px bg-gray-200 mt-3"></span>
        </div>

        <div className="px-10 mt-5 w-[702px]">
          <ul className="mt-3">
            {deliveryAddressData.length > 0 &&
              deliveryAddressData.map((item) => (
                <li className="mt-2" key={item.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <p className="text-sm text-gray-600 uppercase">
                        {user.fullName}
                      </p>
                      <p className="ml-2 text-gray-500 text-sm">
                        {item.phoneNumber || "Không có số điện thoại"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">
                        {item.apartmentNumber}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.ward}, {item.district}, {item.city}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        className="text-xl hover:text-blue-500 cursor-pointer"
                        onClick={() => handleUpdateTrue(item.id)}
                      >
                        <CiEdit />
                      </a>
                      <a
                        className="ml-2 text-xl  hover:text-blue-500 cursor-pointer"
                        onClick={() => handleDeleteTrue(item.id)}
                      >
                        <BsTrash3 />
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 mt-5"></div>
                </li>
              ))}
          </ul>
        </div>
        <DialogDelete
          show={showDialog.show}
          title="Delivery Address"
          confirm={handleDelete}
          cancel={handleCloseDialog}
        />
        <DialogCEDeliveryAddress
          show={showDialogCE.show}
          isUpdate={showDialogCE.isUpdate}
          handleSubmitAddress={showDialogCE.action}
          cancel={handleCloseDialogCE}
          title="Delivery Address"
          dataToEdit={showDialogCE.dataToEdit}
        />
      </div>
    </>
  );
};
export default AccountAddress;
