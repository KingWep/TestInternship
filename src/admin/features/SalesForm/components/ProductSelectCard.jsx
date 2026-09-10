import { IoGift } from "react-icons/io5";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProductSelectCard({ product, onSelect }) {
  const { t } = useTranslation();
  const isOutOfStock = product.stock === 0;

  return (
    <div
      onClick={() => !isOutOfStock && onSelect(product)}
      className={`bg-white border rounded-xl p-3 shadow-2xs flex flex-col justify-between group transition-all duration-200 w-full h-full
        ${
          isOutOfStock
            ? "border-slate-200 opacity-50 cursor-not-allowed"
            : "border-slate-200 hover:shadow-sm hover:border-blue-300 cursor-pointer"
        }`}
    >
      {/* Top Section: Image, Stock Badge, & Name */}
      <div>
        <div className="h-32 -mx-3 -mt-3 mb-2.5 rounded-t-xl overflow-hidden flex items-center justify-center bg-white text-slate-400 font-bold">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain transition-transform duration-300 ${!isOutOfStock ? "group-hover:scale-105" : ""}`}
            />
          ) : (
            <span className="text-xl">📦</span>
          )}
        </div>

        {/* Stock badge */}
        <span
          className={`inline-block text-[10px] px-1 py-0 rounded font-semibold ${
            product.stock === 0
              ? "bg-red-500 text-white"
              : product.stock <= 10
                ? "bg-yellow-500 text-white"
                : "bg-green-600 text-white"
          }`}
        >
          {isOutOfStock ? t('sales.outOfStock') : `${t('sales.stock')}: ${product.stock}`}
        </span>

        {/* Product Name */}
        <h4
          className="font-medium text-slate-800 text-xs sm:text-sm mt-1 line-clamp-1"
          title={product.name}
        >
          {product.name}
        </h4>
      </div>

      {/* Middle Section: Price Info */}
      <div className="my-1.5">
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="font-bold text-green-600 text-xs sm:text-sm">
            ${(product.salePrice ?? 0).toFixed(2)}
          </span>
          {product.price && (
            <span className="font-normal text-slate-400 text-[11px]">
              <del>${product.price.toFixed(2)}</del>
            </span>
          )}
        </div>

        {/* Savings badge */}
        <div className="flex items-center gap-1 min-h-[20px]">
          {Number(product.discountPrice) > 0 &&
          Number(product.salePrice) < Number(product.price) ? (
            <>
              <IoGift size={13} className="text-blue-500 flex-shrink-0" />
              <span className="text-[10px] font-khmer text-blue-600 rounded line-clamp-1">
                {t('sales.save')} ${Number(product.discountPrice).toFixed(2)}
              </span>
            </>
          ) : null}
        </div>
      </div>

      {/* CTA button */}
      <div className="pt-1.5 border-t border-slate-100">
        <span
          className={`block w-full text-center text-xs py-1 rounded-md font-semibold transition-colors
            ${
              isOutOfStock
                ? "bg-slate-100 text-slate-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {isOutOfStock ? t('sales.outOfStock') : t('common.addBtn')}
        </span>
      </div>
    </div>
  );
}