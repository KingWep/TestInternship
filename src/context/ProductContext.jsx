import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import { productService } from "../services/productService";
import { useCategoryContext } from "./CategoryContext";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { categories } = useCategoryContext() || { categories: [] };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapProduct = (item) => {
    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

    const formatImageUrl = (path) => {
      if (!path) return "";
      return path.startsWith("http") ? path : `${baseUrl}${path}`;
    };

    const mappedImages = Array.isArray(item.images)
      ? item.images.map(formatImageUrl)
      : [];

    // Preserve raw image objects (with IDs) so ProductForm can track which
    // image was removed and build the correct replacement mapping.
    const rawImages = Array.isArray(item.images) ? item.images : [];

    return {
      id: item.id,
      name: item.name || "",
      price: Number(item.price || 0),
      discountPrice: Number(item.discountPrice || 0),
      salePrice: Number(item.salePrice || 0),
      sku: item.sku || "",
      stockQuantity: item.stockQuantity ?? item.stock ?? 0,
      stock: item.stockQuantity ?? item.stock ?? 0,
      images: mappedImages,
      rawImages,
      image: mappedImages[0] || "",
      description: item.description || "",
      categoryId: item.categoryId || item.category_id,
      categoryName: item.categoryName || "",
      createdAt: item.createdAt,
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await productService.getProducts();
      const rawProducts = data?.data || data || [];

      setProducts(rawProducts.map(mapProduct));
    } catch (err) {
      setError(err);
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // mapping of products to include category names 
  const productsWithCategory = useMemo(() => {
    return products.map((product) => {
      const matchedCategory = categories?.find(
        (cat) => String(cat.id) === String(product.categoryId)
      );

      // Warning log to help debug missing category matches
      if (!matchedCategory && !product.categoryName) {
        console.warn(
          `Missing category match for product: [${product.name}]`,
          `\nTarget ID:`, product.categoryId,
          `\nAvailable IDs:`, categories?.map(c => c.id)
        );
      }

      return {
        ...product,
        // Prefer API-provided name, fallback to dynamically matched local category name
        categoryName: product.categoryName || matchedCategory?.name || "",
      };
    });
  }, [products, categories]); 

  // Filter based on the fully mapped products
  const lowStockProducts = productsWithCategory.filter(
    (product) => product.stockQuantity < 10
  );

  const addProduct = async (product) => {
    try {
      const newProduct = await productService.createProduct(product);
      const rawProduct = newProduct?.data || newProduct;

      setProducts((prev) => [mapProduct(rawProduct), ...prev]);
    } catch (err) {
      console.error("Failed to add product", err);
      throw err;
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      // Extract ID depending on whether payload is FormData or a standard Object
      const id = updatedProduct instanceof FormData
          ? Number(updatedProduct.get('id'))
          : updatedProduct.id;

      const result = await productService.updateProduct(id, updatedProduct);
      const rawResult = result?.data || result;

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? mapProduct(rawResult) : p))
      );
    } catch (err) {
      console.error('Failed to update product', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: productsWithCategory, 
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        lowStockProducts,
        loading,
        error,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }

  return context;
}