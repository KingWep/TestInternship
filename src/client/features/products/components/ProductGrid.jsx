import ProductCard from "./ProductCard"
import EmptyState from "../../../components/common/EmptyState"

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-2  md:m-0 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  )
}