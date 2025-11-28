"use client";
import Link from "next/link";
import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../utilities/CartContext";
import { logout } from "@/reducers/Auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const [bg, setBg] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch =useDispatch();
  const { username,role,token } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user || {});
  const router=useRouter();
  const pathname = usePathname();

    const cartRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
  
      if (showDropdown) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showDropdown]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBg(true);
      } else {
        setBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavbar = () => {
    setShowNav(!showNav);
  };
  
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBg(true);
      } else {
        setBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to log out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);
const HandleProfile=()=>{
  const normalizedRole = role?.toLowerCase();
  if (normalizedRole === "admin") {
    router.push("/admin");
  } else if (normalizedRole === "buyer") {
    router.push("/buyer");
  } else if (normalizedRole === "seller") {
    router.push("/seller-profile");
  }
}
const HandleOrder=()=>{
  const normalizedRole = role?.toLowerCase();
  if (normalizedRole === "buyer") {
    router.push("/buyer/orders");
  } else if (normalizedRole === "seller") {
    router.push("/seller-profile/orders");
  }
}
  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div
      className={`${
        bg ? "bg-white shadow-lg" : "bg-transparent"
      } w-full  transition-colors duration-300 fixed  z-50`}
    >
        
      <div className="mx-auto w-[80%] relative">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center py-4">
          <div>
            <img
              src="/logo.png"
              alt="Logo"
              width="170px"
            onClick={() => window.location.href = '/'}

              className={`transition-all duration-300 ease-in-out drop-shadow-md ${
                bg
                  ? "hover:drop-shadow-[0_4px_20px_rgba(76,175,80,1)] "
                  : "hover:drop-shadow-[0px_4px_20px_rgba(255,255,255,1)]"
              } rounded-lg"`}
            />
          </div>

          {!token && (
            <div className="hidden md:flex flex-col md:flex-row gap-3 text-base pt-4 items-center">
              {[
                { label: "Become a Buyer", href: "/login" },
                { label: "Become a Seller", href: "/login" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative inline-block py-2.5 px-6 text-base font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-700 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 rounded-full transition-opacity duration-300 hover:opacity-10"></span>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
            <div className="flex items-center gap-4 md:gap-6">
            {token && (
              <div className="relative group flex items-center gap-4">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FaUser
                    className={`text-2xl ${
                      bg ? "text-black" : "text-white"
                    } hover:scale-110 transition-transform`}
                  />
                  {user.username && (
                    <span
                      className={`${
                        bg ? "text-black" : "text-white"
                      } font-medium text-sm`}
                    >
                      {user.username}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full right-0 mt-2 w-40 py-2 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-300 z-50"
                  >
                    <p className="cursor-pointer hover:bg-green-50 hover:text-green-700 py-2 px-4 transition-colors duration-200" onClick={HandleProfile}>My Profile</p>
                    <p className="cursor-pointer hover:bg-green-50 hover:text-green-700 py-2 px-4 transition-colors duration-200" onClick={HandleOrder}>Orders</p>
                    <p onClick={handleLogout} className="cursor-pointer hover:bg-red-50 hover:text-red-700 py-2 px-4 transition-colors duration-200">Logout</p>
                  </div>
                )}
              </div>
            )}


          
              {token && (
                <div className="relative" ref={cartRef}>
  <FaShoppingCart
    onClick={toggleCart}
    className={`text-2xl cursor-pointer ${bg ? "text-black" : "text-white"}`}
  />
  {totalQuantity > 0 && (
    <div className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {totalQuantity}
    </div>
  )}
  {showCart && (
    <div className="absolute right-0 mt-2 w-96 bg-gradient-to-b from-green-100 via-white to-green-50 shadow-2xl rounded-lg p-6 z-50 border-4 border-green-400">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h11M9 21V3M17 10h4m-4 0l4 4m-4-4l4-4"
            />
          </svg>
          Your Cart
        </h3>
        <button
          onClick={toggleCart}
          className="text-red-500 hover:text-red-700 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="max-h-60 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover border-2 border-green-300"
                  />
                  <div>
                    <p className="font-bold text-green-700 text-sm">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.price)}
                    className="px-3 py-1 text-sm bg-yellow-300 hover:bg-yellow-400 text-yellow-800 rounded shadow-md"
                  >
                    -
                  </button>
                  <span className="font-bold text-green-700">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id, item.price)}
                    className="px-3 py-1 text-sm bg-green-300 hover:bg-green-400 text-green-800 rounded shadow-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md">
            <p className="text-right font-bold text-green-800 text-lg">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleClearCart}
              className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              Clear Cart
            </button>
            <Link href="/checkout" passHref>
            <button className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
              Checkout
            </button></Link>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-green-600 font-medium">
            Your cart is empty.
            <br />
            Add some seeds, fertilizers, or machines!
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-400 mx-auto mt-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M10 14h10M4 14h2m0 0v6m0-6h4"
            />
          </svg>
        </div>
      )}
    </div>
  )}
