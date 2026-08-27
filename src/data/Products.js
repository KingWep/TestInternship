// export const products = [
//   // ==================== COSMETIC ====================
//   {
//     id: 1,
//     name: "ONE GEL",
//     sku:"Cos-001",
//     category: "Cosmetic",
//     price: 27.0,
//     oldPrice: 35.0,
//     discount: 23,
//     stock: 0,
//     cashback: 8.0,
//     image:
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE GEL is a lightweight cosmetic gel designed to provide a smooth and fresh-looking finish for everyday beauty routines.",
//   },

//   {
//     id: 2,
//     name: "ONE CREAM",
//     sku:"Cos-002",
//     category: "Cosmetic",
//     price: 22.0,
//     oldPrice: 30.0,
//     discount: 27,
//     stock: 15,
//     cashback: 6.0,
//     image:
//       "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE CREAM provides a soft and comfortable feel while helping create a smooth and polished appearance.",
//   },

//   {
//     id: 3,
//     name: "ONE FOUNDATION",
//     sku:"Cos-003",
//     category: "Cosmetic",
//     price: 29.0,
//     oldPrice: 38.0,
//     discount: 24,
//     stock: 18,
//     cashback: 7.0,
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE FOUNDATION helps create an even-looking complexion with a smooth finish and comfortable everyday wear.",
//   },

//   {
//     id: 4,
//     name: "ONE LIPSTICK",
//     sku:"Cos-004",
//     category: "Cosmetic",
//     price: 12.0,
//     oldPrice: 18.0,
//     discount: 33,
//     stock: 25,
//     cashback: 4.0,
//     image:
//       "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE LIPSTICK delivers rich-looking color with a comfortable feel, perfect for adding a polished touch to everyday makeup.",
//   },

//   {
//     id: 5,
//     name: "ONE MASCARA",
//     sku:"Cos-005",
//     category: "Cosmetic",
//     price: 15.0,
//     oldPrice: 21.0,
//     discount: 29,
//     stock: 20,
//     cashback: 5.0,
//     image:
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE MASCARA enhances the appearance of lashes with a defined and polished look suitable for everyday makeup.",
//   },

//   {
//     id: 6,
//     name: "ONE BLUSH",
//     sku:"Cos-006",
//     category: "Cosmetic",
//     price: 14.0,
//     oldPrice: 19.0,
//     discount: 26,
//     stock: 17,
//     cashback: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE BLUSH adds a natural-looking touch of color to the cheeks and works well with everyday makeup styles.",
//   },

//   // ==================== SKINCARE ====================

//   {
//     id: 7,
//     name: "ONE CARE",
//     sku:"Ski-007",
//     category: "Skincare",
//     price: 17.0,
//     oldPrice: 25.0,
//     discount: 32,
//     stock: 20,
//     cashback: 8.0,
//     image:
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE CARE is designed for a simple daily skincare routine, helping the skin feel clean, comfortable, and refreshed.",
//   },

//   {
//     id: 8,
//     name: "ONE SERUM",
//     sku:"Ski-008",
//     category: "Skincare",
//     price: 32.0,
//     oldPrice: 45.0,
//     discount: 29,
//     stock: 12,
//     cashback: 10.0,
//     image:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE SERUM is a lightweight skincare serum designed to fit easily into your daily routine and leave skin feeling smooth.",
//   },

//   {
//     id: 9,
//     name: "ONE FACE WASH",
//     sku:"Ski-009",
//     category: "Skincare",
//     price: 14.0,
//     oldPrice: 19.0,
//     discount: 26,
//     stock: 35,
//     cashback: 4.0,
//     image:
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE FACE WASH gently cleanses the face and helps remove everyday dirt and impurities for a fresh feeling.",
//   },

//   {
//     id: 10,
//     name: "ONE SUNSCREEN",
//     sku:"Ski-010",
//     category: "Skincare",
//     price: 25.0,
//     oldPrice: 35.0,
//     discount: 29,
//     stock: 10,
//     cashback: 8.0,
//     image:
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE SUNSCREEN is designed for everyday sun protection as part of a simple daily skincare routine.",
//   },

