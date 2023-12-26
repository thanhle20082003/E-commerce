import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const SelectDefault = ({
  className,
  title,
  options,
  className2,
  control,
  name,
  errors,
}) => {
  const selectClasses = `border ${className}`;

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      {title && <label className={className2}>{title}</label>}
      <select className={selectClasses} {...field}>
        {options &&
          options.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      {errors.name && (
        <p className="mt-2 ml-1 text-xs text-red-500">{errors.name.message}</p>
      )}
    </>
  );
};

SelectDefault.propTypes = {
  className: PropTypes.string,
  className2: PropTypes.string,
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  value: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.array,
  errors: PropTypes.object,
};

export default SelectDefault;
