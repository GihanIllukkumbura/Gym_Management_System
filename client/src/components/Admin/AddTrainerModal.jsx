import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../../../apiURL";

const AddTrainerModal = ({ isOpen, onClose }) => {
  AddTrainerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [user] = useState({});
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    password: user.password,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTrainer = async () => {
    try {
      const res = await axios.post(`${API_URL}/admin/trainer/add`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      console.log(res);
      if (res.status === 201) {
        alert("Trainer added!");
        onClose();
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

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2">Trainer Details</h3>
          <form className="w-full">
            <div className="bg-white p-4 rounded shadow-md mt-6">
              <div className="flex gap-8 ">
                <div className="flex-col w-1/2">
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
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex-col w-1/2">
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
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 w-full border rounded-md"
                      defaultValue={user.password}
                      value={formData.password}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                onClick={() => addTrainer()}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTrainerModal;
