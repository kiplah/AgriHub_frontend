"use client";
import React, { useEffect, useState ,useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch, CiEdit } from "react-icons/ci";
import { FaTrash, FaPlusCircle, FaSearch } from "react-icons/fa";
import { getProducts, deleteProduct } from "@/reducers/product/productSlice";
import CreateProduct from "../CreateProduct/CreateProduct";
import DeleteModal from "../DeleteProduct/DeleteProduct";

const ProductTable = ({ name = "Products", category }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = products || [];
  
    if (category) {
      filtered = filtered.filter((product) => product.categoryName === category);
    }
  
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const productNames = filtered.map((product) => product.name);
      setSuggestions(productNames.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  
    setFilteredProducts(filtered);
  }, [searchQuery, products, category]);
  
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
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between px-6 py-8 bg-gradient-to-r from-green-500 via-lime-400 to-emerald-600 text-white rounded-3xl shadow-lg">
        <div>
          <h3 className="text-3xl font-bold">Products List</h3>
          <p className="text-sm">Manage all your products here.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <button
            className="py-2 px-4 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-100 transition duration-150 flex items-center space-x-2"
            onClick={() => {
              setEditProduct(null);
              setShowAddProduct(true);
            }}
          >
            <FaPlusCircle />
            <span>Add New Product</span>
          </button>

          <div className="flex items-center mt-3 md:mt-0">
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg">
              <CiSearch size={22} />
            </button>
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
              <th className="py-4 px-6 text-left font-semibold">Price</th>
              <th className="py-4 px-6 text-left font-semibold">Category</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id || product._id || index}
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
                  <td className="py-4 px-6">{product.price}</td>
                  <td className="py-4 px-6">{product.categoryName}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition duration-300"
                        onClick={() => {
                          setEditProduct(product);
                          setShowAddProduct(true);
                        }}
                      >
                        <CiEdit size={18} />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition duration-300"
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
