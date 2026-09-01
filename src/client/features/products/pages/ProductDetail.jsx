import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Gift,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  CheckCircle,
  Package,
  Image as ImageIcon,
  Truck,
  ShieldCheck,
  SquareChevronDown,
} from "lucide-react";
import Swal from "sweetalert2";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Container from "../../../components/layout/Container";
import CartDrawer from "../../cart/components/CartDrawer";
import Badge from "../../../components/common/Badge";
import { useCart } from "../../../../context/CartContext";
import { useProductsQuery } from "../../../../queries/products/useProductQueries";
import RecommendedProducts from "../components/RecommendedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { data: products = [], isLoading: loading } = useProductsQuery();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((p) => Number(p.id) === Number(id));

  const validImages =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images.filter(Boolean)
      : [];
  const gallery =
    validImages.length > 0
      ? validImages
      : product?.image
        ? [product.image]
        : [];

  const goPrev = useCallback(() => {
    if (gallery.length <= 1) return;
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const goNext = useCallback(() => {
    if (gallery.length <= 1) return;
    setActiveImage((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (gallery.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery.length, goPrev, goNext]);

  // Loading State
  if (loading && !product) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <Container className="pt-32 pb-16 text-center">
          <div className="animate-pulse space-y-4 max-w-xl mx-auto">
            <div className="h-64 bg-slate-200 rounded-2xl w-full"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <Container className="pt-32 pb-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Package size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            រកមិនឃើញផលិតផលនេះទេ
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            ផលិតផលដែលអ្នកកំពុងស្វែងរកប្រហែលជាត្រូវបានលុប ឬផ្លាស់ប្តូរទីតាំង។
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 bg-red-800 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-red-900 transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </Container>
        <Footer />
      </div>
    );
  }

  const {
    name = "",
    price = 0,
    salePrice = 0,
    discount,
    stock = 0,
    stockQuantity,
    cashback,
    description = "",
    categoryName = "",
    sku = "",
  } = product;

  const availableStock = stockQuantity ?? stock ?? 0;
  const numSalePrice = Number(salePrice || 0);
  const numPrice = Number(price || 0);
  const displayPrice = numSalePrice > 0 ? numSalePrice : numPrice;
  const originalPrice =
    numSalePrice > 0 && numPrice > numSalePrice ? numPrice : null;

  const discountPercent =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : null);

  const savingsAmount = originalPrice
    ? originalPrice - displayPrice
    : cashback || 0;

  const handleAddToCart = () => {
    if (availableStock <= 0) return;
    addToCart(product, quantity);

    Swal.fire({
      icon: "success",
      title: "បានបន្ថែមទៅកន្ត្រក!",
      text: `${name} (ចំនួន: ${quantity})`,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleBuyNow = () => {
    if (availableStock <= 0) return;
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <Container className="pt-28 md:pt-24 flex-1">
        {/* Breadcrumb / Back Link */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-red-600 border border-slate-200 px-3.5 py-2 rounded-bl-xl rounded-tr-xl hover:text-red-700 hover:border-red-200 hover:bg-red-200/50 transition-all shadow-xs"
          >
            <ArrowLeft size={16} />
            ត្រឡប់ក្រោយ
          </Link>
          {categoryName && (
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md">
              ប្រភេទ: <strong className="text-slate-800">{categoryName}</strong>
            </span>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            {/* Left Column: Image Gallery */}
            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Thumbnails - left of the main image on desktop */}
                {gallery.length > 1 && (
                  <div className="order-2 sm:order-1 flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 sm:w-[76px] lg:w-[82px] flex-shrink-0 scrollbar-none">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`បង្ហាញរូបភាពទី ${i + 1}`}
                        className={`ml-2 mt-2 md:ml-0 md:mt-0 w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] lg:w-[78px] lg:h-[78px] rounded-xl overflow-hidden transition-all duration-200 flex-shrink-0 cursor-pointer relative ${
                          activeImage === i
                            ? "ring-2 ring-red-600 ring-offset-2 ring-offset-white shadow-md"
                            : "border border-slate-200 hover:border-slate-300 opacity-65 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${name} thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image */}
                <div className="order-1 sm:order-2 group relative bg-white rounded-2xl overflow-hidden aspect-square border border-slate-100 shadow-sm flex-1 min-w-0 max-h-[520px]">
                  {gallery.length > 0 ? (
                    <img
                      src={gallery[activeImage]}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">គ្មានរូបភាព</span>
                    </div>
                  )}

                  {/* Discount Tag */}
                  {discountPercent > 0 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-lg shadow-md z-10">
                      -{discountPercent}%
                    </span>
                  )}

                  {/* Image Navigation Arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={goPrev}
                        aria-label="រូបភាពមុន"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 hover:text-red-700 transition-all cursor-pointer z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={goNext}
                        aria-label="រូបភាពបន្ទាប់"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 hover:text-red-700 transition-all cursor-pointer z-10"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Image Counter Badge */}
                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
                        {activeImage + 1} / {gallery.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Details & Purchase Controls */}
            <div className="flex flex-col h-full min-h-0">
              <div className="space-y-2.5 lg:space-y-3">
                {/* Category & SKU */}
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {sku && (
                    <span className="text-red-800 font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-md">
                      លេខកូដ: {sku}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 font-black text-2xl sm:text-3xl tracking-tight">
                    ${displayPrice.toFixed(2)}
                  </span>
                  {originalPrice && (
                    <span className="text-slate-400 text-sm sm:text-base line-through font-medium">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Savings Pill */}
                {savingsAmount > 0 && (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm">
                    <Gift size={16} className="text-emerald-600" />
                    <span>
                      អ្នកចំណេញបាន ${Number(savingsAmount).toFixed(2)}{" "}
                      ក្នុងការទិញនេះ!
                    </span>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="stock">
                    {availableStock > 0
                      ? `ស្តុកនៅសល់: ${availableStock}`
                      : "អស់ពីស្តុក"}
                  </Badge>
                  {availableStock > 0 && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <CheckCircle size={14} /> មានទំនិញស្រាប់
                    </span>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <div className="pt-2.5 border-t border-slate-100">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      ព័ត៌មានលម្អិតអំពីទំនិញ
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-words whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                )}

                {/* Highlights / Badges */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] sm:text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Truck size={16} className="text-red-600" />
                    </div>
                    <span>ដឹកជញ្ជូនរហ័សទូទាំងប្រទេស</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={16} className="text-emerald-600" />
                    </div>
                    <span>ធានាផលិតផលសុទ្ធ 100%</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart / Buy Actions */}
              <div className="pt-3 mt-auto border-t border-slate-100">
                <div className="flex items-center gap-2 sm:gap-3 w-full flex-nowrap">
                  {/* Quantity selector */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-bold text-slate-600 mr-1">
                      ចំនួន:
                    </span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-xs p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1 || availableStock === 0}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-slate-800">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((q) => Math.min(q + 1, availableStock))
                        }
                        disabled={
                          quantity >= availableStock || availableStock === 0
                        }
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={availableStock === 0}
                    className="relative overflow-hidden group flex-1 basis-0 min-w-0 h-10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-800 to-red-900 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-lg hover:shadow-[0_8px_20px_rgba(153,27,27,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="absolute top-0 -left-full w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-[none] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                    <ShoppingCart size={18} className="relative z-10" />
                    <span className="relative z-10">
                      {availableStock === 0 ? "អស់ពីស្តុក" : "បន្ថែមទៅកន្ត្រក"}
                    </span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={availableStock === 0}
                    className="flex-1 basis-0 min-w-0 h-10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-lg hover:shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="absolute top-0 -left-full w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:animate-[none] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
                    <SquareChevronDown size={18} className="relative z-10"/>
                    <span className="relative z-10">
                      ទិញឥឡូវនេះ
                    </span>
                   
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts products={products} currentProduct={product} />
      </Container>

      <Footer />
      <CartDrawer />
    </div>
  );
}
