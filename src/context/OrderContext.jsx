import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();
const INITIAL_ORDERS = [
  {
    id: "1",
    orderNumber: "00007",
    status: "Pending",
    customerName: "អតិថិជនទូទៅ",
    phone: "0965134829",
    address: "ssssssssss",
    subtotal: 113.0,
    delivery: 0.01,
    total: 113.01,
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    date: "2026-08-20",
    time: "09:58:30",
    items: [],
  },
  {
    id: "2",
    orderNumber: "00008",
    status: "Completed",
    customerName: "Chantha Leang",
    phone: "012345678",
    address: "Phnom Penh",
    subtotal: 50.0,
    delivery: 1.5,
    total: 51.5,
    paymentStatus: "Paid",
    paymentMethod: "Card",
    date: "2026-08-20",
    time: "10:30:00",
    items: [],
  },
  {
    id: "3",
    orderNumber: "00009",
    status: "Cancelled",
    customerName: "Sokha Rin",
    phone: "098765432",
    address: "Siem Reap",
    subtotal: 25.0,
    delivery: 2.0,
    total: 27.0,
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    date: "2026-08-20",
    time: "11:15:00",
    items: [],
  },
  {
    id: "4",
    orderNumber: "000010",
    status: "Pending",
    customerName: "Malis Pov",
    phone: "0965134829",
    address: "ssssssssss",
    subtotal: 113.0,
    delivery: 0.01,
    total: 113.01,
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    date: "2026-08-20",
    time: "09:58:30",
    items: [],
  },
  {
    id: "5",
    orderNumber: "000011",
    status: "Completed",
    customerName: " ",
    phone: "012345678",
    address: "Phnom Penh",
    subtotal: 50.0,
    delivery: 1.5,
    total: 51.5,
    paymentStatus: "Paid",
    paymentMethod: "Card",
    date: "2026-08-20",
    time: "10:30:00",
    items: [],
  },
  {
    id: "6",
    orderNumber: "000012",
    status: "Cancelled",
    customerName: "",
    phone: "098765432",
    address: "Siem Reap",
    subtotal: 25.0,
    delivery: 2.0,
    total: 27.0,
    paymentStatus: "Unpaid",
    paymentMethod: "Cash",
    date: "2026-08-20",
    time: "11:15:00",
    items: [],
  },
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const topSellingProducts = orders
    .filter((order) => order.paymentStatus === "Paid")
    .flatMap((order) => order.items || [])
    .reduce((acc, item) => {
      const productId = item.productId;

      const existingProduct = acc.find(
        (product) => product.productId === productId,
      );

      if (existingProduct) {
        existingProduct.quantity += Number(item.quantity || 0);
      } else {
        acc.push({
          productId,
          name: item.name,
          quantity: Number(item.quantity || 0),
        });
      }

      return acc;
    }, [])
    .sort((a, b) => b.quantity - a.quantity);

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const addOrder = ({
    items,
    subtotal,
    delivery,
    paymentMethod,
    customerInfo,
  }) => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    const maxId = orders.reduce((max, o) => {
      const n = parseInt(o.id, 10);
      return !isNaN(n) && n > max ? n : max;
    }, 0);
    const nextId = String(maxId + 1);
    const maxNum = orders.reduce((max, o) => {
      const n = parseInt(o.orderNumber, 10);
      return n > max ? n : max;
    }, 0);
    const orderNumber = String(maxNum + 1).padStart(5, "0");

    const total = (Number(subtotal) || 0) + (Number(delivery) || 0);

    const newOrder = {
      id: nextId,
      orderNumber,
      status: "Pending",
      customerName: customerInfo.name || customerInfo.customerName || "",
      phone: customerInfo.phone,
      address: customerInfo.address,
      subtotal: Number(subtotal) || 0,
      delivery: Number(delivery) || 0,
      total,
      paymentStatus: "Unpaid",
      paymentMethod: paymentMethod || "Cash",
      date,
      time,
      items,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((orders) =>
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    if (newPaymentStatus === "Paid") {
      Swal.fire({
        icon: "question",
        title: "Confirm Payment",
        text: "Are you sure this order has been paid?",
        showCancelButton: true,
        confirmButtonText: "Yes, Paid",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setOrders((orders) =>
            orders.map((order) =>
              order.id === orderId
                ? { ...order, paymentStatus: "Paid" }
                : order,
            ),
          );

          Swal.fire({
            icon: "success",
            title: "Payment Updated",
            text: "Payment status is now Paid.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    } else {
      setOrders((orders) =>
        orders.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: "Unpaid" } : order,
        ),
      );
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        addOrder,
        totalRevenue,
        topSellingProducts,
        updateOrderStatus,
        updatePaymentStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  return useContext(OrderContext);
}
