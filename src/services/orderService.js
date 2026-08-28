import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS } from '../api/endpoints';

export const orderService = {
  getOrders: async (params = {}) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.ORDERS.GET_ALL, { params });
      return response.data;
    } catch (error) {
      console.error('Order API Error [getOrders]:', {
        status: error.response?.status,
        data:   error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getOrder: async (id) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.ORDERS.GET_ONE(id));
      return response.data;
    } catch (error) {
      console.error('Order API Error [getOrder]:', {
        status: error.response?.status,
        data:   error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
      return response.data;
    } catch (error) {
      console.error('Order API Error [createOrder]:', {
        status: error.response?.status,
        data:   error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      const response = await axiosClient.put(
        API_ENDPOINTS.ORDERS.UPDATE(id),
        orderData
      );
      return response.data;
    } catch (error) {
      console.error('Order API Error [updateOrder]:', {
        status: error.response?.status,
        data:   error.response?.data ? JSON.stringify(error.response?.data) : null,
        message: error.message,
      });
      throw error;
    }
  },
};
