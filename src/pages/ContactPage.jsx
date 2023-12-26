import SiteLayout from "../layout/SiteLayout";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import Textarea from "../components/textarea/Textarea";
import Button from "../components/button/Button";
import { MdOutlinePlace } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../components/select/Select";
import { useEffect, useState } from "react";
import axios from "../config/axios.js";
import { toast } from "react-toastify";

const ContactPage = () => {
  //! Lấy dữ liệu từ problem
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách problem
    const fetchProblems = async () => {
      try {
        const response = await axios.get("/problem");
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblems();
  }, []);

  const schema = yup
    .object({
      email: yup.string().required("Please enter your email"),
      phoneNumber: yup.string().required("Please enter your phone number"),
      description: yup.string().required("Please enter description"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    if (!isValid) return;
    await handleCreateData(data);
    // reset form
    reset({
      phoneNumber: "",
      email: "",
      problemId: "",
      description: "",
    });
  };

  const handleCreateData = async (data) => {
    try {
      const response = await axios.post("/feedback/create", data);
      console.log(response);
      toast.success("Create feedback successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Thực hiện các hành động khác sau khi tạo dữ liệu thành công
    } catch (error) {
      console.error("Error creating feedback:", error);
    }
  };

  return (
    <SiteLayout>
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center bg-image-five w-full h-[240px] object-cover">
          <h1 className="font-semibold text-[50px] font-eculid text-gray-50">
            Contact
          </h1>
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex flex-col gap-10 w-[585px] h-auto border p-16">
            <h1 className="text-center text-2xl text-blue-gray-700">
              Send Us A Message
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex flex-col gap-5">
                <Input
                  name="email"
                  label="Email"
                  control={control}
                  errors={errors}
                ></Input>
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  control={control}
                  errors={errors}
                ></Input>
                <Select
                  className="p-[10px] rounded-lg border-blue-gray-300 text-blue-gray-500"
                  title="Problem"
                  name="problemId"
                  control={control}
                  errors={errors}
                  options={problems}
                >
                  {problems.map((problem) => (
                    <option key={problem.id} value={problem.id}>
                      {problem.name}
                    </option>
                  ))}
                </Select>
                <Textarea
                  name="description"
                  label="Content"
                  control={control}
                ></Textarea>
                <Button
                  className="w-full rounded-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-10 w-[585px] h-auto border p-16">
            <div className="flex gap-3">
              <MdOutlinePlace className="w-6 h-6 text-blue-gray-700" />
              <div className="flex flex-col gap-2">
                <span className="text-xl text-blue-gray-700">Address</span>
                <p className="text-md text-gray-600">
                  Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018
                  US
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <BsTelephone className="w-6 h-6 text-blue-gray-700" />
              <div className="flex flex-col gap-2">
                <span className="text-xl text-blue-gray-700">Lets Talk</span>
                <p className="text-md text-blue-300">+1 800 1236879</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AiOutlineMail className="w-6 h-6 text-blue-gray-700" />
              <div className="flex flex-col gap-2">
                <span className="text-xl text-blue-gray-700">Sale Support</span>
                <p className="text-md text-blue-300">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1AetQ6iNNUHBOhLgOF1Pbxv-njWBYpsPU&ehbc=2E312F"
          width="full"
          height="480"
        ></iframe>
      </div>
    </SiteLayout>
  );
};

export default ContactPage;
