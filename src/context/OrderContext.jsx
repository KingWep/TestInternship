import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { orderService } from "../services/orderService";

const OrderContext = createContext();
// const INITIAL_ORDERS = [
//   {
//     id: "1",
//     orderNumber: "00007",
//     status: "Pending",
//     customerName: "អតិថិជនទូទៅ",
//     phone: "0965134829",
//     address: "ssssssssss",
//     subtotal: 113.0,
//     delivery: 0.01,
//     total: 113.01,
//     paymentStatus: "Unpaid",
//     paymentMethod: "Cash",
//     date: "2026-08-20",
//     time: "09:58:30",
//     items: [],
//   },
//   {
//     id: "2",
//     orderNumber: "00008",
//     status: "Completed",
//     customerName: "Chantha Leang",
//     phone: "012345678",
//     address: "Phnom Penh",
//     subtotal: 50.0,
//     delivery: 1.5,
//     total: 51.5,
//     paymentStatus: "Paid",
//     paymentMethod: "Card",
//     date: "2026-08-20",
//     time: "10:30:00",
//     items: [],
//   },
//   {
//     id: "3",
//     orderNumber: "00009",
//     status: "Cancelled",
//     customerName: "Sokha Rin",
//     phone: "098765432",
//     address: "Siem Reap",
//     subtotal: 25.0,
//     delivery: 2.0,
//     total: 27.0,
//     paymentStatus: "Unpaid",
//     paymentMethod: "Cash",
//     date: "2026-08-20",
//     time: "11:15:00",
//     items: [],
//   },
//   {
//     id: "4",
//     orderNumber: "000010",
//     status: "Pending",
//     customerName: "Malis Pov",
//     phone: "0965134829",
//     address: "ssssssssss",
//     subtotal: 113.0,
//     delivery: 0.01,
//     total: 113.01,
//     paymentStatus: "Unpaid",
//     paymentMethod: "Cash",
//     date: "2026-08-20",
//     time: "09:58:30",
//     items: [],
//   },
//   {
//     id: "5",
//     orderNumber: "000011",
//     status: "Completed",
//     customerName: " ",
//     phone: "012345678",
//     address: "Phnom Penh",
//     subtotal: 50.0,
//     delivery: 1.5,
//     total: 51.5,
//     paymentStatus: "Paid",
//     paymentMethod: "Card",
//     date: "2026-08-20",
//     time: "10:30:00",
//     items: [],
//   },
//   {
//     id: "6",
//     orderNumber: "000012",
//     status: "Cancelled",
//     customerName: "",
//     phone: "098765432",
//     address: "Siem Reap",
//     subtotal: 25.0,
//     delivery: 2.0,
//     total: 27.0,
//     paymentStatus: "Unpaid",
//     paymentMethod: "Cash",
//     date: "2026-08-20",
//     time: "11:15:00",
//     items: [],
//   },
// ];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.getOrders();
      const apiOrders = response?.data || response || [];
      setOrders(Array.isArray(apiOrders) ? apiOrders : []);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const addOrder = async ({
    items,
    subtotal,
    delivery,
    customerInfo,
  }) => {
    try {
      const payload = {
        customerPhone: customerInfo.phone || "",
        customerAddress: customerInfo.address || "",
        deliveryFee: Number(delivery) || 0,
        items: items.map(item => ({
          productId: Number(item.productId || item.id),
          quantity: Number(item.quantity)
        }))
      };

      const response = await orderService.createOrder(payload);
      // Wait for backend to return the created order (or at least id)
      // Assuming response contains the created order data
      const newOrder = response?.data || response;
      
      // Update local state by re-fetching to get all fields accurately
      // Or just append it if we trust the response
      setOrders((prev) => [newOrder, ...prev]);
      
      // We return the newOrder so the caller has the new ID (e.g. for printing receipt)
      return newOrder;
    } catch (error) {
      console.error("Failed to create order", error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;
    
    // Save previous state for rollback
    const previousOrders = [...orders];
    
    // Optimistic UI update
    setOrders((orders) =>
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    try {
      await orderService.updateOrder(orderId, { ...orderToUpdate, status: newStatus });
      Swal.fire({
        icon: "success",
        title: "បានធ្វើបច្ចុប្បន្នភាព",
        text: `ស្ថានភាពត្រូវបានប្តូរទៅជា ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update status", error);
      // Rollback
      setOrders(previousOrders);
      Swal.fire({
        icon: "error",
        title: "បរាជ័យ!",
        text: "មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាពស្ថានភាព",
      });
    }
  };

  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;

    if (newPaymentStatus === "Paid") {
      const result = await Swal.fire({
        icon: "question",
        title: "Confirm Payment",
        text: "Are you sure this order has been paid?",
        showCancelButton: true,
        confirmButtonText: "Yes, Paid",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const previousOrders = [...orders];
        setOrders((orders) =>
          orders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus: "Paid" } : order,
          ),
        );
        try {
          await orderService.updateOrder(orderId, { ...orderToUpdate, paymentStatus: "Paid" });
          Swal.fire({
            icon: "success",
            title: "Payment Updated",
            text: "Payment status is now Paid.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          setOrders(previousOrders);
          Swal.fire({ icon: "error", title: "បរាជ័យ!", text: "Error updating payment status" });
        }
      }
    } else {
      const previousOrders = [...orders];
      setOrders((orders) =>
        orders.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: "Unpaid" } : order,
        ),
      );
      try {
        await orderService.updateOrder(orderId, { ...orderToUpdate, paymentStatus: "Unpaid" });
        Swal.fire({
          icon: "success",
          title: "បានធ្វើបច្ចុប្បន្នភាព",
          text: "ការទូទាត់ត្រូវបានប្តូរទៅជា មិនទាន់ទូទាត់ (Unpaid)",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        setOrders(previousOrders);
        Swal.fire({ icon: "error", title: "បរាជ័យ!", text: "Error updating payment status" });
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        loading,
        error,
        refreshOrders: fetchOrders,
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
