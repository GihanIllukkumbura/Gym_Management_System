import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js";
Chart.register(ArcElement, Legend, Tooltip);
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoTrashBin } from "react-icons/io5";
import { API_URL } from "../../../apiURL";
import AddMessageModalTrainer from "./AddMessageModalTrainer";
import MemberViewModal from "../Admin/MemberViewModal";

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [membersData, setMembersData] = useState([]);
  const [messages, setMessages] = useState([]);

  const filteredMembers = membersData?.filter((member) =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // call when component mounts
  useEffect(() => {
    getTrainer();
    getMemberList();
    loadMessages();
  }, []);

  const getTrainer = async () => {
    console.log(localStorage.getItem("id"));
    const res = await axios.get(
      `${API_URL}/trainer/${localStorage.getItem("id")}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setUser(res.data.trainer);
      setFormData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        gender: res.data.gender,
        email: res.data.email,
        phone: res.data.phone,
      });
    }
  };

  const getMemberList = async () => {
    const res = await axios.get(
      `${API_URL}/trainer/members/${localStorage.getItem("id")}`
    );
    if (res.status === 200) {
      setMembersData(res.data.members);
    }
  };

  const loadMessages = async () => {
    const res = await axios.get(`${API_URL}/notification`);
    if (res.status === 200) {
      console.log(res.data);
      setMessages(res.data.messages);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [addmodalOpen, setAddModalOpen] = useState(false);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    gender: user.gender,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteMessage = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this message?`
    );
    if (confirm) {
      const res = await axios.delete(`${API_URL}/notification/trainer/${id}`);
      if (res.status === 200) {
        loadMessages();
      } else {
        alert("Failed to delete message");
      }
    }
  };

  const [selectedUI, setSelectedUI] = useState("members");

  const updateDetails = async () => {
    const res = await axios.put(
      `${API_URL}/trainer/${localStorage.getItem("id")}`,
      {
        firstName: formData.firstName ?? user.firstName,
        lastName: formData.lastName ?? user.lastName,
        phone: formData.phone ?? user.phone,
      }
    );
    if (res.status === 200) {
      getTrainer();
      alert("Details updated successfully");
    } else {
      alert("Failed to update details");
    }
  };

  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/trainer/update-password/${localStorage.getItem("id")}`,
        {
          curPassword,
          newPassword,
        }
      );
      console.log(res.status);
      if (res.status === 200) {
        alert("Password updated successfully");
      } else if (res.status === 400) {
        alert("Current password wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Current password might wrong");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-6">Trainer View</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setSelectedUI("members")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t rounded-s-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Members
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
            onClick={() => setSelectedUI("profile")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Profile
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
      {/* Searchable Table */}
      {selectedUI === "members" && (
        <>
          {" "}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Assigned Members</h2>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search by member name"
                className="p-2 border rounded-md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="w-1/5 text-left">Name</th>
                    <th className="w-1/5 text-center">Weight</th>
                    <th className="w-1/5 text-center">Height</th>
                    <th className="w-1/5 text-center">Date of birth</th>
                    <th className="w-1/5 text-center">Gender</th>
                    <th className="w-1/5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="flex-col gap-2">
                  {filteredMembers?.map((member) => (
                    <tr
                      key={member.id}
                      className="pb-4 h-8 border border-b-orange-300"
                    >
                      <td className="w-1/5 text-left">{`${member.firstName} ${member.lastName}`}</td>
                      <td className="w-1/5 text-center">
                        {member.weight ?? 0} kg
                      </td>
                      <td className="w-1/5 text-center">
                        {member.height ?? 0} cm
                      </td>
                      <td className="w-1/5 text-center">
                        {new Date(member.dob).toLocaleDateString()}{" "}
                      </td>
                      <td className="w-1/5 text-center">{member.gender}</td>
                      <td className="w-1/5 text-center gap-4">
                        <button onClick={() => openModal(member)}>
                          <FaEye className="h-5 w-5 text-green-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isModalOpen && (
            <MemberViewModal
              isOpen={isModalOpen}
              onClose={closeModal}
              memberData={selectedMember}
            />
          )}
        </>
      )}

      {selectedUI === "messages" && (
        <div className="ml-10 w-2/3">
          {/* Messages Table */}
          <div className="mt-4 flex justify-between">
            <h3 className="text-lg font-semibold mb-2">Messages</h3>
            <button
              className="border bg-green-600 text-white font-bold rounded-md px-4 py-2"
              onClick={() => {
                setAddModalOpen(true);
              }}
            >
              + Add message
            </button>
          </div>
          <div className="rounded shadow-md  ">
            <table className="w-full 2/4">
              <thead>
                <tr className="border-b-2 border-black p-2 mb-2">
                  <th className="w-1/3 text-left px-1">Date</th>
                  <th className="w-1/3 text-center">Message</th>
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
                    {message.trainerId == localStorage.getItem("id") && (
                      <td className="w-1/3 text-center">
                        <button onClick={() => deleteMessage(message.id)}>
                          <IoTrashBin className="h-5 w-5 text-red-500 ml-5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedUI === "profile" && (
        <div className="flex w-full">
          <form className="w-1/2">
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 p-2 w-full border rounded-md"
                  defaultValue={user.phone}
                  value={formData.phone}
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                onClick={() => updateDetails()}
              >
                Save Changes
              </button>
            </div>
          </form>
          <form className="w-1/2">
            <div className="bg-white p-4 rounded shadow-md mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Details</h3>

              <div className="mb-4">
                <label
                  htmlFor="curPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="curPassword"
                  name="curPassword"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  value={curPassword}
                  onChange={(e) => {
                    setCurPassword(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                onClick={() => updatePassword()}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {addmodalOpen && (
        <AddMessageModalTrainer
          isOpen={addmodalOpen}
          onClose={() => {
            setAddModalOpen(false);
            loadMessages();
          }}
        />
      )}
    </div>
  );
};

export default TrainerDashboard;
