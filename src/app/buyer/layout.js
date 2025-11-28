"use client";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Sidebar role="buyer" />
      <div className="overflow-hidden rounded-lg  shadow-md md:ml-[290px]">
        {children}
      </div>
    </div>
  );
}
