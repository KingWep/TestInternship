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

  const availableStock = stockQuantity ?? stock ?? 0;
  const numSalePrice = Number(salePrice || 0);
  const numPrice = Number(price || 0);
  const displayPrice = numSalePrice > 0 ? numSalePrice : numPrice;
  const originalPrice = numSalePrice > 0 && numPrice > numSalePrice ? numPrice : null;

  const discountPricePercent =
    discountPrice ||
    (originalPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : null);

  const savingsAmount = originalPrice ? originalPrice - displayPrice : (cashback || 0);

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
      className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div 
        className="group/image relative overflow-hidden bg-gray-50 aspect-[4/4] w-full flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverIndex(0);
        }}
      >
        {gallery.length > 0 ? (
          <>
            {gallery.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-110 ${
                  idx === hoverIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <ImageIcon size={40} strokeWidth={1.5} />
            <span className="text-[11px] mt-2 font-medium text-gray-400">គ្មានរូបភាព</span>
          </div>
        )}

        {discountPricePercent > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
              -{discountPricePercent}%
            </span>
          </div>
        )}

        {availableStock <= 0 && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              អស់ពីស្តុក
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none group-hover/image:pointer-events-auto">
          <Link
            to={`/products/${id}`}
            className="translate-y-4 group-hover/image:translate-y-0 transition-all duration-300 flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold text-sm rounded-full shadow-xl hover:bg-red-600 hover:text-white pointer-events-auto"
          >
            <Eye size={18} />
            មើលលម្អិត
          </Link>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider truncate">
            {categoryName || "ទូទៅ"}
          </span>
          <Badge variant="stock" className="scale-90 origin-right bg-gray-100 text-gray-600">
            ស្តុក: {availableStock}
          </Badge>
        </div>

        <Link to={`/products/${id}`} className="block group/title">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover/title:text-red-600 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2 min-h-[64px] justify-end">
          <ProductPrice price={displayPrice} oldPrice={originalPrice} />

          {savingsAmount > 0 ? (
            <div className="inline-flex items-center gap-1.5 bg-emerald-50/80 w-fit px-2.5 py-1 rounded-md border border-emerald-100">
              <Gift size={12} className="text-emerald-600" />
              <span className="text-[11px] text-emerald-700 font-medium">
                ចំណេញ ${Number(savingsAmount).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-gray-50 w-fit px-2.5 py-1 rounded-md border border-gray-200">
              <ShieldCheck size={12} className="text-blue-500" />
              <span className="text-[11px] text-gray-600 font-medium tracking-wide">
                ផលិតផលសុទ្ធ 100%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}