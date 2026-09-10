import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import { useCreateOrderMutation } from "../../../../queries/orders/useOrderQueries";
import { sendOrderToTelegram } from "../../../../services/telegramService";
import { useProductsQuery } from "../../../../queries/products/useProductQueries";
import { useCategoriesQuery } from "../../../../queries/categories/useCategoryQueries";

const INITIAL_CUSTOMER = {
  name: "",
  phone: "",
  address: "",
  deliveryFee: "",
};

export default function useSalesForm() {
  const { t } = useTranslation();

  const {
    data: products = [],
    isPending: isProductsLoading,
  } = useProductsQuery();

  const {
    data: categories = [],
    isPending: isCategoriesLoading,
  } = useCategoriesQuery();

  const createOrderMutation = useCreateOrderMutation();

  const isLoading =
    isProductsLoading || isCategoriesLoading;

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
  });

  const filterOptions = useMemo(() => {
    const uniqueCategories = [
      t("common.all"),
      ...categories.map((c) => c.name),
    ];

    return [
      {
        key: "category",
        options: uniqueCategories,
        searchable: true,
      },
    ];
  }, [categories, t]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getStock = (product) => {
    return Math.max(
      0,
      Number(
        product?.stockQuantity ?? product?.stock ?? 0
      ) || 0
    );
  };

  const handleAddToCart = (product) => {
    const stock = getStock(product);

    if (stock <= 0) {
      Swal.fire({
        icon: "warning",
        title: t("sales.outOfStock"),
        text: t("sales.productOutOfStock"),
        confirmButtonColor: "#3b82f6",
        confirmButtonText: t("common.gotIt"),
      });

      return;
    }

    let result = {
      success: true,
      message: "",
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) => Number(item.id) === Number(product.id)
      );

      if (existing) {
        const currentQuantity =
          Number(existing.quantity) || 0;

        if (currentQuantity >= stock) {
          result = {
            success: false,
            message: `ទំនិញនេះមានត្រឹម ${stock} ប៉ុណ្ណោះ`,
          };

          return prev;
        }

        return prev.map((item) =>
          Number(item.id) === Number(product.id)
            ? {
                ...item,
                quantity: currentQuantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    if (!result.success) {
      Swal.fire({
        icon: "warning",
        title: t("sales.outOfStock"),
        text: result.message,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdateQuantity = (id, qty) => {
    const newQuantity = Number(qty);

    if (!Number.isFinite(newQuantity) || newQuantity <= 0) {
      setCart((prev) =>
        prev.filter(
          (item) => Number(item.id) !== Number(id)
        )
      );

      return;
    }

    setCart((prev) =>
      prev
        .map((item) => {
          if (Number(item.id) !== Number(id)) {
            return item;
          }

          const stock = getStock(item);

          if (stock <= 0) {
            return null;
          }

          const cappedQuantity = Math.min(
            newQuantity,
            stock
          );

          return {
            ...item,
            quantity: cappedQuantity,
          };
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => Number(item.id) !== Number(id)
      )
    );
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(
        item.salePrice || item.price || 0
      );

      const quantity = Number(item.quantity) || 0;

      return acc + price * quantity;
    }, 0);
  }, [cart]);

  const filterProducts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return products.filter((product) => {
      const productName =
        product?.name?.toLowerCase() || "";

      const matchSearch =
        productName.includes(searchValue);

      const matchFilter =
        !filters.category ||
        filters.category === t("common.all") ||
        product.categoryName === filters.category;

      return matchSearch && matchFilter;
    });
  }, [products, search, filters.category, t]);

  const handleCheckout = async ({ customerInfo }) => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: t("common.cartEmpty"),
        text: t("common.addProductsFirst"),
        confirmButtonColor: "#3b82f6",
        confirmButtonText: t("common.gotIt"),
      });

      return null;
    }

    const invalidStockItem = cart.find((item) => {
      const stock = getStock(item);
      const quantity = Number(item.quantity) || 0;

      return stock <= 0 || quantity > stock;
    });

    if (invalidStockItem) {
      Swal.fire({
        icon: "warning",
        title: t("sales.outOfStock"),
        text: `${invalidStockItem.name} ${t(
          "sales.stockChanged"
        )}`,
        confirmButtonColor: "#3b82f6",
        confirmButtonText: t("common.gotIt"),
      });

      return null;
    }

    let newOrder;

    try {
      newOrder = await createOrderMutation.mutateAsync({
        items: cart,
        subtotal,
        delivery: Number(customerInfo.deliveryFee) || 0,
        customerInfo,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("common.failed"),
        text: t("sales.createOrderError"),
        confirmButtonColor: "#3b82f6",
      });

      return null;
    }

    setCart([]);
    setSearch("");

    setFilters({
      category: "",
    });

    try {
      await sendOrderToTelegram(newOrder);
    } catch (error) {
      console.error(
        "Failed to send order to Telegram:",
        error
      );
    }

    Swal.fire({
      icon: "success",
      title: t("sales.orderSuccess"),
      confirmButtonColor: "#3b82f6",
      confirmButtonText: t("common.great"),
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
    });

    return newOrder;
  };

  return {
    search,
    setSearch,
    filters,
    handleFilterChange,
    filterOptions,
    filterProducts,
    cart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    subtotal,
    INITIAL_CUSTOMER,
    isLoading,
  };
}