// src/components/MemberDashboard.js

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { API_URL } from "../../../apiURL";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [weightData, setWeightData] = useState([]);
  const [messages, setMessages] = useState([]);

  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");

  // Function to handle weight update
  const updateWeight = async () => {
    try {
      const res = await axios.post(`${API_URL}/member/update-weight`, {
        id: localStorage.getItem("id"),
        date: date,
        weight: weight,
      });

      if (res.status === 200) {
        getWeightData();
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWeightData = async () => {
    const res = await axios.get(
      `${API_URL}/member/weight/${localStorage.getItem("id")}`
    );
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

  // Chart data and options
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

  const [user, setUser] = useState({});

  useEffect(() => {
    //get member data from backend
    getUserData();
    getWeightData();
    loadMessages();
  }, []);
  const loadMessages = async () => {
    const res = await axios.get(`${API_URL}/notification`);
    if (res.status === 200) {
      console.log("datar", res.data);
      setMessages(res.data.messages);
    }
  };

  const getUserData = async () => {
    const res = await axios.get(
      `${API_URL}/member/${localStorage.getItem("id")}`
    );
    if (res.status === 200) {
      setUser(res.data.user);
      console.log(res.data.user);
      setFormData({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        height: res.data.user.height,
        weight: res.data.user.weight,
      });
    }
  };

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    height: user.height,
    weight: user.weight,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateMember = async () => {
    const res = await axios.put(`${API_URL}/member/update`, {
      id: localStorage.getItem("id"),
      ...formData,
    });
    if (res.status === 200) {
      alert("Update successful");
    }
  };

  const [selectedUI, setSelectedUI] = useState("profile");

  return (
    <div className="p-8 gap-5 flex-col">
      <div className="flex justify-between items-center h-10 mb-5">
        <h3 className="text-2xl  mt-4 bg-white p-4 rounded mb-6 font-bold ">
          Welcome back, {user.firstName}
        </h3>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setSelectedUI("profile")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setSelectedUI("weight")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Weight
          </button>
          <button
            type="button"
            onClick={() => setSelectedUI("messages")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Messages
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg  hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:red-blue-700 focus:text-red-700 dark:bg-red-800 dark:border-red-700 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-red-500 dark:focus:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <hr />
      {selectedUI === "weight" && (
        <div className="flex w-full mt-5">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded shadow-md mb-6 w-4/5">
            <h3 className="text-lg font-semibold mb-2">Weight Loss Progress</h3>
            <Line
              data={chartData}
              options={chartOptions}
              width={"600px"}
              height={"150px"}
            />
          </div>

          {/* Weight Update Form */}
          <div className="bg-white p-2 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Update Weight</h3>

            <div className="mb-4">
              <label
                htmlFor="newDate"
                className="block text-sm font-medium text-gray-600"
              >
                Date
              </label>
              <input
                type="date"
                id="newDate"
                name="newDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Select date"
                required
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newWeight"
                className="block text-sm font-medium text-gray-600"
              >
                New Weight (kg)
              </label>
              <input
                type="number"
                id="newWeight"
                name="newWeight"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your new weight"
                required
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
              onClick={() => updateWeight()}
              disabled={!date || !weight}
            >
              Update Weight
            </button>
          </div>
        </div>
      )}

      {selectedUI === "profile" && (
        <div className="flex w-full">
          <form className="w-full">
            <div className="bg-white p-4 rounded shadow-md mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Details</h3>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.firstName}
                  value={formData.firstName}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.lastName}
                  value={formData.lastName}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  id="dob"
                  name="dob"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={
                    user?.dob ? new Date(user?.dob).toLocaleDateString() : ""
                  }
                  required
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-600"
                >
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.gender}
                  required
                  disabled
                />
                
              </div>
             
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.email}
                  required
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-600"
                >
                  Height
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.height}
                  value={formData.height}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-600"
                >
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.weight}
                  value={formData.weight}
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                onClick={() => updateMember()}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      {selectedUI === "messages" && (
        <div className="ml-10 w-2/3">
          {/* Messages Table */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
          </div>
          <div className="rounded shadow-md  ">
            <table className="w-full 2/4">
              <thead>
                <tr className="border-b-2 border-black p-2 mb-2">
                  <th className="w-1/3 text-left px-1">Date</th>
                  <th className="w-1/3 text-center">Message</th>
                  <th className="w-1/3 text-center">From</th>
                </tr>
              </thead>
              <tbody className="mt-4">
                {messages?.map((message) => (
                  <tr
                    key={message.id}
                    className="pb-4 h-8 border border-b-orange-300"
                  >
                    <td className="w-1/3 text-left px-1">
                      {new Date(message?.date)?.toLocaleDateString()}
                    </td>
                    <td className="w-1/3 text-center">{message.message}</td>
                    <td className="w-1/3 text-center">
                      {message.trainerId ? "Trainer" : "Admin"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