//   {
//     id: 11,
//     name: "ONE TONER",
//     sku:"Ski-011",
//     category: "Skincare",
//     price: 16.0,
//     oldPrice: 22.0,
//     discount: 27,
//     stock: 22,
//     cashback: 5.0,
//     image:
//       "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE TONER is a refreshing addition to your skincare routine and helps prepare the skin for the next care steps.",
//   },

//   {
//     id: 12,
//     name: "ONE EYE CREAM",
//     sku:"Ski-012",
//     category: "Skincare",
//     price: 21.0,
//     oldPrice: 29.0,
//     discount: 28,
//     stock: 14,
//     cashback: 6.5,
//     image:
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE EYE CREAM is designed for the delicate eye area and provides a comfortable addition to your daily skincare routine.",
//   },

//   // ==================== BODY CARE ====================

//   {
//     id: 13,
//     name: "ONE LOTION",
//     sku:"Bod-013",
//     category: "Body Care",
//     price: 15.0,
//     oldPrice: 20.0,
//     discount: 25,
//     stock: 30,
//     cashback: 5.0,
//     image:
//       "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE LOTION helps keep the skin feeling soft and comfortable and is suitable for everyday body care.",
//   },

//   {
//     id: 14,
//     name: "ONE BODY WASH",
//     sku:"Bod-014",
//     category: "Body Care",
//     price: 18.0,
//     oldPrice: 25.0,
//     discount: 28,
//     stock: 20,
//     cashback: 6.0,
//     image:
//       "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE BODY WASH provides a refreshing cleansing experience for everyday showers while leaving the skin feeling clean.",
//   },

//   {
//     id: 15,
//     name: "ONE BODY SCRUB",
//     sku:"Bod-015",
//     category: "Body Care",
//     price: 21.0,
//     oldPrice: 29.0,
//     discount: 28,
//     stock: 16,
//     cashback: 7.0,
//     image:
//       "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE BODY SCRUB is designed to gently exfoliate the skin and provide a smoother, refreshed feeling.",
//   },

//   {
//     id: 16,
//     name: "ONE BODY OIL",
//     sku:"Bod-016",
//     category: "Body Care",
//     price: 19.0,
//     oldPrice: 26.0,
//     discount: 27,
//     stock: 13,
//     cashback: 6.0,
//     image:
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE BODY OIL provides a nourishing and comfortable feel for the skin and adds an extra step to everyday body care.",
//   },

//   {
//     id: 17,
//     name: "ONE HAND CREAM",
//     sku:"Bod-017",
//     category: "Body Care",
//     price: 11.0,
//     oldPrice: 15.0,
//     discount: 27,
//     stock: 28,
//     cashback: 3.5,
//     image:
//       "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE HAND CREAM is designed to keep hands feeling soft and comfortable throughout the day.",
//   },

//   {
//     id: 18,
//     name: "ONE DEODORANT",
//     sku:"Bod-018",
//     category: "Body Care",
//     price: 9.0,
//     oldPrice: 13.0,
//     discount: 31,
//     stock: 40,
//     cashback: 3.0,
//     image:
//       "https://images.unsplash.com/photo-1620917670395-4c9a6b0b0a3a?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1620917670395-4c9a6b0b0a3a?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE DEODORANT provides a fresh feeling for everyday use and fits easily into your daily personal care routine.",
//   },

//   // ==================== HAIR CARE ====================

//   {
//     id: 19,
//     name: "ONE SHAMPOO",
//     sku:"Hai-019",
//     category: "Hair Care",
//     price: 19.0,
//     oldPrice: 27.0,
//     discount: 30,
//     stock: 18,
//     cashback: 7.0,
//     image:
//       "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1626015365107-4a2b7b5d8b3f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE SHAMPOO gently cleanses the hair and scalp while leaving the hair feeling fresh and clean.",
//   },

//   {
//     id: 20,
//     name: "ONE CONDITIONER",
//     sku:"Hai-020",
//     category: "Hair Care",
//     price: 18.0,
//     oldPrice: 24.0,
//     discount: 25,
//     stock: 25,
//     cashback: 6.0,
//     image:
//       "https://images.unsplash.com/photo-1626015365107-4a2b7b5d8b3f?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1626015365107-4a2b7b5d8b3f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE CONDITIONER helps leave hair feeling soft, smooth, and easy to manage as part of everyday hair care.",
//   },

