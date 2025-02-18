import { FaTimes } from "react-icons/fa";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../apiURL";

const TrainerAssignModal = ({ isOpen, onClose, memberData, trainers }) => {
  TrainerAssignModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    memberData: PropTypes.object.isRequired,
    trainers: PropTypes.array.isRequired,
  };

  const [selectedTrainerId, setSelectedTrainerId] = useState(
    memberData?.trainerId
  );
  const [selectedTrainer, setSelectedTrainer] = useState({});

  useEffect(() => {
    setSelectedTrainer(
      trainers.find((trainer) => trainer.id == selectedTrainerId)
    );
  }, [selectedTrainerId]);

  const assignTrainer = async (memberId, trainerId) => {
    try {
      const res = await axios.post(`${API_URL}/admin/member/assign-trainer`, {
        memberId,
        trainerId,
      });
      console.log(res);
      if (res.status === 201) {
        alert("Trainer assigned!");
      }
    } catch (err) {
      console.error(err);
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
        <div className="flex justify-start gap-10 ">
          <div className="w-1/3 flex-col items-start justify-start ">
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
          </div>
          <div className="flex-col w-1/3  items-start justify-start ">
            <h2 className="text-2xl font-semibold mb-4">Assign Trainer</h2>
            <div className="mb-4 w-40">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-600"
              >
                Select Trainer
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-1 p-2 w-full border rounded-md"
                required
                onChange={(e) => {
                  setSelectedTrainerId(e.target.value);
                }}
                value={selectedTrainerId}
              >
                <option value="">Select Trainer</option>
                {trainers?.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {`${trainer.firstName} ${trainer.lastName}`}
                  </option>
                ))}
              </select>

              <div>
                <button
                  type="button"
                  className="bg-green-500 text-white p-2 rounded-md mt-5 px-5"
                  onClick={() => {
                    assignTrainer(memberData.id, selectedTrainerId);
                  }}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
          {selectedTrainer && (
            <div className="flex-col w-1/3 items-start justify-start gap-10">
              <h2 className="text-2xl font-semibold mb-4">Trainer Details</h2>
              <p>
                Name:{" "}
                <strong>{`${selectedTrainer?.firstName} ${selectedTrainer.lastName}`}</strong>
              </p>
              <p>
                Email: <strong>{`${selectedTrainer?.email} `}</strong>
              </p>
              <p>
                Phone: <strong>{`${selectedTrainer?.phone} `}</strong>
              </p>
              <p>
                gender: <strong>{`${selectedTrainer?.gender} `}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerAssignModal;
