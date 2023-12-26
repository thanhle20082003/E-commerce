import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { Textarea as TestArea } from "@material-tailwind/react";

const Textarea = ({ label, control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <>
      <TestArea label={label} {...field} {...props}></TestArea>
    </>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};
export default Textarea;
