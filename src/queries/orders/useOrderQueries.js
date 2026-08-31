import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../../services/orderService';
import { orderKeys } from './orderKeys';
import Swal from 'sweetalert2';
import { useMemo } from 'react';

export function useOrdersQuery(params = {}) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: async () => {
      const response = await orderService.getOrders(params);
      const apiOrders = response?.data || response || [];
      return Array.isArray(apiOrders) ? apiOrders : [];
    },
  });
}

// Custom hook to encapsulate the derived business logic exactly as it was in OrderContext
export function useOrderStats() {
  const { data: orders = [] } = useOrdersQuery();

  const topSellingProducts = useMemo(() => {
    return orders
      .filter((order) => order.paymentStatus === "Paid")
      .flatMap((order) => order.orderDetails || order.items || []) // Handle both field names
      .reduce((acc, item) => {
        const productId = item.productId || item.product_id || item.id;

        const existingProduct = acc.find(
          (product) => product.productId === productId
        );

        if (existingProduct) {
          existingProduct.quantity += Number(item.quantity || 0);
        } else {
          acc.push({
            productId,
            name: item.name || '',
            quantity: Number(item.quantity || 0),
          });
        }

        return acc;
      }, [])
      .sort((a, b) => b.quantity - a.quantity);
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  }, [orders]);

  return { topSellingProducts, totalRevenue };
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ items, subtotal, delivery, customerInfo }) => {
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
      return response?.data || response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    }
  });
}

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, formData }) => {
      const response = await orderService.updateOrder(orderId, formData);
      return response?.data || response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    }
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, newStatus }) => {
      const previousOrders = queryClient.getQueryData(orderKeys.list({}));
      const orderToUpdate = previousOrders?.find(o => o.id === orderId) || {};
      
      const response = await orderService.updateOrder(orderId, { ...orderToUpdate, status: newStatus });
      return response;
    },
    onMutate: async ({ orderId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: orderKeys.lists() });
      const previousOrders = queryClient.getQueryData(orderKeys.list({}));

      if (previousOrders) {
        queryClient.setQueryData(
          orderKeys.list({}),
          previousOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }

      return { previousOrders };
    },
    onError: (err, newOrder, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(orderKeys.list({}), context.previousOrders);
      }
      Swal.fire({
        icon: "error",
        title: "បរាជ័យ!",
        text: "មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាពស្ថានភាព",
      });
    },
    onSuccess: (data, { newStatus }) => {
      Swal.fire({
        icon: "success",
        title: "បានធ្វើបច្ចុប្បន្នភាព",
        text: `ស្ថានភាពត្រូវបានប្តូរទៅជា ${newStatus}`,
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

export function useUpdateOrderPaymentStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, newPaymentStatus }) => {
      const previousOrders = queryClient.getQueryData(orderKeys.list({}));
      const orderToUpdate = previousOrders?.find(o => o.id === orderId) || {};
      
      const response = await orderService.updateOrder(orderId, { ...orderToUpdate, paymentStatus: newPaymentStatus });
      return { response, newPaymentStatus };
    },
    onMutate: async ({ orderId, newPaymentStatus }) => {
      await queryClient.cancelQueries({ queryKey: orderKeys.lists() });
      const previousOrders = queryClient.getQueryData(orderKeys.list({}));

      if (previousOrders) {
        queryClient.setQueryData(
          orderKeys.list({}),
          previousOrders.map(order => 
            order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
          )
        );
      }

      return { previousOrders };
    },
    onError: (err, variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(orderKeys.list({}), context.previousOrders);
      }
      Swal.fire({ icon: "error", title: "បរាជ័យ!", text: "Error updating payment status" });
    },
    onSuccess: (data, { newPaymentStatus }) => {
      if (newPaymentStatus === "Paid") {
        Swal.fire({
          icon: "success",
          title: "Payment Updated",
          text: "Payment status is now Paid.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "បានធ្វើបច្ចុប្បន្នភាព",
          text: "ការទូទាត់ត្រូវបានប្តូរទៅជា មិនទាន់ទូទាត់ (Unpaid)",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
