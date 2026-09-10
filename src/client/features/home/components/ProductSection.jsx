import {
  useMemo,
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

import FilterTabs from "../../../components/common/FilterTabs";
import SectionHeader from "../../../components/common/SectionHeader";

import ProductGrid from "../../products/components/ProductGrid";
import HorizontalProductGrid from "../../products/components/HorizontalProductGrid";

import ProductSkeletonGrid from "../../../components/common/ProductSkeletonGrid";
import HorizontalProductSkeletonGrid from "../../../components/common/HorizontalProductSkeletonGrid";
import FilterTabsSkeleton from "../../../components/common/FilterTabsSkeleton";

import { useSearch } from "../../../../context/SearchContext";

import { useOrdersQuery } from "../../../../queries/orders/useOrderQueries";
import { useProductsQuery } from "../../../../queries/products/useProductQueries";
import { useCategoriesQuery } from "../../../../queries/categories/useCategoryQueries";

const PAGE_SIZE = 8;

export default function ProductSection({ allProductsRef }) {
  const { shop_code } = useParams();

  const {
    data: products = [],
    isPending: isProductsPending,
  } = useProductsQuery({
    shop_code,
  });

  const {
    data: categories = [],
    isPending: isCategoriesPending,
  } = useCategoriesQuery({
    shop_code,
  });

  const {
    data: orders = [],
    isPending: isOrdersPending,
  } = useOrdersQuery({
    shop_code,
  });

  const {
    searchItem = "",
    priceRange = "all",
  } = useSearch();

  const [activeTab, setActiveTab] = useState("ទាំងអស់");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const isProductLoading =
    isProductsPending || isCategoriesPending;

  const isBestSellingLoading =
    isProductsPending || isOrdersPending;

  const isSearching =
    searchItem.trim() !== "" ||
    priceRange !== "all";

  const isCategoryFiltered =
    activeTab !== "ទាំងអស់";

  const shouldHideHighlights =
    isSearching || isCategoryFiltered;

  const tabs = useMemo(() => {
    return [
      {
        name: "ទាំងអស់",
        image: null,
      },
      ...categories.map((category) => ({
        name: category.name,
        image: category.image || null,
      })),
    ];
  }, [categories]);

  const matchPriceRange = (price) => {
    const numPrice = Number(price) || 0;

    if (priceRange === "under-20") {
      return numPrice < 20;
    }

    if (priceRange === "20-50") {
      return (
        numPrice >= 20 &&
        numPrice <= 50
      );
    }

    if (priceRange === "50-100") {
      return (
        numPrice > 50 &&
        numPrice <= 100
      );
    }

    if (priceRange === "over-100") {
      return numPrice > 100;
    }

    return true;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(PAGE_SIZE);

    if (tab === "ទាំងអស់") {
      setTimeout(() => {
        if (!allProductsRef?.current) {
          return;
        }

        const headerOffset = 100;

        const elementPosition =
          allProductsRef.current.getBoundingClientRect().top;

        const offsetPosition =
          elementPosition +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  const bestSellingProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }

    const salesCountMap = new Map();

    (orders || [])
      .filter(
        (order) =>
          order.paymentStatus === "Paid"
      )
      .flatMap(
        (order) =>
          order.orderDetails ||
          order.items ||
          []
      )
      .forEach((item) => {
        const productId = Number(
          item.productId ??
            item.product_id ??
            item.id
        );

        const quantity = Number(
          item.quantity || 0
        );

        if (!productId) {
          return;
        }

        salesCountMap.set(
          productId,
          (salesCountMap.get(productId) || 0) +
            quantity
        );
      });

    const sortedProducts = [...products].sort(
      (a, b) => {
        const soldA =
          salesCountMap.get(
            Number(a.id)
          ) || 0;

        const soldB =
          salesCountMap.get(
            Number(b.id)
          ) || 0;

        if (soldB !== soldA) {
          return soldB - soldA;
        }

        return (
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        );
      }
    );

    const soldOnly =
      sortedProducts.filter(
        (product) =>
          (salesCountMap.get(
            Number(product.id)
          ) || 0) > 0
      );

    return (
      soldOnly.length > 0
        ? soldOnly
        : sortedProducts
    ).slice(0, 10);
  }, [products, orders]);

  const latestProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }

    return [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 10);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }

    return products
      .filter((product) => {
        if (activeTab === "ទាំងអស់") {
          return true;
        }

        const categoryName =
          product.categoryName ||
          categories.find(
            (category) =>
              Number(category.id) ===
              Number(product.categoryId)
          )?.name;

        return categoryName === activeTab;
      })
      .filter((product) =>
        (product.name || "")
          .toLowerCase()
          .includes(
            searchItem
              .trim()
              .toLowerCase()
          )
      )
      .filter((product) =>
        matchPriceRange(
          product.salePrice ??
            product.price ??
            0
        )
      );
  }, [
    products,
    categories,
    activeTab,
    searchItem,
    priceRange,
  ]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(
      0,
      visibleCount
    );
  }, [
    filteredProducts,
    visibleCount,
  ]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    activeTab,
    searchItem,
    priceRange,
  ]);

  const hasMoreProducts =
    visibleCount <
    filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(
        prev + PAGE_SIZE,
        filteredProducts.length
      )
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="flex items-center gap-2 text-xl mt-3 md:mt-0 font-bold text-slate-800 leading-khmer">
          <Icon
            icon="arcticons:circle-search"
            height="1.5em"
            style={{
              color: "#d1a500",
            }}
            aria-hidden="true"
          />

          ស្វែងរកទំនិញតាមប្រភេទ
        </h2>

        {isCategoriesPending ? (
          <FilterTabsSkeleton count={6} />
        ) : (
          <FilterTabs
            tabs={tabs}
            onChange={handleTabChange}
          />
        )}
      </div>

      {!shouldHideHighlights && (
        <section>
          <SectionHeader
            icon="arcticons:questionnaire-star"
            iconHeight="1.5em"
            title="ទំនិញលក់ដាច់បំផុត"
          />

          {isBestSellingLoading ? (
            <HorizontalProductSkeletonGrid
              count={5}
            />
          ) : (
            <HorizontalProductGrid
              products={bestSellingProducts}
            />
          )}
        </section>
      )}

      {!shouldHideHighlights && (
        <section>
          <SectionHeader
            icon="arcticons:all-accor"
            iconHeight="1.5em"
            title="ទំនិញពេញថ្មី"
          />

          {isProductLoading ? (
            <HorizontalProductSkeletonGrid
              count={5}
            />
          ) : (
            <HorizontalProductGrid
              products={latestProducts}
            />
          )}
        </section>
      )}

      <section
        ref={allProductsRef}
        className="scroll-mt-24"
      >
        <SectionHeader
          icon="ant-design:product-outlined"
          iconHeight="1.5em"
          title={
            isCategoryFiltered
              ? `ទំនិញប្រភេទ: ${activeTab}`
              : isSearching
                ? `លទ្ធផលស្វែងរក (${filteredProducts.length})`
                : "ទំនិញពេញទាំងអស់"
          }
        />

        {isProductLoading ? (
          <ProductSkeletonGrid count={8} />
        ) : (
          <>
            <ProductGrid
              products={visibleProducts}
            />

            {hasMoreProducts && (
              <div className="flex justify-center pt-5">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-800 text-white bg-red-700 px-4 py-2 text-sm font-medium  shadow-sm transition-all duration-400 animate-bounce hover:border-red-800 hover:bg-red-900 hover:shadow active:scale-[0.98]"
                >
                  <Icon
                    icon="material-symbols:expand-more"
                    height="1.3em"
                  />
                  មើលទំនិញបន្ថែម
                </button>
              </div>
            )}

            {!hasMoreProducts &&
              filteredProducts.length > 0 && (
                <div className="py-4 text-center text-sm text-slate-400">
                  បានបង្ហាញទំនិញទាំងអស់
                </div>
              )}

            {!visibleProducts.length && (
              <div className="py-10 text-center text-sm text-slate-400">
                រកមិនឃើញទំនិញទេ
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}