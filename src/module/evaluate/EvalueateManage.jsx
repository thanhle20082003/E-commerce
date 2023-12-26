import axios from "../../config/axios.js";
import { useEffect } from "react";
import { useState } from "react";

const EvalueateManage = () => {
  const [evaluateData, setEvaluateData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/evaluate");
      setEvaluateData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <table className="w-full text-center table-auto">
        <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium text-gray-900">Product</th>
            <th className="px-6 py-4 font-medium text-gray-900">Account</th>
            <th className="px-6 py-4 font-medium text-gray-900">Rate</th>
            <th className="px-6 py-4 font-medium text-gray-900">Comment</th>
            <th className="px-6 py-4 font-medium text-gray-900">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {evaluateData.length > 0 &&
            evaluateData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 font-medium text-gray-800">
                  {item.product}
                </td>
                <td className="p-2">{item.account}</td>
                <td className="p-2">{item.rate}</td>
                <td className="p-2">{item.comment}</td>
                <td className="p-2">{item.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default EvalueateManage;
