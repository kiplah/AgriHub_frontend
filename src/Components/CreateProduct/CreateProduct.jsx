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

  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [leafCategory, setLeafCategory] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    image: null,
    userId: user?.userId || localStorage.getItem("userId") || null,
    // New Fields
    variety: initialData?.variety || "",
    breed: initialData?.breed || "",
    quantity_available: initialData?.quantity_available || "",
    unit: initialData?.unit || "",
    location: initialData?.location || "",
    delivery_options: initialData?.delivery_options || "",
    moisture_content: initialData?.moisture_content || "",
    age: initialData?.age || "",
    weight: initialData?.weight || "",
    brand: initialData?.brand || "",
    packaging_size: initialData?.packaging_size || "",
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
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    // Send the ID of the selected leaf category, or sub category if no leaf
    data.append("category", leafCategory || subCategory);
    data.append("price", formData.price);
    data.append("userId", formData.userId);

    // Append new fields
    data.append("variety", formData.variety);
    data.append("breed", formData.breed);
    data.append("quantity_available", formData.quantity_available);
    data.append("unit", formData.unit);
    data.append("location", formData.location);
    data.append("delivery_options", formData.delivery_options);
    data.append("moisture_content", formData.moisture_content);
    data.append("age", formData.age);
    data.append("weight", formData.weight);
    data.append("brand", formData.brand);
    data.append("packaging_size", formData.packaging_size);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (initialData?.id) {
        await dispatch(updateProduct({ id: initialData.id, formData: data })).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success("Product created successfully!");
      }
      await dispatch(getProducts()).unwrap();
      setShowAddProduct(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred.");
      toast.error(err.message || "Failed to save product.");
    }
  };

  // Helper to get subcategories of selected main
  const getSubcategories = () => {
    const main = categories.find(c => c.id == mainCategory); // Loose equality for string/number match
    return main?.subcategories || [];
  };

  // Helper to get leaf categories (children of sub)
  const getLeafCategories = () => {
    const sub = getSubcategories().find(c => c.id == subCategory);
    return sub?.subcategories || [];
  };

  const isLivestock = () => {
    // Check if "Livestock" is anywhere in the path
    const main = categories.find(c => c.id == mainCategory);
    if (main?.name === "FARM PRODUCE") {
      const sub = main.subcategories?.find(c => c.id == subCategory);
      return sub?.name === "Livestock";
    }
    return false;
  };

  const isFarmInput = () => {
    const main = categories.find(c => c.id == mainCategory);
    return main?.name === "FARM INPUTS";
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 z-50 ${showAddProduct ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <form
        className="relative max-w-4xl w-[90%] md:w-[800px] h-[90vh] overflow-y-auto bg-gradient-to-br from-green-900 via-emerald-700 to-lime-500 text-white rounded-3xl shadow-2xl p-8 space-y-6 scrollbar-hide"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors text-xl font-bold"
          onClick={() => setShowAddProduct(false)}
        >
          X
        </button>

        <h2 className="text-3xl font-bold text-center text-green-300">
          {initialData?.id ? "Edit Product" : "Post a Product"}
        </h2>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Main Category</label>
            <select
              value={mainCategory}
              onChange={(e) => { setMainCategory(e.target.value); setSubCategory(""); setLeafCategory(""); }}
              className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option className="bg-green-800" value="">Select...</option>
              {categories.map((cat) => (
                <option key={cat.id} className="bg-green-800" value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Subcategory</label>
            <select
              value={subCategory}
              onChange={(e) => { setSubCategory(e.target.value); setLeafCategory(""); }}
              className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={!mainCategory}
              required
            >
              <option className="bg-green-800" value="">Select...</option>
              {getSubcategories().map((cat) => (
                <option key={cat.id} className="bg-green-800" value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Type/Group</label>
            <select
              value={leafCategory}
              onChange={(e) => setLeafCategory(e.target.value)}
              className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={!subCategory || getLeafCategories().length === 0}
            >
              <option className="bg-green-800" value="">Select (Optional)...</option>
              {getLeafCategories().map((cat) => (
                <option key={cat.id} className="bg-green-800" value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Core Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. Yellow Maize"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">{isLivestock() ? "Breed" : "Variety"}</label>
            <input
              type="text"
              name={isLivestock() ? "breed" : "variety"}
              value={isLivestock() ? formData.breed : formData.variety}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              placeholder={isLivestock() ? "e.g. Friesian" : "e.g. H614"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Quantity Available</label>
            <input
              type="text" // Text to allow "500"
              name="quantity_available"
              value={formData.quantity_available}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. 50"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. Kg, Bag, Piece"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Price per Unit (KES)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        </div>

        {/* Location and Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white placeholder-green-100 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g. Nairobi, Nakuru"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Delivery Options</label>
            <select
              name="delivery_options"
              value={formData.delivery_options}
              onChange={handleInputChange}
              className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-green-400 bg-green-800"
            >
              <option value="" className="bg-green-800">Select...</option>
              <option value="Pickup Only" className="bg-green-800">Pickup Only</option>
              <option value="Delivery Available" className="bg-green-800">Delivery Available</option>
              <option value="Arranged" className="bg-green-800">To be Arranged</option>
            </select>
          </div>
        </div>

        {/* Optional Details based on Types */}
        <div className="p-4 bg-white bg-opacity-10 rounded-xl border border-white/20">
          <h3 className="text-lg font-bold mb-3 text-yellow-300">Optional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLivestock() && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none"
                  placeholder="e.g. 2 years, 3 months"
                />
              </div>
            )}
            {/* Moisture - simplified check for 'Grains' or Main=Farm Produce & Sub!=Livestock */}
            {!isLivestock() && !isFarmInput() && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Moisture Content</label>
                <input
                  type="text"
                  name="moisture_content"
                  value={formData.moisture_content}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none"
                  placeholder="e.g. 13% (for grains)"
                />
              </div>
            )}
            {isFarmInput() && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none"
                  placeholder="e.g. Bayer, Syngenta"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Packaging Size / Weight</label>
              <input
                type="text"
                name="packaging_size"
                value={formData.packaging_size}
                onChange={handleInputChange} // Or use 'weight' field?
                // Mapping to packaging_size or weight based on preference
                className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none"
                placeholder="e.g. 50kg bag, 1L bottle"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="text-right">
          <button
            type="submit"
            className="px-8 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-green-700 shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-800 focus:ring-4 focus:ring-green-500 transition-all"
          >
            {initialData?.id ? "Update Product" : "Post Product"}
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
