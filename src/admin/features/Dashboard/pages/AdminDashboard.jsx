import React from "react";
import StatsCard from "../../../components/common/StatsCard";
import PageHeader from "../../../components/common/PageHeader";
import useDashboard from "../hooks/useDashboard";
import DashboardCharts from "../components/DashboardCharts";
import DataTable from "@/admin/components/common/DataTable";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const { statsData, recentOrders } = useDashboard();

  const statusConfig = {
    Pending: {
      styles: "bg-amber-100 text-amber-700",
      label: "រង់ចាំ",
    },
    Pickup: {
      styles: "bg-blue-100 text-blue-700",
      label: "បានយកទំនិញ",
    },
    Delivering: {
      styles: "bg-purple-100 text-purple-700",
      label: "កំពុងដឹក",
    },
    Completed: {
      styles: "bg-green-100 text-green-700",
      label: "បានបញ្ចប់",
    },
    Cancelled: {
      styles: "bg-red-100 text-red-700",
      label: "បានបោះបង់",
    },
  };
  const columns = [
    { header: "លេខបញ្ជាទិញ", accessor: "orderNo" },
    { header: "សរុប", render: (row) => `$${row.totalAmount || 0}` },
    {
      header: "ស្ថានភាពទូទាត់",
      render: (row) => {
        const Status =
          row.paymentStatus === "Paid"
            ? "បានទូទាត់"
            : row.paymentStatus === "Pending"
              ? "រង់ចាំ"
              : row.paymentStatus;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${row.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : row.paymentStatus === "Pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
          >
            {Status}
          </span>
        );
      },
    },
    {
      header: "ស្ថានភាព",
      render: (row) => {
        // Apply the statusConfig dictionary here instead of nested ternaries
        const config = statusConfig[row.status] || {
          styles: "bg-gray-100 text-gray-700",
          label: row.status,
        };
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${config.styles}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      header: "កាលបរិច្ឆេទបង្កើត",
      render: (row) => (
        <span className="text-sm text-slate-600">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString("km-KH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </span>
      ),
    },
    {
      header: "សកម្មភាព",
      align: "right",
      render: (row) => (
        <div className="flex justify-end space-x-2">
          <Link
            to="/admin/orders"
            className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="ទិដ្ឋភាពទូទៅ"
        description="សូមស្វាគមន៍មកវិញ! នេះជាអ្វីដែលកំពុងកើតឡើងនៅក្នុងហាងរបស់អ្នកថ្ងៃនេះ។"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
            warning={stat.warning}
            note={stat.note}
            link={stat.link}
          />
        ))}
      </div>

      <DashboardCharts />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          ការបញ្ជាទិញចុងក្រោយ
        </h2>
        <DataTable columns={columns} data={recentOrders} />
      </div>
    </div>
  );
}
