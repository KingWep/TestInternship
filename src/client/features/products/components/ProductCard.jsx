import { useState, useEffect } from "react";
import { Gift, Image as ImageIcon, Eye, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../../../components/common/Badge";
import ProductPrice from "./ProductPrice";

export default function ProductCard({ product = {}, index = 0 }) {
  const {
    id,
    name = "",
    price = 0,
    salePrice = 0,
    discountPrice,
    stock = 0,
    stockQuantity,
    image,
    images = [],
    categoryName,
    cashback,
  } = product;

  const [hoverIndex, setHoverIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Current stock count
  const availableStock = stockQuantity ?? stock ?? 0;

  // Selling price vs Original price
  const numSalePrice = Number(salePrice || 0);
  const numPrice = Number(price || 0);
  const displayPrice = numSalePrice > 0 ? numSalePrice : numPrice;
  const originalPrice = numSalePrice > 0 && numPrice > numSalePrice ? numPrice : null;

  // Calculate discount percentage if not provided
  const discountPricePercent =
    discountPrice ||
    (originalPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : null);

  const savingsAmount = originalPrice ? originalPrice - displayPrice : (cashback || 0);

  // Clean image gallery
  const validImages = Array.isArray(images) && images.length > 0 ? images.filter(Boolean) : [];
  const gallery = validImages.length > 0 ? validImages : image ? [image] : [];

  useEffect(() => {
    if (!isHovering || gallery.length <= 1) return;

    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % gallery.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isHovering, gallery.length]);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={Math.min(index % 4, 3) * 100}
      className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverIndex(0);
      }}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/4] w-full flex items-center justify-center">
        {gallery.length > 0 ? (
          <>
            {gallery.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  idx === hoverIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300">
            <ImageIcon size={40} />
            <span className="text-[11px] mt-2 font-medium">គ្មានរូបភាព</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPricePercent > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              -{discountPricePercent}%
            </span>
          </div>
        )}

        {/* Out of stock overlay */}
        {availableStock <= 0 && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              អស់ពីស្តុក
            </span>
          </div>
        )}

        {/* Hover Quick Action */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
          <Link
            to={`/products/${id}`}
            className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 px-4 py-2 bg-white/95 text-slate-800 font-semibold text-xs sm:text-sm rounded-full shadow-lg hover:bg-red-800 hover:text-white"
          >
            <Eye size={16} />
            មើលលម្អិត
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
        {/* Category & Stock */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wide truncate">
            {categoryName || "ទូទៅ"}
          </span>
          <Badge variant="stock" className="scale-90 origin-right">
            ស្តុក: {availableStock}
          </Badge>
        </div>

        {/* Product Name */}
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-semibold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Price and Badges Container (Fixed height to maintain grid balance) */}
        <div className="mt-auto pt-3 border-t border-slate-100/80 flex flex-col gap-1.5 min-h-[64px] justify-end">
          
          <ProductPrice price={displayPrice} oldPrice={originalPrice} />

          {/* Conditional Rendering: Discount vs Standard Quality Tag */}
          {savingsAmount > 0 ? (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 w-fit px-2 py-1 rounded-md border border-emerald-100/50">
              <Gift size={12} className="text-emerald-600" />
              <span className="text-[11px] text-emerald-700 font-medium">
                ចំណេញ ${Number(savingsAmount).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-slate-50 w-fit px-2 py-1 rounded-md border border-slate-200/60">
              <ShieldCheck size={12} className="text-blue-500" />
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                ផលិតផលសុទ្ធ 100%
              </span>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}