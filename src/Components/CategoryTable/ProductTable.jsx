"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch, CiEdit } from "react-icons/ci";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import {
  fetchCategories,
  deleteCategory,
} from "@/reducers/Category/categorySlice";
import CreateCategory from "../CreateCategory/CreateCategory";
import DeleteModal from "../DeleteProduct/DeleteProduct";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.category);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categories) return;

    const results = categories.filter((category) =>
      category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(results);

    if (searchTerm.length > 0) {
      setSuggestions(results.map((category) => category.name).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, categories]);

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteCategory(deleteId))
        .unwrap()
        .then(() => {
          alert("Category deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
          alert("Failed to delete category.");
        })
        .finally(() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between px-6 py-8 bg-gradient-to-r from-green-500 via-lime-400 to-emerald-600 text-white rounded-3xl shadow-lg">
        <div>
          <h3 className="text-3xl font-bold">Categories List</h3>
          <p className="text-sm">Manage all your categories here.</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <button
            className="py-2 px-4 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-100 transition duration-150 flex items-center space-x-2"
            onClick={() => {
              setEditCategory(null);
              setShowAddCategory(true);
            }}
          >
            <FaPlusCircle />
            <span>Add New Category</span>
          </button>

          <div className="relative">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-[200px] md:w-[250px] px-4 py-2 border text-black border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-green-600 hover:bg-green-700 text-BLACK px-4 py-2 rounded-r-lg">
                <CiSearch size={22} />
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-lg shadow-md w-full mt-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-green-100 text-black cursor-pointer"
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setTimeout(() => setSuggestions([]), 100);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-3xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-green-500 to-emerald-700 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Icon</th>
              <th className="py-4 px-6 text-left font-semibold">Name</th>
              <th className="py-4 px-6 text-left font-semibold">Description</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b bg-white hover:bg-green-50 transition duration-300"
                >
                  <td className="py-4 px-6">
                    <img
                      src={`http://localhost:8080/${category.imagepath}`}
                      alt={category.name || "No name"}
                      className="w-10 h-10 rounded-full shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6">{category.name}</td>
                  <td className="py-4 px-6">{category.description}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300"
                        onClick={() => {
                          setEditCategory(category);
                          setShowAddCategory(true);
                        }}
                      >
                        <CiEdit size={18} />
                      </button>

                      <button
                        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition duration-300"
                        onClick={() => {
                          setDeleteId(category.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No categories found. Try adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateCategory
        showAddCategory={showAddCategory}
        setShowAddCategory={setShowAddCategory}
        initialCategory={editCategory}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default ProductTable;