//   {
//     id: 21,
//     name: "ONE HAIR MASK",
//     sku:"Hai-021",
//     category: "Hair Care",
//     price: 23.0,
//     oldPrice: 31.0,
//     discount: 26,
//     stock: 14,
//     cashback: 7.0,
//     image:
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE HAIR MASK provides an intensive care step for hair, helping it feel soft and conditioned.",
//   },

//   {
//     id: 22,
//     name: "ONE HAIR OIL",
//     sku:"Hai-022",
//     category: "Hair Care",
//     price: 20.0,
//     oldPrice: 28.0,
//     discount: 29,
//     stock: 11,
//     cashback: 6.5,
//     image:
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE HAIR OIL adds a nourishing step to your hair care routine while leaving hair feeling smooth and cared for.",
//   },

//   {
//     id: 23,
//     name: "ONE HAIR SERUM",
//     sku:"Hai-023",
//     category: "Hair Care",
//     price: 24.0,
//     oldPrice: 33.0,
//     discount: 27,
//     stock: 9,
//     cashback: 7.5,
//     image:
//       "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE HAIR SERUM is a lightweight hair care product designed to leave hair feeling smooth and looking polished.",
//   },

//   {
//     id: 24,
//     name: "ONE HAIR SPRAY",
//     sku:"Hai-024",
//     category: "Hair Care",
//     price: 16.0,
//     oldPrice: 22.0,
//     discount: 27,
//     stock: 19,
//     cashback: 5.0,
//     image:
//       "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1626015365107-4a2b7b5d8b3f?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE HAIR SPRAY helps complete your styling routine with a fresh and polished finish.",
//   },

//   // ==================== FRAGRANCE ====================

//   {
//     id: 25,
//     name: "ONE PERFUME",
//     sku:"Fra-025",
//     category: "Fragrance",
//     price: 45.0,
//     oldPrice: 60.0,
//     discount: 25,
//     stock: 8,
//     cashback: 12.0,
//     image:
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE PERFUME offers a sophisticated fragrance experience designed for everyday wear and special occasions.",
//   },

//   {
//     id: 26,
//     name: "ONE BODY MIST",
//     sku:"Fra-026",
//     category: "Fragrance",
//     price: 18.0,
//     oldPrice: 24.0,
//     discount: 25,
//     stock: 22,
//     cashback: 5.0,
//     image:
//       "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE BODY MIST provides a light and refreshing fragrance that is easy to wear throughout the day.",
//   },

//   {
//     id: 27,
//     name: "ONE COLOGNE",
//     sku:"Fra-027",
//     category: "Fragrance",
//     price: 40.0,
//     oldPrice: 55.0,
//     discount: 27,
//     stock: 10,
//     cashback: 11.0,
//     image:
//       "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE COLOGNE delivers a refined fragrance profile designed for confident everyday wear and different occasions.",
//   },

//   {
//     id: 28,
//     name: "ONE EAU DE PARFUM",
//     sku:"Fra-028",
//     category: "Fragrance",
//     price: 52.0,
//     oldPrice: 70.0,
//     discount: 26,
//     stock: 6,
//     cashback: 14.0,
//     image:
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE EAU DE PARFUM is a premium fragrance choice designed for elegant everyday wear and memorable occasions.",
//   },

//   {
//     id: 29,
//     name: "ONE ROLL-ON",
//     sku:"Fra-029",
//     category: "Fragrance",
//     price: 14.0,
//     oldPrice: 19.0,
//     discount: 26,
//     stock: 30,
//     cashback: 4.0,
//     image:
//       "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE ROLL-ON offers a convenient fragrance option for everyday use with a compact format that is easy to carry.",
//   },

//   {
//     id: 30,
//     name: "ONE SCENTED OIL",
//     sku:"Fra-030",
//     category: "Fragrance",
//     price: 22.0,
//     oldPrice: 30.0,
//     discount: 27,
//     stock: 15,
//     cashback: 6.0,
//     image:
//       "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
//     images: [
//       "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
//     ],
//     description:
//       "ONE SCENTED OIL provides a concentrated fragrance experience in a convenient format for easy everyday application.",
//   },
// ];