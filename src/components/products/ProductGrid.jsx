import ProductCard from "./ProductCard"
import EmptyState from "../common/EmptyState"

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 m-4 md:m-0 gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}