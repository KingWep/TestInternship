import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import {
  Printer,
  FileDown,
  Send,
  ArrowLeft,
  Loader2,
  Package,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import { useOrdersQuery } from "../../../../queries/orders/useOrderQueries";
import { orderService } from "../../../../services/orderService";
import { sendOrderToTelegram } from "../../../../services/telegramService";
import { useSettingsQuery } from "../../../../queries/settings/useSettingQueries";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from 'react-i18next';

function AdminReceiptCard({ order }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const shopCode = user?.shop?.code;
  const { data: settingData } = useSettingsQuery(shopCode);
  const [imgError, setImgError] = useState(false);
  const shopName = settingData?.shop_name || "Shop";
  const rawLogo = settingData?.logo;
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
  const logoUrl = rawLogo ? (rawLogo.startsWith('http') ? rawLogo : `${baseUrl}${rawLogo.startsWith('/') ? '' : '/'}${rawLogo}`) : "";
  const delivery = Number(order?.deliveryFee) || 0;
  const total = Number(order?.totalAmount) || 0;
  const subtotal = total - delivery;

  return (
    <div
      id="admin-receipt-card"
      style={{
        width: "340px",
        fontFamily:
          "'Geist Variable', 'Battambang', 'Siemreap', 'Kantumruy Pro', 'Noto Sans Khmer', sans-serif",
        boxSizing: "border-box",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
      className="bg-white text-slate-900 mx-auto text-xs px-5 py-6 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="text-center border-b border-dashed border-slate-800 pb-3 mb-3 w-full">
        {logoUrl && !imgError ? (
          <img src={logoUrl} alt={shopName} className="h-10 mx-auto mb-2 object-contain rounded-md" onError={() => setImgError(true)} />
        ) : null}
        <h2 className="font-black text-base tracking-wider uppercase text-slate-900 leading-tight">
          {shopName}
        </h2>
        <p className="text-[11px] text-slate-900 mt-1">
          {t('order.phone')} 088 66 77 456
        </p>
        <p className="text-[11px] text-slate-900">{t('order.phnomPenhCambodia')}</p>
      </div>

      {/* Meta Info */}
      <div className="text-[11px] space-y-1.5 mb-3 flex flex-col border-b border-dashed border-slate-800 pb-3 text-slate-700 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">{t('order.receiptNo')}</span>
          <span className="font-mono font-bold text-slate-900">
            {order?.orderNo || order?.orderNumber || `ORD-${order?.id}`}
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">{t('order.date')}</span>
          <span className="font-mono text-slate-800">
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : order?.date || ""}{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleTimeString()
              : order?.time || ""}
          </span>
        </div>
        {order?.customerName && (
          <div className="flex justify-between items-center w-full">
            <span className="font-medium text-slate-900">{t('order.customer')}</span>
            <span className="font-bold text-slate-900 truncate max-w-[180px]">
              {order.customerName || t('order.generalCustomer')}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">{t('order.phone')}</span>
          <span className="font-mono text-slate-900 font-semibold">
            {order?.customerPhone || order?.phone || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-slate-900">{t('order.deliveryService')}</span>
          <span className="font-bold text-slate-900">
            {order?.deliveryProvider?.name || order?.deliveryMethod || t('order.none')}
          </span>
        </div>
        {(order?.customerAddress || order?.address) && (
          <div className="flex justify-between items-start w-full">
            <span className="font-medium text-slate-900 shrink-0">
              {t('order.addressLabel')}
            </span>
            <span className="text-slate-800 text-right truncate max-w-[190px]">
              {order.customerAddress || order.address}
            </span>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="mb-3 w-full border-b border-dashed border-slate-800 pb-3">
        <table className="w-full text-[11px] table-fixed border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-900 font-bold">
              <th className="text-left pb-1.5 font-bold w-[45%]">{t('order.itemCol')}</th>
              <th className="text-center pb-1.5 font-bold w-[15%]">{t('order.qtyCol')}</th>
              <th className="text-right pb-1.5 font-bold w-[20%]">{t('order.priceCol')}</th>
              <th className="text-right pb-1.5 font-bold w-[20%]">{t('order.totalCol')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(() => {
              const orderItems = order?.orderDetails || order?.items || [];
              return orderItems.length > 0 ? (
                orderItems.map((item, idx) => {
                  const price =
                    Number(item.price) || Number(item.salePrice) || 0;
                  const qty = Number(item.quantity) || 0;
                  return (
                    <tr key={item.id ?? idx} className="text-slate-800">
                      <td className="py-1.5 pr-1 font-medium break-words text-left align-top leading-snug">
                        {item.product_name || item.name}
                      </td>
                      <td className="py-1.5 text-center tabular-nums text-slate-600 font-semibold align-top">
                        {qty}
                      </td>
                      <td className="py-1.5 text-right tabular-nums text-slate-600 align-top">
                        ${price.toFixed(2)}
                      </td>
                      <td className="py-1.5 text-right tabular-nums font-bold text-slate-900 align-top">
                        ${(price * qty).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 text-center text-slate-400">
                    {t('order.noItems')}
                  </td>
                </tr>
              );
            })()}
          </tbody>
        </table>
      </div>

      {/* Pricing Summary */}
      <div className="space-y-1.5 pb-3 mb-3 border-b border-dashed border-slate-800 text-[11px] text-slate-700 w-full">
        <div className="flex justify-between items-center">
          <span className="text-slate-900">{t('order.subtotalLabel')}</span>
          <span className="tabular-nums font-medium text-slate-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-900">{t('order.deliveryFeeLabel')}</span>
          <span className="tabular-nums font-medium text-slate-800">
            ${delivery.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-1.5 border-t border-slate-800 text-sm font-bold text-slate-900">
          <span>{t('order.totalLabel')}</span>
          <span className="tabular-nums font-black text-slate-950">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Footer message */}
      <div className="text-center space-y-0.5 pt-0.5 w-full">
        <p className="text-[11px] font-bold text-slate-900">
          {t('order.thankYouReceipt')}
        </p>
        <p className="text-[10px] text-slate-900 font-medium tracking-wide uppercase">
          {t('order.comeAgain')}
        </p>
      </div>
    </div>
  );
}

export default function AdminReceiptPage() {
  const { t } = useTranslation();
  const { No: paramNo } = useParams();
  const { data: orders = [] } = useOrdersQuery();
  const order = orders?.find(
    (o) =>
      String(o.orderNo) === String(paramNo) ||
      String(o.orderNumber) === String(paramNo)
  );

  const printRef = useRef(null);
  const [loading, setLoading] = useState(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Receipt-${order?.orderNo || order?.orderNumber || order?.id || 'order'}`,
    pageStyle: `
      @page { 
        size: auto; 
        margin: 10mm; 
      }
      @media print { 
        html, body { 
          width: 100%;
          height: 100%;
          margin: 0 !important; 
          padding: 0 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact;
        }
        #admin-receipt-card {
          margin: auto !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    `,
  });

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Package size={28} />
        </div>
        <p className="text-base font-semibold text-slate-700 mb-1">
          {t('order.receiptNotFound')}
        </p>
        <p className="text-xs text-slate-400 mb-4">{t('order.receiptId')} #{paramNo}</p>
        <Link
          to="/admin/orders"
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-slate-200 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{t('order.goBack')}</span>
        </Link>
      </div>
    );
  }

  const handleSaveImage = async () => {
    if (!printRef.current) return;
    setLoading("img");
    try {
      await document.fonts.ready;

      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `Receipt-${order.orderNo || order.orderNumber || order.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image export failed:", err);
      Swal.fire({
        icon: "error",
        title: t('common.failed'),
        text: t('order.downloadImgError'),
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleSendTelegram = async () => {
    setLoading("telegram");

    try {
      await sendOrderToTelegram(order);

      Swal.fire({
        icon: "success",
        title: t('common.success'),
        text: t('order.receiptSentToTelegram'),
        confirmButtonColor: "#0284c7",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Telegram error:", error);

      Swal.fire({
        icon: "error",
        title: t('common.failed'),
        text: error.message || t('order.telegramSendError'),
        confirmButtonColor: "#0f172a",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-8 px-4 font-sans text-slate-800">
      <div className="w-full max-w-md flex items-center justify-between mb-5">
        <Link
          to="/admin/orders"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 bg-white px-3 py-1 rounded-lg shadow-xs border border-slate-200 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          <span>{t('order.goBack')}</span>
        </Link>
        <span className="text-xs font-bold text-slate-900 bg-slate-200/70 px-2.5 py-1 rounded">
          {t('order.receiptSize')} (Receipt)
        </span>
      </div>

      <div className="bg-white mb-6 border border-slate-200 flex items-center justify-center">
        <div ref={printRef} className="bg-white inline-block">
          <AdminReceiptCard order={order} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-2 max-w-md w-full pt-1">
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white px-0 py-0.5 rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all text-xs font-semibold shadow-xs cursor-pointer group"
        >
          <Printer
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
          />
          <span>{t('order.printReceipt')}</span>
        </button>

        {/* Download PNG Button */}
        <button
          onClick={handleSaveImage}
          disabled={loading === "img"}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white text-slate-700 border border-slate-200 px-0 py-0.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98] transition-all text-xs font-semibold shadow-2xs disabled:opacity-60 cursor-pointer group"
        >
          {loading === "img" ? (
            <Loader2 size={14} className="animate-spin text-slate-900" />
          ) : (
            <FileDown
              size={14}
              className="transition-transform group-hover:translate-y-0.5 text-slate-500 group-hover:text-slate-900"
            />
          )}
          <span>{loading === "img" ? t('order.saving') : t('order.downloadReceipt')}</span>
        </button>

        {/* Telegram Button */}
        <button
          onClick={handleSendTelegram}
          disabled={loading === "telegram"}
          className="flex-1 flex items-center justify-center gap-1.5 bg-sky-600 text-white px-0 py-0.5 rounded-lg hover:bg-sky-500 active:scale-[0.98] transition-all text-xs font-semibold shadow-xs disabled:opacity-60 cursor-pointer group"
        >
          {loading === "telegram" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          )}
          <span>{loading === "telegram" ? t('order.sending') : t('order.sendToTelegram')}</span>
        </button>
      </div>
    </div>
  );
}