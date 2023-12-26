import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import logo from "../assets/images/logo-removebg.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SignInPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const urlParams = new URLSearchParams(search);
  const tokenUrl = urlParams.get("token");
  const schema = yup.object().shape({
    usernameOrEmail: yup.string().required("Username or email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    try {
      if (tokenUrl) {
        handleLogin({ token: tokenUrl });
      }
    } catch (error) {
      console.log(error);
    }
  }, [tokenUrl]);
  const handleOpenGoogle = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenFaceBook = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/facebook";
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (data) => {
    dispatch(loginStart());
    try {
      const response = await loginMutation(data).unwrap();
      dispatch(
        loginSuccess({
          userInfo: response?.data,
          userToken: response?.data.accessToken,
        })
      );
      if (response.data.path === 0) {
        navigate("/");
      } else {
        navigate("/admin");
      }
      reset({
        username: "",
        password: "",
      });
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
    }
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="flex-col self-start hidden text-gray-300 lg:flex">
            <img src={logo} alt="Logo" width="80%" />
            <h1 className="my-2 text-4xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="pr-3 text-sm text-gray-900 opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="z-10 flex self-center justify-center">
          <div className="p-12 mx-auto bg-white rounded-3xl w-[450px] shadow-lg">
            <div className="mb-7">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In </h3>
              <p className="text-gray-400">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="space-y-5">
              <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                  type="text"
                  label="Enter your username"
                  className="w-[355px] my-4"
                  name="usernameOrEmail"
                  control={control}
                  errors={errors}
                />

                <Input
                  type="password"
                  label="Enter your password"
                  className="w-[355px]"
                  name="password"
                  control={control}
                  errors={errors}
                />

                <div className="flex items-center justify-between">
                  <div className="ml-auto text-sm">
                    <Link
                      to="/forgotPW"
                      className="text-purple-700 hover:text-purple-600"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-[355px] bg-[#F7C59F] text-gray-800"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-16 h-px bg-gray-300"></span>
                  <span className="font-normal text-gray-600">or</span>
                  <span className="w-16 h-px bg-gray-300"></span>
                </div>
                <div className="flex justify-center w-full gap-7">
                  <Button
                    className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900"
                    onClick={handleOpenGoogle}
                  >
                    <FcGoogle className="w-4 h-4" />
                    <span>Google</span>
                  </Button>
                  <Button
                    className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900"
                    onClick={handleOpenFaceBook}
                  >
                    <BsFacebook color="blue" className="w-4 h-4" />
                    <span>Facebook</span>
                  </Button>
                </div>
              </form>
            </div>
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

export default SignInPage;
