"use client";
import Sidebar from "@/Components/Sidebar/Sidebar";
import DashboardHeader from "@/Components/DashboardHeader/DashboardHeader";

export default function RootLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar role="seller" />

      <div className="flex-1 flex flex-col md:ml-[290px] min-h-screen transition-all duration-300">
        <DashboardHeader />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
