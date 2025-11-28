"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import {
  getProductByUserId,
  deleteProduct,
} from "@/reducers/product/productSlice";
import CreateProduct from "../CreateProduct/CreateProduct";
import DeleteModal from "../DeleteProduct/DeleteProduct";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      dispatch(getProductByUserId(user.userId)).then((res) => {
        console.log("Fetched Products by User ID:", res.payload);
        setFilteredProducts(res.payload || []);
      });
    }
  }, [dispatch, user?.userId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
      setSuggestions([]);
    } else {
      const searchResults = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchResults);

      const productNames = products
        .map((product) => product.name)
        .filter((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      setSuggestions(productNames.slice(0, 5));
    }
  }, [searchQuery, products]);

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteProduct(deleteId))
        .unwrap()
        .then(() => {
          alert("Product deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product.");
        })
        .finally(() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between px-6 py-8 bg-gradient-to-r from-green-500 via-lime-400 to-emerald-600 text-white rounded-3xl shadow-lg">
        <div>
          <h3 className="text-3xl font-bold">Products List</h3>
          <p className="text-sm">Manage all your products here.</p>
        </div>

        <div className="relative w-full md:w-96 mt-4 md:mt-0">
          <div className="flex items-center bg-white rounded-lg shadow-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-4 rounded-lg text-black outline-none"
              placeholder="Search products..."
            />
            <FaSearch className="text-gray-500 mr-3" />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded-lg shadow-md w-full mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-green-100 text-black cursor-pointer"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setTimeout(() => setSuggestions([]), 100);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="py-2 px-4 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-100 transition duration-150 flex items-center space-x-2 mt-4 md:mt-0"
          onClick={() => {
            setEditProduct(null);
            setShowAddProduct(true);
          }}
        >
          <FaPlusCircle />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg rounded-3xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-green-500 to-emerald-700 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold">Icon</th>
              <th className="py-4 px-6 text-left font-semibold">Name</th>
              <th className="py-4 px-6 text-left font-semibold">Description</th>
              <th className="py-4 px-6 text-left font-semibold">Price</th>
              <th className="py-4 px-6 text-left font-semibold">Category</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id || `product-${index}`}
                  className="border-b bg-white hover:bg-green-50 transition duration-300"
                >
                  <td className="py-4 px-6">
                    <img
                      src={`http://localhost:8080/${product.imagepath}`}
                      alt={product.name || "No name"}
                      className="w-10 h-10 rounded-full shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6">{product.name}</td>
                  <td className="py-4 px-6">{product.description}</td>
                  <td className="py-4 px-6">{product.price || "N/A"}</td>
                  <td className="py-4 px-6">{product.categoryName || "N/A"}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition"
                        onClick={() => {
                          setEditProduct(product);
                          setShowAddProduct(true);
                        }}
                      >
                        <CiEdit size={18} />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                        onClick={() => {
                          setDeleteId(product.id);
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
                <td colSpan="6" className="text-center py-6">
                  No products found. Try adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddProduct && (
        <CreateProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
          initialData={editProduct}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ProductTable;
