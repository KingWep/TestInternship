// import { useState, useCallback } from "react";

// export default function useProductShare() {
//   const [isSharing, setIsSharing] = useState(false);

//   const shareProducts = useCallback(async (products) => {
//     if (!products?.length) return;

//     setIsSharing(true);

//     try {
//       const product = products[0];
//       const imageUrl = selectedProducts[0].imageUrl;

//       if (navigator.share) {
//         await navigator.share({
//           title: product.name,
//           text: `Check out ${product.name}`,
//           url: productUrl,
//         });
//       } else {
//         await navigator.clipboard.writeText(imageUrl);

//         alert("Product link copied!");
//       }
//     } catch (error) {
//       if (error.name !== "AbortError") {
//         console.error("Failed to share product:", error);
//       }
//     } finally {
//       setIsSharing(false);
//     }
//   }, []);

//   return {
//     isSharing,
//     shareProducts,
//   };
// }