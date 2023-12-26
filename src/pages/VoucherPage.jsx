import { useEffect } from "react";
import { useState } from "react";
import SiteLayout from "../layout/SiteLayout";
import axios from "../config/axios";
import {
    Card,
    CardBody,
} from "@material-tailwind/react";

import baner from "../assets/images/voucher50.png";
import baner1 from "../assets/images/bannervoucher.png";
import baner2 from "../assets/images/bannervoucher2.png";
import baner3 from "../assets/images/bannevoucher1.png";
import Button from "../components/button/Button";
import { selectCurrentUser } from "../redux/features/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const VoucherPage = () => {
    const user = useSelector(selectCurrentUser);
    const [voucherData, setVoucherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/voucher/is-active`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
                );
                setVoucherData(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [user]
    );

    const handleSave = async (voucherId) => {
        const VoucherOfAccountDto = {
            voucherId: voucherId,
        };
        try {
            // console.log(VoucherOfAccountDto);
            const response = await axios.post(`/voucher/add`, VoucherOfAccountDto, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });
            console.log(response);
            if (response.status === 200) {
                toast.success("Save Voucher successfully!");
                setVoucherData(prevData => prevData.filter(voucher => voucher.id !== voucherId));
            }
        } catch (response) {
            toast.error("Save Voucher Fail!");
        }
    }
    return (
        <>
            <SiteLayout>
                <div className="container mx-auto">
                    <div className="grid grid-flow-row">
                        <div className="grid-col text-center border max-h-80">
                        </div>
                        <div className="flex flex-auto h-56 w-full p-6 rounded-xl">
                            <div><img src={baner} className="object-cover rounded-xl"></img></div>
                            <div><img src={baner2} className="object-cover"></img></div>
                            <div><img src={baner3} className="object-cover"></img></div>
                            <div className="rounded-xl"><img src={baner1} className="object-cover"></img></div>
                        </div>
                        <div className="h-10 mb-5">
                            <div className="bg-red-500 h-full w-1/6 relative rounded-2xl">

                                <div className="bg-black absolute top-0 right-0 h-full w-1/2 transform skew-x-45 origin-top-right rounded-2xl"></div>

                                <h2 className="text-2xl absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-5">Voucher for you</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {voucherData.map((voucher) => (
                                <Card className="w-full  bg border  mb-3 hover:duration-500 justify-center min-h-[170px]" key={voucher.id}>
                                    <CardBody className="grid grid-cols-5 items-center gap-3 p-2">
                                        <div className="col-span-1">
                                            <img src={voucher.image} alt="anh" className="w-full max-w-[100px] max-h-[120px] object-cover" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="text-2xl">{voucher.name}</div>
                                            <div>{voucher.description}</div>
                                            <div className="text-red-900 text-xs">

                                                <span>Expiry: </span>
                                                {moment(voucher.expirationDate).diff(moment(), 'days') >= 1 ? moment(voucher.expirationDate).format('DD/MM/YYYY') : moment(voucher.expirationDate).diff(moment(), 'hours') + ' hour'}
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex items-center justify-end">
                                            <Button className="text-center bg-black" onClick={() => handleSave(voucher.id)}>Save</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </SiteLayout>
        </>
    )
}
export default VoucherPage;