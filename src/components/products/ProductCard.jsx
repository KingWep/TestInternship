import { useState, useEffect } from "react"
import { Gift } from "lucide-react"
import { Link } from "react-router-dom"
import Badge from "../common/Badge"
import ProductPrice from "./ProductPrice"

export default function ProductCard({ product, index = 0 }) {
  const {
    id,
    name,
    price,
    oldPrice,
    discount,
    stock,
    cashback,
    image,
    images,
  } = product

  const [hoverIndex, setHoverIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const gallery = images?.length > 0 ? images : [image]

  useEffect(() => {
    if (!isHovering || gallery.length <= 1) return

    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % gallery.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [isHovering, gallery.length])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoverIndex(0)
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={Math.min(index % 4, 3) * 100}
      className="group bg-white/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        {gallery.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={name}
            className={`
              absolute inset-0 w-full h-64 object-cover
              transition-opacity duration-500 ease-in-out
              ${index === hoverIndex ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Keep container height */}
        <img
          src={gallery[0]}
          alt=""
          className="w-full h-64 object-cover opacity-0"
        />

        {discount && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">
              -{discount}%
            </Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/products/${id}`}
            className="px-3 py-2 bg-white font-semibold text-red-900 rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
          >
            View Detail
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="stock">
            ស្តុក: {stock}
          </Badge>
        </div>

        <h3 className="font-semibold text-slate-900">
          {name}
        </h3>

        <ProductPrice
          price={price}
          oldPrice={oldPrice}
        />

        {cashback && (
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
            <Gift size={14} />
            សន្សំ ${cashback.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}