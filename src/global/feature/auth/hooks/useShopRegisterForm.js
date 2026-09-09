import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSettingMutation } from "../../../../queries/settings/useSettingQueries";
import {
  accountSetupSchema,
  shopIdentitySchema,
  contactSupportSchema,
} from "../../../../validations/shopRegister.schema";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { shopRegisterSchema } from "../../../../validations/shopRegister.schema";

const steps = [
  { id: 1, name: "Account Setup", schema: accountSetupSchema },
  { id: 2, name: "Shop Identity", schema: shopIdentitySchema },
  { id: 3, name: "Contact & Support", schema: contactSupportSchema },
];

export const useShopRegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const createSettingMutation = useCreateSettingMutation();
  const form = useForm({
    resolver: zodResolver(shopRegisterSchema),
    shouldUnregister: false,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      shop_name: "",
      logo: undefined,
      chat_id: "",
      address: "",
      support: undefined,
      social_media: [{ platform: "", url: "" }],
    },
    mode: "onTouched",
  });

  const nextStep = async () => {
    let fields = [];

    if (currentStep === 1) {
      fields = ["name", "email", "password", "phone"];
    }

    if (currentStep === 2) {
      fields = ["shop_name", "logo", "chat_id"];
    }
    if (currentStep === 3) {
      fields = ["address", "support", "social_media"];
    }
    const isStepValid = await form.trigger(fields);
    if (!isStepValid) {
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    if (currentStep !== steps.length) {
      return nextStep();
    }

    const formData = new FormData();

    // Append Account Setup
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    // Append Shop Identity
    formData.append("shop_name", data.shop_name);
    formData.append("chat_id", data.chat_id || "");

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    // Append Contact & Support
    formData.append("address", data.address || "");
    if (data.support && data.support.length > 0) {
      formData.append("support", data.support[0]);
    }

    // Filter out empty social media links
    const validSocialMedia = data.social_media?.filter(
      (sm) => sm.platform.trim() !== "" && sm.url.trim() !== "",
    );

    if (validSocialMedia && validSocialMedia.length > 0) {
      formData.append("social_media", JSON.stringify(validSocialMedia));
    } else {
      formData.append("social_media", "[]");
    }

    try {
      await createSettingMutation.mutateAsync(formData);

      Swal.fire({
        icon: "success",
        title: "ជោគជ័យ",
        text: "គណនីត្រូវបានបង្កើតដោយជោគជ័យ",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Register API Error:", error);

      let errorMessage = "ការបង្កើតគណនីបរាជ័យ (Registration Failed)";

      if (!error.response) {
        errorMessage = "មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនមេបានទេ (Network Error/CORS)";
      } else {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          errorMessage;
      }

      Swal.fire({
        icon: "error",
        title: "បរាជ័យ",
        text: errorMessage,
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return {
    form,
    currentStep,
    steps,
    nextStep,
    prevStep,
    onSubmit,
    isLoading: createSettingMutation.isPending,
  };
};
