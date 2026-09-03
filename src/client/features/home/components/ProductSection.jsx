import { useState, useMemo } from "react";
import FilterTabs from "../../../components/common/FilterTabs";
import SectionHeader from "../../../components/common/SectionHeader";
import ProductGrid from "../../products/components/ProductGrid";
import HorizontalProductGrid from "../../products/components/HorizontalProductGrid";
import ProductSkeletonGrid from "../../../components/common/ProductSkeletonGrid";
import HorizontalProductSkeletonGrid from "../../../components/common/HorizontalProductSkeletonGrid";
import { useSearch } from "../../../../context/SearchContext";
import { useOrdersQuery } from "../../../../queries/orders/useOrderQueries";
import { useProductsQuery } from "../../../../queries/products/useProductQueries";
import { useCategoriesQuery } from "../../../../queries/categories/useCategoryQueries";
import FilterTabsSkeleton from "../../../components/common/FilterTabsSkeleton";

export default function ProductSection({allProductsRef}) {
  const { data: products = [], isPending: isProductsPending } = useProductsQuery();
  const { data: categories = [], isPending: isCategoriesPending } = useCategoriesQuery();
  const { data: orders = [], isPending: isOrdersPending } = useOrdersQuery();
  const { searchItem = "", priceRange = "all" } = useSearch();

  const isLoading = isProductsPending || isCategoriesPending || isOrdersPending;

  const [activeTab, setActiveTab] = useState("ទាំងអស់");

  // Determine if searching, filtering by price, or filtering by a specific category
  const isSearching = searchItem.trim() !== "" || priceRange !== "all";
  const isCategoryFiltered = activeTab !== "ទាំងអស់";
  const shouldHideHighlights = isSearching || isCategoryFiltered;

  const tabs = useMemo(() => {
    return ["ទាំងអស់", ...categories.map((c) => c.name)];
  }, [categories]);

  const matchPriceRange = (price) => {
    const numPrice = Number(price) || 0;
    if (priceRange === "under-20") return numPrice < 20;
    if (priceRange === "20-50") return numPrice >= 20 && numPrice <= 50;
    if (priceRange === "50-100") return numPrice > 50 && numPrice <= 100;
    if (priceRange === "over-100") return numPrice > 100;
    return true;
  };

  // Handle Tab Change with auto-scroll to All Products when clicking "ទាំងអស់"
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "ទាំងអស់") {
      setTimeout(() => {
        if (allProductsRef.current) {
          const headerOffset = 100;
          const elementPosition = allProductsRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  // 1. BEST SELLING PRODUCTS: Filter & sort by real order sales data
  const bestSellingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Map product IDs to total quantity sold from paid orders
    const salesCountMap = new Map();

    (orders || [])
      .filter((order) => order.paymentStatus === "Paid")
      .flatMap((order) => order.orderDetails || order.items || [])
      .forEach((item) => {
        const pId = Number(item.productId || item.product_id || item.id);
        const qty = Number(item.quantity || 0);
        if (pId) {
          salesCountMap.set(pId, (salesCountMap.get(pId) || 0) + qty);
        }
      });

    // Sort products by total quantity sold descending
    const sorted = [...products].sort((a, b) => {
      const soldA = salesCountMap.get(Number(a.id)) || 0;
      const soldB = salesCountMap.get(Number(b.id)) || 0;
      if (soldB !== soldA) {
        return soldB - soldA;
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    // If orders with sales exist, prioritize sold products; otherwise top products
    const soldOnly = sorted.filter(
      (p) => (salesCountMap.get(Number(p.id)) || 0) > 0
    );

    return (soldOnly.length > 0 ? soldOnly : sorted).slice(0, 10);
  }, [products, orders]);

  // 2. LATEST PRODUCTS: 10 newest products sorted by createdAt descending
  const latestProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 10);
  }, [products]);

  // 3. ALL PRODUCTS: Full catalog with Category, Search keyword, and Price Range filtering
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products
      .filter((product) => {
        if (activeTab === "ទាំងអស់") return true;
        const catName =
          product.categoryName ||
          categories.find((c) => c.id === product.categoryId)?.name;
        return catName === activeTab;
      })
      .filter((product) =>
        (product.name || "").toLowerCase().includes(searchItem.toLowerCase())
      )
      .filter((product) =>
        matchPriceRange(product.salePrice ?? product.price ?? 0)
      );
  }, [products, categories, activeTab, searchItem, priceRange]);

  return (
    <div className="space-y-5">
      {/* Category Filter Tabs */}
      <div>
        <h2 className="flex items-center text-xl mt-3 md:mt-0 font-bold text-slate-800 leading-khmer">
          ស្វែងរកទំនិញតាមប្រភេទ
        </h2>
        {isCategoriesPending ? (
          <FilterTabsSkeleton count={6} />
        ) : (
          <FilterTabs tabs={tabs} onChange={handleTabChange} />
        )}
      </div>

      {/* 1. Best Selling Section - Hidden during search or category filtering */}
      {!shouldHideHighlights && (
        <section>
          <SectionHeader title="ទំនិញលក់ដាច់បំផុត" />
          {isLoading ? <HorizontalProductSkeletonGrid count={5} /> : <HorizontalProductGrid products={bestSellingProducts} />}
        </section>
      )}

      {/* 2. Latest Products Section - Hidden during search or category filtering */}
      {!shouldHideHighlights && (
        <section>
          <SectionHeader title="ទំនិញពេញថ្មី" />
          {isLoading ? <HorizontalProductSkeletonGrid count={5} /> : <HorizontalProductGrid products={latestProducts} />}
        </section>
      )}

      {/* 3. All Products Section - Target for auto-scroll and category/search results */}
      <section ref={allProductsRef} className="scroll-mt-24">
        <SectionHeader
          title={
            isCategoryFiltered
              ? `ទំនិញប្រភេទ: ${activeTab}`
              : isSearching
              ? `លទ្ធផលស្វែងរក (${filteredProducts.length})`
              : "ទំនិញពេញទាំងអស់"
          }
        />
        {isLoading ? <ProductSkeletonGrid count={8} /> : <ProductGrid products={filteredProducts} />}
      </section>
    </div>
  );
}