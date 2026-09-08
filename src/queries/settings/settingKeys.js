export const settingKeys = {
  all: ['settings'],
  byShopCode: (shopCode) => [...settingKeys.all, shopCode],
};