import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js";
Chart.register(ArcElement, Legend, Tooltip);
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { API_URL } from "../../../apiURL";
import MemberViewModal from "./MemberViewModal";
import { useNavigate } from "react-router-dom";
import { IoTrashBin } from "react-icons/io5";
import AddMessageModal from "./AddMessageModal";
import AddTrainerModal from "./AddTrainerModal";
import { GiMuscleUp } from "react-icons/gi";
import TrainerAssignModal from "./TrainerAssignModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [memberCount, setMemberCount] = useState(0);
  const [membersData, setMembersData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [trainers, setTrainers] = useState([{}]);

  const filteredMembers = membersData?.filter((member) =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // call when component mounts
  useEffect(() => {
    //get member data from backend
    getMemberCount();
    getMemberList();
    loadMessages();
    getTrainers();
  }, []);

  const getTrainers = async () => {
    const res = await axios.get(`${API_URL}/admin/trainers`);
    if (res.status === 200) {
      setTrainers(res.data.trainers);
    }
  };

  const getMemberCount = async () => {
    const res = await axios.get(`${API_URL}/admin/member-count`);
    if (res.status === 200) {
      setMemberCount(res.data.memberCount);
    }
  };
  const getMemberList = async () => {
    const res = await axios.get(`${API_URL}/admin/members`);
    if (res.status === 200) {
      setMembersData(res.data.members);
    }
  };

  const loadMessages = async () => {
    const res = await axios.get(`${API_URL}/notification`);
    if (res.status === 200) {
      console.log(res.data);
      setMessages(res.data.messages?.filter((msg) => msg.trainerId === null));
    }
  };

  //get gender count
  const genderCount = membersData?.reduce((acc, member) => {
    const gender = member.gender || "Other";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  // Chart Data
  const chartData = {
    labels: genderCount && Object.keys(genderCount),
    datasets: [
      {
        data: genderCount && Object.values(genderCount),
        backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"], // Blue, Red, Green
      },
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [addmodalOpen, setAddModalOpen] = useState(false);
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);

  const openTrainerAssignModal = (member) => {
    setIsTrainModalOpen(true);
    setSelectedMember(member);
  };

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMember = async (member) => {
    try {
      const confirm = window.confirm(
        `Are you sure you want to delete ${member.firstName} ${member.lastName}?`
      );
      if (confirm) {
        const res = await axios.delete(`${API_URL}/admin/member/${member.id}`);
        if (res.status === 200) {
          getMemberList();
        } else {
          alert("Failed to delete member");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessage = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this message?`
    );
    if (confirm) {
      const res = await axios.delete(`${API_URL}/notification/${id}`);
      if (res.status === 200) {
        loadMessages();
      } else {
        alert("Failed to delete message");
      }
    }
  };

  const deleteTrainer = async (trainer) => {
    try {
      const confirm = window.confirm(
        `Are you sure you want to delete ${trainer.firstName} ${trainer.lastName}?`
      );
      if (confirm) {
        const res = await axios.delete(
          `${API_URL}/admin/trainer/${trainer.id}`
        );
        if (res.status === 200) {
          getTrainers();
        } else {
          alert("Failed to delete trainer");
        }
      }
    } catch (err) {
      alert(
        "Trainer might assigned to a member. Cannot delete, make sure to unassign the trainer from the member first."
      );
    }
  };

  const [selectedUI, setSelectedUI] = useState("dashboard");

  const [addTrainerOpen, setAddTrainerOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-6">Admin View</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setSelectedUI("dashboard")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setSelectedUI("members")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Members
          </button>
          <button
            type="button"
            onClick={() => setSelectedUI("trainers")}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Trainers
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

      {selectedUI === "dashboard" && (
        <div className="flex justify-start gap-9">
          {/* Member Count Card */}
          <div className="bg-white p-4 rounded shadow-md mb-6 w-72">
            <h3 className="text-lg font-semibold mb-2">Total Member Count</h3>
            <div className="text-9xl text-start">{memberCount}</div>
          </div>

          {/* Pie Chart */}
          <div
            className="bg-white p-4 rounded shadow-md mb-6 
      "
          >
            <h3 className="text-lg font-semibold mb-2">Gender Distribution</h3>
            <Doughnut
              key={JSON.stringify(chartData)}
              data={chartData}
              width={"250"}
              height={"250px"}
            />
          </div>

          {/* notification table */}
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
              <table className="w-full ">
                <thead>
                  <tr className="border-b-2 border-black p-2 mb-2">
                    <th className="w-1/3 text-left px-1">Date</th>
                    <th className="w-1/3 text-center">Message</th>
                    <th className="w-1/3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="mt-4">
                  {messages?.map((message) => (
                    <tr
                      key={message.id}
                      className="pb-4 h-8 border border-b-orange-300"
                    >
                      <td className="w-1/3 text-left px-1">
                        {new Date(message.date).toLocaleDateString()}
                      </td>
                      <td className="w-1/3 text-center">{message.message}</td>
                      <td className="w-1/3 text-right gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            deleteMessage(message.id);
                          }}
                        >
                          <IoTrashBin className="h-5 w-5 text-red-500 ml-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Searchable Table */}
      {selectedUI === "members" && (
        <>
          {" "}
          <div className="bg-white p-4 rounded shadow-md">
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
                        <button onClick={() => openTrainerAssignModal(member)}>
                          <GiMuscleUp className="h-5 w-5 text-blue-500" />
                        </button>
                        <button onClick={() => openModal(member)}>
                          <FaEye className="h-5 w-5 text-green-500 ml-5" />
                        </button>
                        <button onClick={() => deleteMember(member)}>
                          <IoTrashBin className="h-5 w-5 text-red-500 ml-5" />
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
          {isTrainModalOpen && (
            <TrainerAssignModal
              isOpen={isTrainModalOpen}
              onClose={() => {
                setIsTrainModalOpen(false);
                setSelectedMember({});
              }}
              memberData={selectedMember}
              trainers={trainers}
            />
          )}
        </>
      )}
      {addmodalOpen && (
        <AddMessageModal
          isOpen={addmodalOpen}
          onClose={() => {
            setAddModalOpen(false);
            loadMessages();
          }}
        />
      )}

      {addTrainerOpen && (
        <AddTrainerModal
          isOpen={addTrainerOpen}
          onClose={() => {
            setAddTrainerOpen(false);
            getTrainers();
          }}
        />
      )}
      {/* Trainers Table */}
      {selectedUI === "trainers" && (
        <div className="bg-white p-4 rounded shadow-md">
          <div className="mt-4 flex justify-end">
            <button
              className="border bg-green-600 text-white font-bold rounded-md px-4 py-2"
              onClick={() => {
                setAddTrainerOpen(true);
              }}
            >
              + Add Trainer
            </button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Trainers</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="w-1/5 text-left">First Name</th>
                  <th className="w-1/5 text-center">Last Name</th>
                  <th className="w-1/5 text-center">Email</th>
                  <th className="w-1/5 text-center">Phone</th>
                  <th className="w-1/5 text-center">Gender</th>
                  <th className="w-1/5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="flex-col gap-2">
                {trainers.map((trainer) => (
                  <tr
                    key={trainer.id}
                    className="pb-4 h-8 border border-b-orange-300"
                  >
                    <td className="w-1/5 text-left">{trainer.firstName}</td>
                    <td className="w-1/5 text-center">{trainer.lastName}</td>
                    <td className="w-1/5 text-center">{trainer.email}</td>
                    <td className="w-1/5 text-center">{trainer.phone}</td>
                    <td className="w-1/5 text-center">{trainer.gender}</td>
                    <td className="w-1/5 text-center">
                      {" "}
                      <button onClick={() => deleteTrainer(trainer)}>
                        <IoTrashBin className="h-5 w-5 text-red-500 ml-5" />
                      </button>
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

export default AdminDashboard;
