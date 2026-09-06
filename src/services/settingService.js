import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS } from '../api/endpoints';

export const settingService = {
  getSettings: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.SETTINGS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Setting API Error [getSettings]:', {
        status: error.response?.status,
        data:   error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  updateSetting: async (id, settingData) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.SETTINGS.UPDATE(id),
        settingData
      );
      return response.data;
    } catch (error) {
      console.error('Setting API Error [updateSetting]:', {
        status: error.response?.status,
        data:   JSON.stringify(error.response?.data),
        message: error.message,
      });
      throw error;
    }
  },

  createSetting: async (settingData) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.SETTINGS.CREATE, settingData);
      return response.data;
    } catch (error) {
      console.error('Setting API Error [createSetting]:', {
        status: error.response?.status,
        data:   error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};
