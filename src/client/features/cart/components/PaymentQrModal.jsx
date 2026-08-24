import React from 'react';
import { Cell } from 'recharts';
import Swal from 'sweetalert2';

// Icons
const ShareIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CopyIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const formatTime = (time) => {
  if (typeof time === 'number') {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return time; 
};

export default function PaymentQrModal({
  showQr,
  paymentMethod,
  paymentImage,
  grandTotal,
  qrSeconds,
  onClose,
}) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment QR Code',
          text: `Please pay $${grandTotal.toFixed(2)}`,
          url: paymentImage || window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Share not supported',
        text: 'Your browser does not support the Web Share API.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const handleDownload = () => {
    if (!paymentImage) return;
    const link = document.createElement('a');
    link.href = paymentImage;
    link.download = 'payment-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Downloaded!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
  };

  const handleCopy = async () => {
    if (!paymentImage) return;
    try {
      // Fetch the image to get it as a Blob
      const response = await fetch(paymentImage);
      const blob = await response.blob();
      
      // Write the blob to the clipboard
      await navigator.clipboard.write([
        new window.ClipboardItem({
          [blob.type]: blob
        })
      ]);

      Swal.fire({
        icon: 'success',
        title: 'Image Copied!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (err) {
      console.error("Copy failed:", err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to copy',
        text: 'Your browser may not support copying images directly.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4
        transition-all duration-300 ease-out backdrop-blur-sm
        ${
          showQr
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
    >
      <div
        className={`relative w-full max-w-[370px] rounded-[24px] bg-white shadow-2xl pb-4
          transition-all duration-300 ease-out flex flex-col overflow-hidden
          ${
            showQr
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 translate-y-5 opacity-0"
          }`}
      >
        {/* Red Header */}
        <div className="bg-[#E52D27] relative">
          <div className="py-2 text-center flex justify-center">
            {/* You can replace this with an actual KHQR white logo SVG if preferred */}
            <h2 className="text-[25px] font-black text-white tracking-widest leading-none mt-1">
              {paymentMethod?.toUpperCase() || 'KHQR'}
            </h2>
          </div>
          {/* Bottom right cut effect */}
          <div className="absolute right-0 bottom-0 w-0 h-0 border-b-[28px] border-b-white border-l-[28px] border-l-transparent"></div>
        </div>

        <div className="px-5 pt-2 flex flex-col flex-grow">
          {/* Store & Amount */}
          <div className="text-left mt-1">
            <p className="text-[12px] font-black text-[#0B1E40] uppercase tracking-wide">
              ONE STORE
            </p>
            <p className="text-[38px] font-black text-[#0B1E40] mt-0.5 leading-none tracking-tight">
              <span className="text-[20px] mr-1.5 font-bold text-[#0B1E40]">$</span>
              {grandTotal?.toFixed(2) || "1.00"}
            </p>
          </div>

          {/* Dashed Separator */}
          <div className="my-1 border-t-[1.5px] border-dashed border-slate-200"></div>

          {/* QR Code */}
          <div className="flex justify-center mb-5">
            <img
              src={paymentImage}
              alt={`${paymentMethod} QR Code`}
              className="w-full max-w-[260px] aspect-square object-contain"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full gap-[6px] mb-4">
            <button onClick={handleShare} className="flex items-center justify-center gap-1.5 flex-1 py-[4px] px-1 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors outline-none">
              <ShareIcon className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">ចែករំលែក</span>
            </button>
            
            <button onClick={handleDownload} className="flex items-center justify-center gap-1.5 flex-1 py-[4px] px-1 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors outline-none">
              <DownloadIcon className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">រក្សាទុក</span>
            </button>
            
            <button onClick={handleCopy} className="flex items-center justify-center gap-1.5 flex-1 py-[4px] px-1 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors outline-none">
              <CopyIcon className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">ចម្លងរូបភាព</span>
            </button>

            <button onClick={onClose} className="flex items-center justify-center flex-1 py-[5px] px-1 rounded-xl bg-[#FFF0F0] hover:bg-red-100 transition-colors outline-none">
              <CloseIcon className="w-3.5 h-3.5 text-[#E52D27]" />
              <span className="text-[11px] font-bold text-[#E52D27] whitespace-nowrap">បោះបង់</span>
            </button>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-[18px] h-[18px] text-[#28B2A5]" />
              <span className="text-[12px] font-bold text-slate-500">ផុតកំណត់</span>
            </div>
            <span className="font-bold text-[#28B2A5] text-[13px]">{formatTime(qrSeconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}