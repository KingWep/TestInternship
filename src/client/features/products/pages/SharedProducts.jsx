import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import Container from "../../../components/layout/Container";
import ProductGrid from "../components/ProductGrid";
import { useProductsQuery } from "../../../../queries/products/useProductQueries";

export default function SharedProducts() {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get("ids");
  
  const { data: allProducts = [], isLoading } = useProductsQuery();
  const [sharedProducts, setSharedProducts] = useState([]);

  useEffect(() => {
    if (!isLoading && idsParam && allProducts.length > 0) {
      const idsArray = idsParam.split(',').map(id => id.trim());
      const filtered = allProducts.filter(p => idsArray.includes(String(p.id)));
      setSharedProducts(filtered);
    }
  }, [idsParam, allProducts, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Container className="pt-8 pb-16 flex-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 text-center">
          ផលិតផលដែលបានជ្រើសរើស (Selected Products)
        </h1>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : sharedProducts.length > 0 ? (
          <ProductGrid products={sharedProducts} />
        ) : (
          <div className="text-center text-slate-500 py-20">
            រកមិនឃើញផលិតផលដែលបានចែករំលែកទេ
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
