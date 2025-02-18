import { FaTimes } from "react-icons/fa";

import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../apiURL";

const MemberViewModal = ({ isOpen, onClose, memberData }) => {
  MemberViewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    memberData: PropTypes.object.isRequired,
  };
  const [weightData, setWeightData] = useState([]);
  const chartData = {
    labels: weightData?.map((data) => `Day ${data.day}`),
    datasets: [
      {
        label: "Weight",
        data: weightData?.map((data) => data.weight),
        borderColor: "#3498db",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  };

  const getWeightData = async () => {
    const res = await axios.get(`${API_URL}/member/weight/${memberData.id}`);
    if (res.status === 200) {
      const weightData = res.data.weightData?.map((val) => {
        return {
          day: new Date(val.date).toLocaleDateString(),
          weight: val.weight,
        };
      });
      setWeightData(weightData);
    }
  };

  useEffect(() => {
    //get member data from backend
    getWeightData();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded shadow-md z-10 w-4/5">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <FaTimes className="h-5 w-5 text-red-500" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Member Details</h2>
        <p>
          Name:{" "}
          <strong>{`${memberData.firstName} ${memberData.lastName}`}</strong>
        </p>
        <p>
          Weight: <strong>{memberData.weight ?? 0} kg</strong>
        </p>
        <p>
          Height: <strong>{memberData.height ?? 0} cm</strong>
        </p>
        <p>
          Date of Birth:{" "}
          <strong>{new Date(memberData.dob).toLocaleDateString()}</strong>
        </p>
        <p>
          Gender: <strong>{memberData.gender}</strong>
        </p>
        <div className="bg-white p-4 rounded shadow-md mb-6 w-4/5">
          <h3 className="text-lg font-semibold mb-2">Weight Loss Progress</h3>
          <Line
            data={chartData}
            options={chartOptions}
            width={"600px"}
            height={"150px"}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberViewModal;
