import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../../../../context/CartContext";
import { useCreateOrderMutation } from "../../../../queries/orders/useOrderQueries";
import { sendOrderToTelegram } from "../../../../services/telegramService";

import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import DeliveryForm from "./DeliveryForm";

import useClientOrder from "../hooks/useClientOrder";

export default function CartDrawer() {
  const navigate = useNavigate();
  const { shop_code } = useParams();

  const [settingId, setSettingId] = useState(null);
  const [deliveryProviderId, setDeliveryProviderId] = useState(null);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    clearCart,
  } = useCart();

  const createOrderMutation = useCreateOrderMutation();

  const {
    customerName,
    setCustomerName,
    phone,
    setPhone,
    address,
    setAddress,
    note,
    setNote,
    deliveryMethod,
    setDeliveryMethod,
    deliveryFee,
    setDeliveryFee,
    errors,
    validateOrderForm,
    resetForm,
  } = useClientOrder();

  const hasItems = cartItems.length > 0;

  const grandTotal = cartTotal + (hasItems ? deliveryFee : 0);

  const handleCreateOrder = async (formattedPhone) => {
    const payload = {
      shop_code,
      setting_id: settingId,
      delivery_provider_id: deliveryProviderId,
      items: cartItems,
      subtotal: cartTotal,
      delivery: deliveryFee,
      customerInfo: {
        name: customerName,
        phone: formattedPhone,
        address,
        note,
        deliveryMethod,
      },
    };

    console.log("CartDrawer order payload:", payload);

    return createOrderMutation.mutateAsync(payload);
  };

  const resetCheckoutForm = () => {
    resetForm();
    setSettingId(null);
    setDeliveryProviderId(null);
    clearCart();
  };

  const handleOrder = async () => {
    const { isValid, formattedPhone } = validateOrderForm();

    if (!isValid) return;

    console.log("Setting ID before order:", settingId);
    console.log("Delivery Provider ID before order:", deliveryProviderId);
    console.log("Delivery method:", deliveryMethod);
    console.log("Delivery fee:", deliveryFee);

    if (!settingId) {
      await Swal.fire({
        icon: "warning",
        title: "សូមជ្រើសរើសការដឹកជញ្ជូន",
        text: "សូមជ្រើសរើស Delivery Provider មុនពេលបញ្ជាទិញ",
        confirmButtonColor: "#7f1d1d",
      });

      return;
    }

    if (!deliveryProviderId) {
      await Swal.fire({
        icon: "warning",
        title: "សូមជ្រើសរើស Delivery Provider",
        text: "សូមជ្រើសរើស Delivery Provider មុនពេលបញ្ជាទិញ",
        confirmButtonColor: "#7f1d1d",
      });

      return;
    }

    try {
      const newOrder = await handleCreateOrder(formattedPhone);

      console.log("Created order:", newOrder);

      try {
        await sendOrderToTelegram(newOrder);
      } catch (err) {
        console.error(
          "Failed to send order to Telegram:",
          err
        );
      }

      const orderData = newOrder?.data ?? newOrder;

      resetCheckoutForm();

      await Swal.fire({
        icon: "success",
        title: "បញ្ជាទិញជោគជ័យ 🎉",
        text: `ចំនួនសរុប $${grandTotal.toFixed(2)}`,
        confirmButtonText: "យល់ព្រម",
        confirmButtonColor: "#7f1d1d",
        allowOutsideClick: false,
      });

      const result = await Swal.fire({
        icon: "question",
        title: "បោះពុម្ពវិក្កយបត្រ?",
        text: "តើអ្នកចង់បោះពុម្ពវិក្កយបត្រដែរឬទេ?",
        showCancelButton: true,
        confirmButtonText: "🖨️ បោះពុម្ពវិក្កយបត្រ",
        cancelButtonText: "រំលង",
        confirmButtonColor: "#7f1d1d",
        cancelButtonColor: "#64748b",
      });

      if (result.isConfirmed) {
        if (orderData?.orderNo) {
          navigate(`/print-receipt/${orderData.orderNo}`);
        } else {
          await Swal.fire({
            icon: "error",
            title: "រកមិនឃើញ Order Number",
            text: "Order ត្រូវបានបង្កើត ប៉ុន្តែមិនអាចបើកវិក្កយបត្របានទេ",
            confirmButtonColor: "#7f1d1d",
          });
        }
      } else {
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error("Create order error:", error);

      Swal.fire({
        icon: "error",
        title: "បរាជ័យ",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "មានបញ្ហាក្នុងការបង្កើតការបញ្ជាទិញ",
        confirmButtonColor: "#7f1d1d",
      });
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] md:w-[480px] bg-white flex flex-col shadow-2xl md:rounded-l-3xl overflow-hidden transition-transform duration-300 ease-in-out ${
          isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <CartHeader />

        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6">
          {hasItems ? (
            <>
              <CartItemList />

              <DeliveryForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                note={note}
                setNote={setNote}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                setSettingId={setSettingId}
                setDeliveryProviderId={setDeliveryProviderId}
                deliveryFee={deliveryFee}
                setDeliveryFee={setDeliveryFee}
                errors={errors}
              />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 bg-white p-5 space-y-4">
          <CartSummary
            cartTotal={cartTotal}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            hasItems={hasItems}
          />

          <button
            type="button"
            onClick={handleOrder}
            disabled={
              !hasItems ||
              createOrderMutation.isPending
            }
            className={`w-full py-2 rounded-full font-semibold transition ${
              hasItems &&
              !createOrderMutation.isPending
                ? "bg-red-900 text-white hover:bg-red-800"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {createOrderMutation.isPending
              ? "កំពុងដំណើរការ..."
              : "បន្តទៅការបញ្ជាទិញ"}
          </button>
        </div>
      </div>
    </>
  );
}