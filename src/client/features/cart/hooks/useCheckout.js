import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function useCheckout({
  hasItems,
  grandTotal,
  setIsCartOpen,
  resetCheckoutForm,
  navigate,
}) {
  const [showQr, setShowQr] = useState(false)
  const [qrSeconds, setQrSeconds] = useState(0)
  const [qrCompleted, setQrCompleted] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)

  useEffect(() => {
    if (!showQr || !hasItems) {
      return
    }

    const interval = setInterval(() => {
      setQrSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)

          setShowQr(false)
          setQrCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [showQr, hasItems])

  useEffect(() => {
    if (!qrCompleted) {
      return
    }

    handlePaymentSuccess()
  }, [qrCompleted])

  const handlePaymentSuccess = async () => {
    setQrCompleted(false)
    
    if (resetCheckoutForm) {
      resetCheckoutForm() 
    }
    setIsCartOpen(false)
    await Swal.fire({
      icon: "success",
      title: "បញ្ជាទិញជោគជ័យ 🎉",
      text: `ការបញ្ជាទិញរបស់អ្នកត្រូវបានបញ្ជូន។ ចំនួនសរុប $${grandTotal.toFixed(
        2
      )}`,
      confirmButtonText: "យល់ព្រម",
      confirmButtonColor: "#7f1d1d",
      allowOutsideClick: false,
    })

    const result = await Swal.fire({
      icon: "question",
      title: "Print Receipt?",
      text: "តើអ្នកចង់បោះពុម្ពវិក្កយបត្រដែរឬទេ?",
      showCancelButton: true,
      confirmButtonText: "🖨️ Print Receipt",
      cancelButtonText: "រំលង",
      confirmButtonColor: "#7f1d1d",
      cancelButtonColor: "#64748b",
      allowOutsideClick: false,
    })

    if (result.isConfirmed && currentOrderId) {
      if (navigate) {
        navigate(`/print-receipt/${currentOrderId}`)
      }
    }
  }

  const startQrPayment = (orderId) => {
    setCurrentOrderId(orderId)
    setQrCompleted(false)
    setQrSeconds(10)
    setShowQr(true)
  }

  const closeQr = () => {
    setShowQr(false)
    setQrCompleted(false)
    setCurrentOrderId(null)
  }

  return {
    showQr,
    qrSeconds,
    startQrPayment,
    closeQr,
  }
}