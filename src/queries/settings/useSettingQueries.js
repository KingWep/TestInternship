import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingService } from '../../services/settingService';
import { settingKeys } from './settingKeys';

export function useSettingsQuery(shopCode) {
  return useQuery({
    queryKey: settingKeys.byShopCode(shopCode),
    queryFn: () => settingService.getByShopCode(shopCode),
    select: (data) => data?.data || data || {},
    enabled: !!shopCode,
  });
}

export const usePublicSettingsQuery = useSettingsQuery;

export function useUpdateSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => settingService.updateSetting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingKeys.all });
    },
  });
}

export function useCreateSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settingService.createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingKeys.all });
    },
  });
}