</div>
              )}
            </div>
          

          <div
            className="md:hidden absolute top-[50px] right-0  p-2"
            onClick={handleNavbar}
          >
            <span
              className={`block w-[30px] h-1 ${
                bg ? "bg-black" : "bg-white"
              } mb-1 rounded-full`}
            ></span>
            <span
              className={`block w-[30px] h-1 ${
                bg ? "bg-black" : "bg-white"
              } mb-1 rounded-full`}
            ></span>
            <span
              className={`block w-[30px] h-1 ${
                bg ? "bg-black" : "bg-white"
              } mb-1 rounded-full`}
            ></span>
          </div>
        </div>
        <div
          className={`${
            showNav
              ? "fixed z-50 left-0 top-0 bg-white w-full sm:w-[90%] h-screen py-8 px-3 "
              : "relative md:flex flex-col md:flex-row  py-1 "
          } ${bg ? "border-t md:border-black" : "border-t md:border-white"}`}
        >
          <div
            className={`${
              showNav ? "block absolute right-[30px] top-[30px]" : "hidden"
            }`}
            onClick={handleNavbar}
          >
            <ImCross style={{ color: "#017d29", fontSize: "20px" }} />
          </div>
          {!token && (
            <div
              className={`${
                showNav ? "flex" : "hidden"
              }  flex-wrap flex-rows mb-6  gap-3 text-base pt-4 items-center justify-center`}
            >
              {[
                { label: "Become a Buyer", href: "/login" },
                { label: "Become a Seller", href: "/login" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative inline-block py-2.5 px-6 text-base font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-green-700 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br focus:ring-2 focus:ring-teal-300 focus:outline-none"
                >
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 rounded-full transition-opacity duration-300 hover:opacity-10"></span>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>
          )}
          <ul
            className={`${
              showNav ? "block" : "hidden"
            } w-full md:flex  flex-col md:flex-row justify-around  mx-auto ${
              bg ? "text-black gap-10 " : "text-[#017d29] md:text-white "
            }`}
          >
            <Link href="/">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>HOME</strong>
              </li>
            </Link>
            <Link href="/pesticides">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/pesticides' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>PESTICIDES</strong>
              </li>
            </Link>
            <Link href="/seeds">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/seeds' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>SEEDS</strong>
              </li>
            </Link>
            <Link href="/fertilizers">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/fertilizers' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>FERTILIZERS</strong>
              </li>
            </Link>
            <Link href="/machines">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/machines' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>MACHINES</strong>
              </li>
            </Link>
            <Link href="/aboutUs">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/aboutUs' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>ABOUT US</strong>
              </li>
            </Link>
            <Link href="/contact-us">
              <li className={`hover:border-b-2 border-current p-2 ${pathname === '/contact-us' ? 'border-b-2 border-green-500 text-green-600' : ''}`}>
                <strong>CONTACT US</strong>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
