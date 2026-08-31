import React from "react";
import { Phone, MapPin, Receipt, Printer, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatusMutation, useUpdateOrderPaymentStatusMutation } from "../../../../queries/orders/useOrderQueries";
import DataTable from "../../../components/common/DataTable";
import { ReceiptText, SquarePen } from "lucide-react";

export default function OrderList({ orders, onEdit }) {
  const navigate = useNavigate();
  const updateOrderStatusMutation = useUpdateOrderStatusMutation();
  const updatePaymentStatusMutation = useUpdateOrderPaymentStatusMutation();

  const updateOrderStatus = (orderId, newStatus) => {
    updateOrderStatusMutation.mutate({ orderId, newStatus });
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    updatePaymentStatusMutation.mutate({ orderId, newPaymentStatus });
  };

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
    {
      header: "លេខសម្គាល់",
      accessor: "id",
      render: (order) => (
        <div>
          <div className="font-bold text-blue-600">#{order.id}</div>
          <div className="text-xs text-slate-400">
            {order.orderNo || `ORD-${order.orderNumber}`}
          </div>
        </div>
      ),
    },
    {
      header: "អតិថិជន",
      accessor: "customer",
      render: (order) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Phone size={12} className="text-slate-400" />
            <span>{order.customerPhone || order.phone || "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 max-w-[200px] truncate">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">
              {order.customerAddress || order.address || "—"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "សរុប",
      accessor: "totalAmount",
      render: (order) => {
        const total = Number(order.totalAmount || order.total || 0);
        return (
          <div>
            <div className="font-bold text-emerald-600 px-2.5 py-1 rounded bg-green-100">
              ${total.toFixed(2)}
            </div>
          </div>
        );
      },
    },
    {
      header: "តម្លៃទំនិញ",
      accessor: "subtotal",
      render: (order) => {
        const total = Number(order.totalAmount || 0);
        const delivery = Number(order.deliveryFee || 0);
        const subtotal = total - delivery;
        return (
          <div>
            <div className="font-bold text-red-500">${subtotal.toFixed(2)}</div>
          </div>
        );
      },
    },
    {
      header: "សេវាដឹក",
      accessor: "deliveryFee",
      render: (order) => (
        <div>
          <div className="font-bold text-slate-400">
            ${order.deliveryFee || 0}
          </div>
        </div>
      ),
    },
    {
      header: "ស្ថានភាព",
      accessor: "status",
      render: (order) => {
        const config = statusConfig[order.status] || {
          styles: "bg-gray-100 text-gray-700",
          label: order.status || "មិនស្គាល់",
        };

        return (
          <select
            value={order.status || "Pending"}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            className={`text-xs px-2.5 py-1.5 rounded-md font-bold outline-none cursor-pointer border-none ${config.styles}`}
          >
            <option value="Pending">រង់ចាំ</option>
            <option value="Pickup">បានយកទំនិញ</option>
            <option value="Delivering">កំពុងដឹក</option>
            <option value="Completed">បានបញ្ចប់</option>
            <option value="Cancelled">បានបោះបង់</option>
          </select>
        );
      },
    },
    {
      header: "ការទូទាត់",
      accessor: "paymentStatus",
      render: (order) => (
        <select
          className={`text-xs px-2 py-1 rounded-md font-bold outline-none cursor-pointer
          ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          value={order.paymentStatus}
          onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
        >
          <option value="Unpaid">មិនទាន់ទូទាត់</option>
          <option value="Paid">បានទូទាត់</option>
        </select>
      ),
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
      accessor: "actions",
      align: "right",
      render: (order) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(order)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-colors"
            title="កែប្រែ"
          >
            <SquarePen size={16} className="text-yellow-600" />
          </button>
          <button
            onClick={() => navigate(`/admin/print-receipt/${order.id}`)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
            title="វិក្កយបត្រ"
          >
            <ReceiptText size={16} className="text-red-500" />
          </button>
          <button
            onClick={() => navigate(`/admin/print-sticker/${order.id}`)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-colors"
            title="ស្ទីឃ័រ"
          >
            <Printer size={16} className="text-violet-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={[...orders].sort((a, b) => b.id - a.id)}
      keyField="id"
    />
  );
}
