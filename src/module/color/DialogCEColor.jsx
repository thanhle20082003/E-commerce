import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { useEffect } from "react";

const DialogCEColor = ({
  show,
  isUpdate,
  handleSubmitColor,
  cancel,
  title,
  dataToEdit,
}) => {
  const schema = yup
    .object({
      name: yup.string().required("Please enter color"),
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
  useEffect(() => {
    if (!show) {
      // reset({
      //   id: "",
      //   name: "",
      // });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, show, reset]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitColor(data);
    // reset({
    //   id: "",
    //   name: "",
    // });
  };
  return (
    <>
      <Dialog open={show} size="xs" className="bg-gray-200">
        {isUpdate ? (
          <DialogHeader className="text-lg text-center">
            Edit {title}
          </DialogHeader>
        ) : (
          <DialogHeader className="text-lg text-center">
            Add New {title}
          </DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col gap-3">
              <Input
                type="color"
                name="id"
                label="Color"
                placeholder="Enter color"
                className="w-full"
                control={control}
                errors={errors}
              />
              <Input
                name="name"
                label="Color"
                placeholder="Enter color"
                className="w-full"
                control={control}
                errors={errors}
              />
            </div>
            <DialogFooter className="float-right">
              <div className="flex items-center justify-center gap-2">
                <Button className="bg-red-500" onClick={cancel}>
                  Cancle
                </Button>
                <Button
                  className="bg-green-500"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogCEColor.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitColor: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
};

export default DialogCEColor;
