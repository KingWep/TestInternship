import { z } from "zod";

const socialMediaSchema = z.object({
  title: z.string().min(1, "សូមបញ្ចូលចំណងជើង"),
  url: z.string().url("សូមបញ្ចូលតំណរភ្ជាប់អោយបានត្រឹមត្រូវ"),
  icon: z.string().min(1, "សូមបញ្ចូលរូបតំណាង")
});

export const settingSchema = z.object({
  shop_name: z.string().min(1, "សូមបញ្ចូលឈ្មោះហាង"),
  shop_code: z.string().min(1, "សូមបញ្ចូលលេខកូដហាង"),
  phone: z.string().min(1, "សូមបញ្ចូលលេខទូរស័ព្ទ"),
  address: z.string().min(1, "សូមបញ្ចូលអាសយដ្ឋាន"),
  chat_id: z.string().optional(),
  social_media: z.array(socialMediaSchema).optional(),
});
