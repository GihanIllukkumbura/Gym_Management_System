import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { API_URL } from "../../../apiURL";

const AddMessageModalTrainer = ({ isOpen, onClose }) => {
  AddMessageModalTrainer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const saveMessage = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/notification/add-trainer`, {
        date: data.date,
        message: data.message,
        trainerId: localStorage.getItem("id"),
        memberId: selectedMemberId,
      });
      console.log(res);
      if (res.status === 201) {
        alert("Message sent!");
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const [members, setMembers] = useState([]);

  const loadMembers = async () => {
    const res = await axios.get(
      `${API_URL}/trainer/members/${localStorage.getItem("id")}`
    );
    if (res.status === 200) {
      setMembers(res.data.members);
    }
  };

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

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Send Message</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-600"
              >
                Select Member
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 p-2 w-full border rounded-md"
                required
                onChange={(e) => {
                  setSelectedMemberId(e.target.value);
                }}
              >
                <option value="">Select Member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <input
                placeholder="Date"
                className="p-2 border rounded-md"
                type="date"
                onChange={(e) => handleDateChange(e)}
              />
              <textarea
                placeholder="Message"
                className="p-2 border rounded-md"
                onChange={(e) => handleMessageChange(e)}
              ></textarea>
              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={() => {
                  console.log({ date, message });
                  saveMessage({ date, message });
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMessageModalTrainer;
