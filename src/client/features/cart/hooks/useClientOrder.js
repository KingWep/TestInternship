import { useState } from "react";
import { clientOrderSchema } from "../schemas/clientOrderSchema";

export default function useClientOrder() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(2.0);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);

  const [errors, setErrors] = useState({});

  const validateOrderForm = () => {
    const dataToValidate = { phone, address, deliveryMethod, paymentMethod };
    const result = clientOrderSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors = {};
      for (const key in fieldErrors) {
        formattedErrors[key] = fieldErrors[key][0];
      }
      setErrors(formattedErrors);
      return { isValid: false, formattedPhone: null };
    }

    setErrors({});
    return { isValid: true, formattedPhone: result.data.phone };
  };

  const resetForm = () => {
    setCustomerName("");
    setPhone("");
    setAddress("");
    setNote("");
    setDeliveryMethod("");
    setPaymentMethod("");
    setPaymentImage(null);
    setErrors({});
  };

  return {
    // Form State
    customerName, setCustomerName,
    phone, setPhone,
    address, setAddress,
    note, setNote,
    deliveryMethod, setDeliveryMethod,
    deliveryFee, setDeliveryFee,
    paymentMethod, setPaymentMethod,
    paymentImage, setPaymentImage,
    
    // Validation State
    errors, setErrors,
    
    // Actions
    validateOrderForm,
    resetForm
  };
}
