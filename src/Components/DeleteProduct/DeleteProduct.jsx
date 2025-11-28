"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  confirmDelete,
}) => {
  const handleDelete = async () => {
    try {
      await confirmDelete();
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showDeleteModal ? "block" : "hidden"
      }`}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-center">
        <div
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => setShowDeleteModal(false)}
        >
          <FaTimes size={24} />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Delete User
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
