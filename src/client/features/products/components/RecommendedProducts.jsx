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
    .slice(0, 8)

  if (recommendedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 w-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Recommended Products
      </h2>

      {/* Scroll container with padding to prevent shadow and edge clipping */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}