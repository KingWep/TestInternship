import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingService } from '../../services/settingService';
import { settingKeys } from './settingKeys';

export function useSettingsQuery() {
  return useQuery({
    queryKey: settingKeys.details(),
    queryFn: settingService.getSettings,
    select: (data) => data?.data || data || {},
  });
}

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
