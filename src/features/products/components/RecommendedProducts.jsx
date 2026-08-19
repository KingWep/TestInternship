import ProductCard from "./ProductCard"

export default function RecommendedProducts({
  products,
  currentProduct,
}) {
  const recommendedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4)

  if (recommendedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Recommended Products
      </h2>

      <div className="grid grid-cols-1 m-4 md:m-0 gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

// import RecommendedProductItem from "./RecommendedProductItem"

// export default function RecommendedProducts({
//   products,
//   currentProduct,
// }) {
//   const recommendedProducts = products
//     .filter(
//       (product) =>
//         product.category === currentProduct.category &&
//         product.id !== currentProduct.id
//     )
//     .slice(0, 4)

//   if (recommendedProducts.length === 0) {
//     return null
//   }

//   return (
//     <section className="mt-16">
//       <h2 className="text-2xl font-bold text-slate-900 mb-6">
//         Recommended Products
//       </h2>

//       <div className="space-y-3">
//         {recommendedProducts.map((product) => (
//           <RecommendedProductItem
//             key={product.id}
//             product={product}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }