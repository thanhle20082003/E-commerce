import { useEffect, useRef, useState } from "react";
// import Button from "../../components/button/Button";
import axios from "../../config/axios.js";
import { toast } from "react-toastify";
import DialogCEFeedback from "./DialogCEFeedback.jsx";
import { CiEdit } from "react-icons/ci";

const FeedbackManage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [showDialogCE, setShowDialogCE] = useState({
    show: false,
    id: null,
    isUpdate: false,
    action: null,
    feedbackDataToEdit: {},
  });
  const showDialogCERef = useRef(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("/feedback");
      setFeedbackData(response.data);
      console.log(response.data);
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

  const handleUpdateTrue = (id) => {
    console.log("ID for update:", id); // In ra ID trước khi cập nhật showDialogCE
    const dataEdit = feedbackData.find((item) => item.id === id);
    console.log(typeof dataEdit.status);
    setShowDialogCE({
      show: true,
      id: id,
      isUpdate: true,
      action: handleUpdate,
      feedbackDataToEdit: dataEdit,
    });
  };
  const handleUpdate = async (FeedbackDto) => {
    console.log("In ra id in handleUpdate:", showDialogCERef.current.id);
    try {
      if (showDialogCERef.current.show && showDialogCERef.current.id) {
        const response = await axios.put(
          `/feedback/update/${showDialogCERef.current.id}`,
          FeedbackDto
        );
        console.log(response);
        fetchData();
        handleCloseDialogCE();
        toast.success("Update Feedback successfully!", {
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
      feedbackDataToEdit: {},
    });
  };

  return (
    <>
      <table className="w-full table-auto text-center">
        <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">
              Phone Number
            </th>
            <th className="px-6 py-4 font-medium text-gray-900">Email</th>
            <th className="px-6 py-4 font-medium text-gray-900">Date</th>
            <th className="px-6 py-4 font-medium text-gray-900">Problem</th>
            <th className="px-6 py-4 font-medium text-gray-900">Description</th>
            <th className="px-6 py-4 font-medium text-gray-900">Status</th>
            <th className="px-6 py-4 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {feedbackData.length > 0 &&
            feedbackData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.phoneNumber}
                </td>
                <td className="p-2 font-medium text-gray-800">{item.email}</td>
                <td className="p-2 font-medium text-gray-800">{item.date}</td>
                <td className="p-2 font-medium text-gray-800">
                  {item.problemId}
                </td>
                <td className="p-2 w-[350px]">
                  <p className="text-justify">{item.description}</p>
                </td>
                <td className="p-2 font-medium text-gray-800">
                  {item.status === true ? "Đã được xử lý" : "Chưa được xử lý"}
                </td>
                <td className="p-2">
                  <span className="flex items-center justify-center gap-3">
                    <a
                      className="p-3 text-2xl hover:text-blue-500 cursor-pointer"
                      onClick={() => handleUpdateTrue(item.id)}
                    >
                      <CiEdit />
                    </a>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DialogCEFeedback
        show={showDialogCE.show}
        isUpdate={showDialogCE.isUpdate}
        handleSubmitFeedback={showDialogCE.action}
        cancel={handleCloseDialogCE}
        title="Feedback"
        feedbackDataToEdit={showDialogCE.feedbackDataToEdit}
      />
    </>
  );
};

export default FeedbackManage;
