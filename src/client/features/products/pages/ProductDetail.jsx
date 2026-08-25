import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Container from "../../../components/layout/Container";
import CartDrawer from "../../cart/components/CartDrawer";
import Badge from "../../../components/common/Badge";
import { useCart } from "../../../../context/CartContext";
import { useProductContext } from "../../../../context/ProductContext";
import RecommendedProducts from "../components/RecommendedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProductContext();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);

  const gallery = product
    ? product.images && product.images.length > 0
      ? product.images
      : [product.image]
    : [];

  const goPrev = useCallback(() => {
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    setActiveImage(0);
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

  if (!product) {
    return (
      <div>
        <Header />
        <Container className="pt-24 pb-16 text-center">
          <p className="text-slate-500">រកមិនឃើញផលិតផលនេះទេ</p>
          <Link to="/" className="text-red-700 font-medium mt-4 inline-block">
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </Container>
        <Footer />
      </div>
    );
  }
  const {
    name,
    price,
    oldPrice,
    discount,
    stock,
    cashback,
    description,
    category,
  } = product;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div>
      <Header />

      <Container className="pt-28 md:pt-24 mt-4">
        <Link
          to="/"
          className="flex items-center w-40 gap-1 bg-red-500 rounded-tl-xl rounded-br-xl px-2 py-1 md:px-4 md:py-2 text-white text-md font-semibold mb-6 hover:text-red-900 hover:bg-red-300 transition-colors duration-300 ease-in-out"
        >
          <ArrowLeft size={16} />
          ត្រឡប់ក្រោយ
        </Link>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-10 ">
          <div>
            <div className="group relative">
              <img
                src={gallery[activeImage]}
                alt={name}
                className="w-full h-96 object-cover rounded-2xl"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-md">
                  -{discount}%
                </span>
              )}

              {/* Prev / Next arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="រូបភាពមុន"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={20} className="text-slate-800" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="រូបភាពបន្ទាប់"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={20} className="text-slate-800" />
                  </button>

                  {/* Image counter */}
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {activeImage + 1} / {gallery.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i
                      ? "border-red-700"
                      : "border-transparent hover:border-slate-200"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: info */}
          <div>
            {category && (
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {category}
              </span>
            )}

            <h1 className="text-xl md:text-3xl font-bold text-slate-900 mt-1">
              {name}
            </h1>

            <div className="flex items-center gap-3 mt-1 md:mt-4">
              <span className="text-red-700 font-bold text-2xl md:text-3xl">
                ${price.toFixed(2)}
              </span>
              {oldPrice && (
                <span className="text-slate-400 line-through text-md md:text-lg">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {(oldPrice && oldPrice > price) || cashback ? (
              <div className="flex items-center gap-1 mt-1 md:mt-3 text-green-600 text-sm font-medium">
                <Gift size={16} />
                សន្សំ $
                {(oldPrice && oldPrice > price
                  ? oldPrice - price
                  : cashback
                ).toFixed(2)}
              </div>
            ) : null}

            <div className="mt-1 md:mt-3">
              <Badge variant="stock">ស្តុក: {stock}</Badge>
            </div>

            {description && (
              <p className="text-slate-600 mt-4 md:mt-6 leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex items-center  gap-4 mt-4 md:mt-8">
              <span className="text-sm font-medium text-slate-700">ចំនួន:</span>
              <div className="flex items-center gap-3 border border-slate-200 rounded-full px-2 py-1 md:px-4 md:py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className=" md:w-auto flex items-center justify-center gap-2 bg-red-900 text-white font-medium px-4 py-1 md:py-2 rounded-full hover:bg-red-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
                {stock === 0 ? "អស់ស្តុក" : "បន្ថែមទៅកន្ត្រក"}
              </button>
            </div>
          </div>
        </div>
        <RecommendedProducts products={products} currentProduct={product} />
      </Container>
      <Footer />
      <CartDrawer />
    </div>
  );
}
