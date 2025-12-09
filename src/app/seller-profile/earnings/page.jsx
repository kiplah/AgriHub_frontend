"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/Components/ProfileCard/ProfileCard";
import { FaArrowUp, FaArrowDown, FaMoneyBillAlt, FaWallet, FaHistory } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerMonthlyStats } from "@/reducers/Order/orderSlice";
import { fetchWallet } from "@/reducers/Wallet/walletSlice";
import { toast } from 'react-toastify';
import { Loader2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Earnings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellerMonthlyStats, loading: statsLoading } = useSelector((state) => state.orders);
  const { wallet, loading: walletLoading } = useSelector((state) => state.wallet);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchSellerMonthlyStats(user.userId));
      dispatch(fetchWallet());
    }
  }, [dispatch, user?.userId]);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    // Simulate payout request
    setTimeout(() => {
      toast.success("Payout request submitted successfully!");
      setIsWithdrawing(false);
    }, 2000);
  };

  const stats = sellerMonthlyStats || {};
  const monthlyStats = Array.isArray(stats.monthly_stats) ? stats.monthly_stats : [];

  const labels = monthlyStats.map(stat => `${stat.month}-${stat.year}`);
  const earningsDataPoints = monthlyStats.map(stat => stat.total_revenue);

  const earningsData = {
    labels,
    datasets: [
      {
        label: "Earnings Over Time",
        data: earningsDataPoints,
        borderColor: "rgba(72, 217, 157, 1)",
        backgroundColor: "rgba(72, 217, 157, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet & Payouts</h1>
          <p className="text-gray-500">Manage your earnings and transactions.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-lg text-emerald-700 font-medium flex items-center gap-2">
          <FaWallet />
          <span>Wallet Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-100 font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold mb-6">KES {wallet?.balance?.toLocaleString() || "0.00"}</h2>

            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing || !wallet?.balance || wallet?.balance <= 0}
              className="w-full bg-white text-emerald-700 font-bold py-3 rounded-xl shadow-md hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isWithdrawing && <Loader2 className="animate-spin" size={20} />}
              {isWithdrawing ? "Processing..." : "Withdraw Funds"}
            </button>
            <p className="text-xs text-emerald-200 mt-3 text-center">Payouts processed within 24 hours.</p>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-5 translate-y-5"></div>
        </div>

        {/* Monthly Earnings Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <FaMoneyBillAlt size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <h3 className="text-2xl font-bold text-gray-900">KES {stats.current_month_revenue?.toLocaleString() || "0"}</h3>
            </div>
          </div>
          {/* Growth Indicator could go here */}
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
              <FaHistory size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Clearance</p>
              <h3 className="text-2xl font-bold text-gray-900">KES 0</h3> {/* Mock for now */}
            </div>
          </div>
          <p className="text-xs text-gray-400">Funds from orders not yet delivered.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Earnings History</h3>
          <div className="h-80">
            <Line data={earningsData} options={options} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {wallet?.transactions && wallet.transactions.length > 0 ? (
              wallet.transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.transaction_type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {tx.transaction_type === 'credit' ? <FaArrowUp /> : <FaArrowDown />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tx.description || "Transaction"}</p>
                      <p className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.transaction_type === 'credit' ? '+' : '-'} {Number(tx.amount).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent transactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
