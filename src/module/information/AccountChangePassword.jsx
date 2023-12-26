import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";
import { updateUserInfo } from "../../redux/features/authSlice.jsx";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../config/axios.js";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const schema = yup
    .object({
      oldPassword: yup.string().required("Please enter your current password"),
      newPassword: yup.string().required("Please enter your new password"),
      password: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match")
        .required("Please enter your confirm password"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      password: "",
    },
  });

  const handleChangePassword = async (data) => {
    console.log("Dữ liệu của data", data.oldPassword, data.password);
    const lastData = {
      oldPassword: data.oldPassword,
      password: data.password,
    };
    try {
      if (!isValid) return;
      await axios.put("/account/change-password", lastData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      dispatch(
        updateUserInfo({
          password: data.password,
        })
      );
      reset({
        oldPassword: "",
        newPassword: "",
        password: "",
      });
      toast.success("Update password successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Update password fail!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Update password error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="pt-5 pl-10">
          <p className="text-2xl text-blue-gray-600">Change Password</p>
          <p className="text-gray-600">Manage and protect your account</p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full h-px px-3 mt-3 bg-gray-200"></span>
        </div>

        <form
          className="flex flex-row justify-center gap-4 p-16 pt-10"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className="flex-1 w-[574px]">
            <Input
              type="password"
              label="Enter your current password"
              className="w-auto my-4"
              name="oldPassword"
              control={control}
              errors={errors}
            />
            <Input
              type="password"
              label="Enter your new password"
              className="w-auto my-4"
              name="newPassword"
              control={control}
              errors={errors}
            />
            <Input
              type="password"
              label="Enter your confirm password"
              className="w-auto my-4"
              name="password"
              control={control}
              errors={errors}
            />

            <div className="mt-7">
              <Button className="bg-blue-gray-900" type="submit">
                Update
              </Button>
              <Button className="ml-5" outline="outlined">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
AccountInfo.propTypes = {
  isUpdate: PropTypes.bool,
};
export default AccountInfo;
