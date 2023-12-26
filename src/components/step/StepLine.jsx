import { Step, Stepper } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const StepLine = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="w-[1000px] mx-auto relative z-0 my-8">
      <Stepper activeStep={activeStep}>
        <Step onClick={() => setActiveStep(0)}>
          <AiOutlineShoppingCart className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <MdPayment className="w-5 h-5" />
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <FaShippingFast className="w-5 h-5" />
        </Step>
      </Stepper>
    </div>
  );
};

export default StepLine;
