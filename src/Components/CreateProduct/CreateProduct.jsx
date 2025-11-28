import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "@/reducers/product/productSlice";
import { fetchCategories } from "@/reducers/Category/categorySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = ({ showAddProduct, setShowAddProduct, initialData }) => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    categoryName: initialData?.category_name || "",
    price: initialData?.price || "",
    image: null,
    userId: user?.userId || localStorage.getItem("userId") || null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories())
      .then(() => console.log("Categories fetched"))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [dispatch]);

  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({ ...prev, userId: user.userId }));
    } else if (localStorage.getItem("userId")) {
      setFormData((prev) => ({
        ...prev,
        userId: localStorage.getItem("userId"),
      }));
    } else {
      console.error("User ID is missing in both Redux and localStorage!");
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    setFormData({ ...formData, categoryName: selectedCategoryName });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.userId) {
      toast.error("User ID is missing. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryName", formData.categoryName);
    data.append("price", formData.price);
    data.append("userId", formData.userId);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (initialData?.id) {
        // Update product
        await dispatch(updateProduct({ id: initialData.id, formData: data })).unwrap();
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // Create product
        await dispatch(createProduct(data)).unwrap();
        toast.success("Product created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      await dispatch(getProducts()).unwrap();

      if (typeof setShowAddProduct === "function") {
        setShowAddProduct(false);
      } else {
        console.error("setShowAddProduct is not a function!");
      }
      
    } catch (err) {
      console.error("Full error details:", err); // Log the entire error
      console.error("Error message:", err.message); // Log specific message
    
      setError(err.message || "An error occurred while processing the request.");
    
      toast.error(
        err.message || "Failed to create or update the product. Please try again.",
        { position: "top-right", autoClose: 3000 }
      );
    }
    
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
        showAddProduct ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <form
        className="relative max-w-4xl w-[600px] bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 text-white rounded-3xl shadow-2xl p-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
          onClick={() => setShowAddProduct(false)}
        >
          X
        </button>

        <h2 className="text-3xl font-bold text-center text-green-300">
          {initialData?.id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400 focus:bg-opacity-30 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows="4"
            className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-30 transition-all"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Category</label>
          <select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleCategoryChange}
            className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-opacity-30 transition-all"
          >
            <option className="bg-green-800" value="">
              Select category
            </option>
            {categories?.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} className="bg-green-800" value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option className="bg-green-800" disabled>
                No categories available
              </option>
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400 focus:bg-opacity-30 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-pink-400 focus:bg-opacity-30 transition-all"
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="text-right">
          <button
            type="submit"
            className="px-8 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-green-700 shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-800 focus:ring-4 focus:ring-green-500 transition-all"
          >
            {initialData?.id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

CreateProduct.propTypes = {
  showAddProduct: PropTypes.bool.isRequired,
  setShowAddProduct: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CreateProduct;
