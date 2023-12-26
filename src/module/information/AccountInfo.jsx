import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import RadioButton from "../../components/radioButton/RadioButton";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import axios from "../../config/axios.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import { updateUserInfo } from "../../redux/features/authSlice.jsx";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const AccountInfo = ({ isUpdate }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const schema = yup
    .object({
      //Không cẩn ảnh cũng được
      // image: yup.mixed().test("file", "Please choose a image file", (value) => {
      //   if (value instanceof File) {
      //     const acceptedExtensions = [".jpg", ".jpeg", ".png"];
      //     const fileExtension = value.name.split(".").pop().toLowerCase();
      //     return acceptedExtensions.includes(`.${fileExtension}`);
      //   } else if (typeof value === "string") {
      //     const imageExtensions = [".jpg", ".jpeg", ".png"];
      //     return imageExtensions.some((extension) =>
      //       value.toLowerCase().endsWith(extension)
      //     );
      //   }
      //   return false; // Trường hợp khác không hợp lệ
      // }),
      username: yup.string().required("Please enter your username"),
      fullName: yup.string().required("Please enter your fullname"),
      email: yup.string().required("Please enter your email"),
      // phoneNumber: yup.string().required("Please enter your phone number"),
      birthday: yup
        .date()
        .transform((originalValue) => {
          return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid date for birthday")
        .required("Please enter your birthday"),
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
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      address: user.address,
      sex: user.sex,
    },
  });

  const onSubmitHandler = async (data) => {
    if (!isValid) return;
    await handleUpdateData(data);
    // reset form
    reset({
      image: data.image,
      phoneNumber: data.phoneNumber,
      email: data.email,
      username: data.username,
      fullName: data.fullName,
      birthday: data.birthday,
      address: data.address,
      sex: data.sex,
    });
  };

  const handleUpdateData = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      typeof data.image === "string"
        ? formData.append("image", data.image)
        : formData.append("imageFile", data.image);
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("birthday", data.birthday);
      formData.append("address", data.address);
      formData.append("sex", data.sex);
      const response = await axios.put("/account/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(response);
      //Đoạn này là để update lại thông tin user trong redux
      dispatch(
        updateUserInfo({
          image: data.image,
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday,
          address: data.address,
          sex: data.sex,
        })
      );
      toast.success("Update user successfully!", {
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
      toast.error("Update user fail! (Do not duplicate phone numbers)", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="pt-5 pl-10">
          <p className="text-2xl text-blue-gray-600">Information</p>
          <p className="text-gray-600">Manage and protect your account</p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <span className="w-full h-px px-3 mt-3 bg-gray-200"></span>
        </div>

        <form
          className="flex flex-row justify-center gap-4 mt-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex-none">
            <div className="mt-6 w-[300px]">
              <ImageUpload
                name="image"
                control={control}
                isUpdate={isUpdate}
                errors={errors}
              ></ImageUpload>
            </div>
          </div>
          <div className="flex-1 mr-16 w-[323px]">
            <Input
              type="email"
              label="Enter your email"
              className="w-auto my-4"
              disabled={true}
              name="email"
              control={control}
              errors={errors}
            />
            <Input
              type="text"
              label="Enter your username"
              disabled={true}
              className="w-auto my-4"
              control={control}
              errors={errors}
              name="username"
            />
            <Input
              type="text"
              label="Enter your fullname"
              className="w-auto my-4"
              name="fullName"
              control={control}
              errors={errors}
            />
            <Input
              type="text"
              label="Enter your phone number"
              className="w-auto my-4"
              name="phoneNumber"
              control={control}
              errors={errors}
            />
            <Input
              type="date"
              name="birthday"
              label="Enter your birthday"
              className="w-auto my-4"
              control={control}
              errors={errors}
            />
            <Textarea
              name="address"
              label="Address"
              control={control}
              errors={errors}
            />

            <div className="flex items-center gap-4">
              <p className="text-gray-600">Gender</p>
              <RadioButton
                label="Nam"
                name="sex"
                ripple={true}
                control={control}
                errors={errors}
                value={true}
              ></RadioButton>
              <RadioButton
                label="Nữ"
                name="sex"
                ripple={true}
                control={control}
                errors={errors}
                value={false}
              ></RadioButton>
            </div>
            <div className="mt-2">
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
