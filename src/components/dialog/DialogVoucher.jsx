import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Buttons from "../button/Button";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import axios from "../../config/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";

const DialogVoucher = ({ show, handleCloseVoucher, onUseVoucher, total }) => {
  const user = useSelector(selectCurrentUser);
  const [voucherData, setVoucherData] = useState([]);
  const [isVoucher, setIsVoucher] = useState(false);
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get("/voucher/account", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        //Sắp xếp voucher để voucher có thể sử dụng được lên trên
        const sortedVouchers = response.data.sort((a, b) => {
          // Nơi voucher có thể sử dụng được lên trên
          if (a.minTotal <= total && b.minTotal > total) {
            return -1;
          }
          // Nơi voucher không thể sử dụng được xuống dưới
          if (a.minTotal > total && b.minTotal <= total) {
            return 1;
          }
          return 0;
        });

        setVoucherData(sortedVouchers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoucher();
  }, [total, user.accessToken]);

  const calculateRemainingTime = (expirationDate) => {
    const now = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  const handleUseVoucher = (usedVoucher) => {
    onUseVoucher(usedVoucher);
    setIsVoucher(!isVoucher);
    handleCloseVoucher();
  };
  return (
    <>
      <Dialog open={show}>
        <DialogHeader className="flex justify-between">
          <span>Choose voucher</span>
          <span className="cursor-pointer" onClick={handleCloseVoucher}>
            <IoMdClose />
          </span>
        </DialogHeader>
        <DialogBody className="overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-gray-100 max-h-[600px]">
          <div className="flex flex-col items-center justify-center gap-5">
            {voucherData?.length > 0 &&
              voucherData.map((item) => (
                <div
                  className="flex flex-col items-center justify-center gap-2 w-[730px] h-[100px] shadow-md"
                  key={item.id}
                >
                  <div className="flex items-center justify-center w-full gap-2">
                    <div className="flex items-center justify-start gap-3">
                      <img
                        src={item.image}
                        alt="anh"
                        className="w-full max-w-[100px] max-h-[120px] object-cover"
                      />
                      <div className="flex flex-col items-start justify-center w-[550px]">
                        <div className="text-xl">
                          Max giảm giá {item.maxDiscount}%
                        </div>
                        <div>{item.description}</div>
                        <div className="text-xs text-red-900">
                          Hạn sử dụng:{" "}
                          {calculateRemainingTime(item.expirationDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      {isVoucher ? (
                        <Buttons
                          className="text-center bg-black"
                          onClick={() => handleUseVoucher(null)}
                        >
                          Cancel
                        </Buttons>
                      ) : (
                        <Buttons
                          className="text-center bg-black"
                          onClick={() => handleUseVoucher(item)}
                          disabled={item.minTotal > total}
                        >
                          Use
                        </Buttons>
                      )}
                    </div>
                  </div>
                  {item.minTotal > total && (
                    <span className="w-[730px] text-sm text-yellow-900">{`Cannot use the voucher because the total amount is not greater than or equal to $${item.minTotal}.`}</span>
                  )}
                </div>
              ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
DialogVoucher.propTypes = {
  show: PropTypes.bool,
  handleCloseVoucher: PropTypes.func,
  onUseVoucher: PropTypes.func,
  total: PropTypes.number,
};

export default DialogVoucher;
