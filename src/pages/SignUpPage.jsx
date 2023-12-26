import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import RadioButton from "../components/radioButton/RadioButton";
import Checkbox from "../components/checkbox/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    fullName: yup.string().required("Full name is required"),
    birthday: yup
      .date()
      .transform((originalValue) => {
        return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
      })
      .required("Please choose your birth day"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    sex: yup.boolean().required("Gender is required"),
    term: yup
      .boolean()
      .oneOf([true], "You must agree to the Terms and Conditions"),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleRegister = async (data) => {
    if (!isValid) return;
    dispatch(registerStart());
    try {
      const response = await registerMutation(data).unwrap();
      dispatch(
        registerSuccess({
          userInfo: response.data.userInfo,
          userToken: response.data.userToken,
        })
      );
      reset({
        username: "",
        fullName: "",
        birthday: "",
        password: "",
        email: "",
        gender: "",
        term: false,
      });
      navigate("/checkmail");
    } catch (response) {
      if (response.status === 500) {
        dispatch(registerFailure(response.data.message));
        toast.error("username and email already exist", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="z-10 flex self-center">
          <div className="p-12 mx-auto bg-white rounded-3xl w-[550px] shadow-lg">
            <div className="mb-7">
              <h3 className="text-2xl font-semibold text-gray-800">Sign Up </h3>
              <p className="text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(handleRegister)}>
                <Input
                  type="text"
                  label="Enter your username"
                  className="w-[455px] my-4"
                  name="username"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="password"
                  label="Enter your password"
                  className="w-[455px] my-4"
                  name="password"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="text"
                  label="Enter your fullname"
                  className="w-[455px] my-4"
                  name="fullName"
                  control={control}
                  errors={errors}
                />
                <Input
                  label="Choose your birth day"
                  type="date"
                  className="w-[455px] my-4"
                  name="birthday"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="email"
                  label="Enter your email"
                  className="w-[455px] my-4"
                  name="email"
                  control={control}
                  errors={errors}
                />
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Gender</p>
                  <RadioButton
                    label="Male"
                    name="sex"
                    ripple={true}
                    // checked={true}
                    value={true}
                    control={control}
                    errors={errors}
                  ></RadioButton>
                  <RadioButton
                    label="Female"
                    name="sex"
                    ripple={true}
                    value={false}
                    control={control}
                    errors={errors}
                  ></RadioButton>
                </div>
                <Checkbox
                  label="I agree to the Terms and Conditions of Shop"
                  className="font-eculid"
                  name="term"
                  control={control}
                  errors={errors}
                ></Checkbox>
                <div>
                  <Button
                    type="submit"
                    className="w-[455px] bg-[#F7C59F]"
                    disabled={isSubmitting}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
              <div className="flex items-center justify-center space-x-3">
                <span className="w-16 h-px bg-gray-300"></span>
                <span className="font-normal text-gray-600">or</span>
                <span className="w-16 h-px bg-gray-300"></span>
              </div>
              <div className="flex justify-center w-full gap-7">
                <Button className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900">
                  <FcGoogle className="w-4 h-4" />
                  <span>Google</span>
                </Button>
                <Button className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900">
                  <BsFacebook color="blue" className="w-4 h-4" />
                  <span>Facebook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col justify-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="flex-col self-start hidden text-gray-300 lg:flex">
            <h1 className="my-3 text-4xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="pr-3 text-sm text-gray-900 opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};

export default SignUpPage;
