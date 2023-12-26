import axios from "../../config/axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";
import DialogCEColor from "./DialogCEColor";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Button } from "@material-tailwind/react";

const ColorManage = () => {
  const [colorData, setColorData] = useState([]);
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
      const response = await axios.get("/color");
      setColorData(response.data);
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

  const handleCreate = async (colorDto) => {
    try {
      if (showDialogCERef.current.show) {
        const response = await axios.post("/color/create", colorDto);
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
    const dataEdit = colorData.find((item) => item.id === id);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      dataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (colorDto) => {
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const endcodeId = showDialogCERef.current.id.replace(/^#/, "%23");
        const response = await axios.put(
          `/color/update/${endcodeId}`,
          colorDto
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
        const endcodeId = showDialog.id.replace(/^#/, "%23");
        await axios.delete(`/color/delete/${endcodeId}`);
        setColorData(colorData.filter((item) => item.id !== showDialog.id));
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
        Add new color
      </Button>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Code</th>
            <th className="px-6 py-4 font-medium text-gray-900">Color</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {colorData.length > 0 &&
            colorData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">{item.id}</td>
                <td className="p-2">{item.name}</td>
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
        title="color"
        confirm={handleDelete}
        cancel={handleCloseDialog}
      />
      <DialogCEColor
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitColor={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Color"
        dataToEdit={showDialogCE.dataToEdit}
      />
    </>
  );
};

export default ColorManage;
