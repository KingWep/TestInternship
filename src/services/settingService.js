import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";

export const settingService = {
  getSettings: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.SETTINGS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error("Setting API Error [getSettings]:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getByShopCode: async (shopCode) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.SETTINGS.GET_ALL, {
        params: { shop_code: shopCode },
      });
      return response.data;
    } catch (error) {
      console.error("Setting API Error [getByShopCode]:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  getSettingById: async (id) => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.SETTINGS.GET_ALL, {
        params: { id: id },
      });
      return response.data;
    } catch (error) {
      console.error("Setting API Error [getSettingById]:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // updateSetting: async (id, settingData) => {
  //   try {
  //     let response;
  //     if (settingData instanceof FormData) {
  //       if (!settingData.has('id')) {
  //         settingData.append('id', id);
  //       }
  //       settingData.append('_method', 'PUT');
  //       // Laravel requires POST for multipart/form-data to parse files properly, but user explicitly asked to use PUT
  //       response = await axiosClient.put(
  //         API_ENDPOINTS.SETTINGS.UPDATE,
  //         settingData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         }
  //       );
  //     } else {
  //       settingData.id = id;
  //       response = await axiosClient.put(
  //         API_ENDPOINTS.SETTINGS.UPDATE,
  //         settingData
  //       );
  //     }
  //     return response.data;
  //   } catch (error) {
  //     console.error('Setting API Error [updateSetting]:', {
  //       status: error.response?.status,
  //       data: JSON.stringify(error.response?.data),
  //       message: error.message,
  //     });
  //     throw error;
  //   }
  // },
  updateSetting: async (id, settingData) => {
    try {
      let response;

      if (settingData instanceof FormData) {
        console.log("=== UPDATE SETTING ===");
        console.log("ID:", id);

        for (const [key, value] of settingData.entries()) {
          console.log(
            key,
            value instanceof File
              ? {
                  name: value.name,
                  type: value.type,
                  size: value.size,
                }
              : value,
          );
        }

        response = await axiosClient.put(
          API_ENDPOINTS.SETTINGS.UPDATE(id),
          settingData,
        );
      } else {
        response = await axiosClient.put(
          API_ENDPOINTS.SETTINGS.UPDATE(id),
          settingData,
        );
      }

      return response.data;
    } catch (error) {
      console.error("Setting API Error [updateSetting]:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw error;
    }
  },
  createSetting: async (settingData) => {
    try {
      let response;

      if (settingData instanceof FormData) {
        console.log("=== CREATE SETTING ===");
        for (const [key, value] of settingData.entries()) {
          console.log(
            key,
            value instanceof File
              ? {
                  name: value.name,
                  type: value.type,
                  size: value.size,
                }
              : value,
          );
        }

        response = await axiosClient.post(
          API_ENDPOINTS.SETTINGS.CREATE,
          settingData,
        );
      } else {
        response = await axiosClient.post(
          API_ENDPOINTS.SETTINGS.CREATE,
          settingData,
        );
      }

      console.log("Setting API Response [createSetting]:", response.data);
      return response.data;
    } catch (error) {
      console.error("Setting API Error [createSetting]:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
};
