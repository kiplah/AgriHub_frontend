"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setToken } from "../reducers/Auth/authSlice";

const Authentication = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { token, role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const restrictedRoutes = ["/admin", "/seller-profile", "/buyer"]; // Routes that require authentication
  const roleBasedRoutes = {
    admin: ["/admin"],
    seller: ["/seller-profile"],
    buyer: ["/buyer"],
  };

  /**
   * Load token and role from localStorage during initial render
   */
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");

    if (savedToken) {
      dispatch(setToken(savedToken)); // This will decode token and set role automatically
    }

    // Add a small delay to show the loading screen
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  /**
   * Handle authentication and role-based routing
   */
  useEffect(() => {
    if (loading) return; // Wait for initial load to complete

    const isRestrictedRoute = restrictedRoutes.includes(pathname);

    if (!token && isRestrictedRoute) {
      router.push("/login");
      return;
    }

    if (token && role) {
      const normalizedRole = role.toLowerCase();
      const allowedRoutes = roleBasedRoutes[normalizedRole] || [];
      const isProtectedRoute = Object.values(roleBasedRoutes)
        .flat()
        .includes(pathname);

      if (isProtectedRoute && !allowedRoutes.includes(pathname)) {
        router.push(allowedRoutes[0] || "/");
      }
    }
  }, [loading, token, role, pathname, router]);

  /**
   * Show loading screen during initial authentication
   */
  if (loading) {
    return (
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1296882154/vector/green-abstract-layers-background.jpg?s=612x612&w=0&k=20&c=GdVbshVWQXddCpjLdjMTpHvDK2s1C4p7BfhGtpqObEY=')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-lg">
          <div className="relative flex items-center flex-col gap-12 justify-center h-32 w-32 mb-6">
            <h1 className="text-3xl font-extrabold text-green-200">
              Authenticating AgroMart...
            </h1>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
              <div
                className="w-4 h-4 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-4 h-4 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Authentication;
