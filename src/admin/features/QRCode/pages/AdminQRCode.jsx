import React, { useRef, useState } from "react";
import { ReactQRCode as QRCode } from "@lglab/react-qr-code";
import { useAuth } from "../../../../hooks/useAuth";
import {
  Copy,
  Download,
  Link as LinkIcon,
  QrCode as QrCodeIcon,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function AdminQRCode() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const shopCode = user?.shop?.code || "";
  const baseUrl = window.location.origin;
  const shopUrl = shopCode ? `${baseUrl}/shop/${shopCode}` : "";

  const copyToClipboard = async () => {
    if (!shopUrl) return;
    try {
      await navigator.clipboard.writeText(shopUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: t('qrcode.copiedLink'), showConfirmButton: false, timer: 1500 });
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Convert SVG size to standard download size
    const size = 1024;
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      // Draw white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw image
      ctx.drawImage(img, 0, 0, size, size);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_Code_${shopCode || "Shop"}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    // Properly encode the SVG data to handle any special characters
    const encodedData = encodeURIComponent(svgData);
    img.src = `data:image/svg+xml;utf8,${encodedData}`;
  };

  if (!shopCode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <QrCodeIcon size={48} className="text-amber-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">{t('qrcode.noStoreCode')}</h2>
          <p className="text-slate-500 max-w-sm text-center">
            {t('qrcode.pleaseSetStoreCode1')}{" "}
            {t('qrcode.pleaseSetStoreCode2')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto space-y-4 md:space-y-8 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
            <QrCodeIcon className="w-10 h-10 md:w-16 md:h-16" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {t('qrcode.storeQRCode')}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {t('qrcode.scanToVisitStore')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* QR Code Display Card */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group ">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div
            ref={qrRef}
            className=" bg-white rounded-2xl shadow-sm border border-slate-100 z-10 transition-transform duration-300 hover:scale-105"
          >
            <QRCode
              value={shopUrl}
              size={256}
              level="H"
              className="w-full max-w-[256px] h-auto"
            />
          </div>

          <div className="mt-6 md:mt-8 z-10 w-full flex justify-center">
            <button
              onClick={downloadQRCode}
              className="flex items-center gap-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/30 transition-all active:scale-95"
            >
              <Download size={18} />
              {t('qrcode.downloadAsImage')}
            </button>
          </div>
        </div>

        {/* Link Info Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm space-y-4 sm:space-y-6 flex flex-col justify-between">
          {/* Header Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {t('qrcode.storeLink')}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {t('qrcode.copyLinkToSend')}
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-1.5 sm:space-y-2 my-2 sm:my-0">
            <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
              URL
            </label>
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <span className="flex items-center justify-center px-3 sm:px-4 py-3 bg-slate-100 border-r border-slate-200 text-slate-400 shrink-0">
                <LinkIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
              <input
                type="text"
                readOnly
                value={shopUrl}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-transparent text-xs sm:text-sm text-slate-700 truncate focus:outline-none select-all"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={copyToClipboard}
            className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition-all active:scale-95 border cursor-pointer ${
              copied
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            }`}
          >
            {copied ? (
                <span>{t('qrcode.copied')}</span>
              ) : (
                <>
                  <Copy size={16} className="shrink-0" />
                  <span className="truncate">{t('qrcode.copyLink')}</span>
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
}
