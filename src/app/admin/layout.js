"use client";
import AdminSidebar from "@/Components/AdminSidebar/AdminSidebar";

export default function RootLayout({ children }) {
  return (
    <div>
      <AdminSidebar/>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md md:ml-[300px]">
        {children}
      </div>
    </div>
  );
}
