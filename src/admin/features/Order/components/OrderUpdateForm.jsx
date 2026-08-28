import React, { useState, useEffect, useRef } from "react";
import { Save, Plus, Trash2, Search, ChevronDown } from "lucide-react";
import { useProductContext } from "../../../../context/ProductContext";

function SearchableProductSelect({ value, onChange, products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Find the selected product's name
  const selectedProduct = products.find(
    (p) => p.id === value && p.stockQuantity > 0,
  );
  const displayValue = selectedProduct ? selectedProduct.name : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.stockQuantity > 0 &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-400 shadow-sm transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={displayValue ? "text-slate-800" : "text-slate-400"}>
          {displayValue || "-- ជ្រើសរើសទំនិញ --"}
        </span>
        <ChevronDown size={16} className="text-slate-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 flex flex-col">
          <div className="p-2 border-b border-slate-100 sticky top-0 bg-white">
            <div className="relative">
              <Search
                size={12}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                autoFocus
                placeholder="ស្វែងរក..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-6 pr-2 py-1 text-xs border border-slate-200 rounded outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onChange(p.id);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`px-2 py-1.5 text-xs cursor-pointer hover:bg-blue-50 ${value === p.id ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-700"}`}
                >
                  {p.name}
                </div>
              ))
            ) : (
              <div className="px-2 py-3 text-xs text-center text-slate-500">
                រកមិនឃើញទំនិញទេ
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderUpdateForm({
  onSubmit,
  initialData,
  onCancel,
  isSubmitting,
}) {
  const { products } = useProductContext();
  const [formData, setFormData] = useState({
    status: "Pending",
    paymentStatus: "Unpaid",
    customerPhone: "",
    customerAddress: "",
    deliveryFee: 0,
    items: [],
  });

  useEffect(() => {
    if (initialData) {
      const initialItems = initialData.orderDetails || initialData.items || [];

      setFormData({
        status: initialData.status || "Pending",
        paymentStatus: initialData.paymentStatus || "Unpaid",
        customerPhone: initialData.customerPhone || initialData.phone || "",
        customerAddress:
          initialData.customerAddress || initialData.address || "",
        deliveryFee: Number(
          initialData.deliveryFee || initialData.delivery || 0,
        ),
        items: initialItems.map((item) => ({
          productId: Number(item.product_id || item.productId || item.id),
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
        })),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "deliveryFee" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: 1, price: 0 }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const newItems = [...prev.items];

      if (field === "productId") {
        const productId = Number(value);
        const selectedProduct = products.find((p) => p.id === productId);

        newItems[index] = {
          ...newItems[index],
          productId: productId,
          price: selectedProduct ? Number(selectedProduct.salePrice) : 0,
        };
      } else if (field === "quantity") {
        newItems[index] = {
          ...newItems[index],
          quantity: Number(value),
        };
      }

      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
      {/* ផ្នែកព័ត៌មានទូទៅ */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
          ព័ត៌មានការបញ្ជាទិញ (Order Info)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600">
              ស្ថានភាព (Status) <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            >
              <option value="Pending">Pending (រង់ចាំ)</option>
              <option value="Pickup">Pickup (បានយកទំនិញ)</option>
              <option value="Delivering">Delivering (កំពុងដឹក)</option>
              <option value="Completed">Completed (បានបញ្ចប់)</option>
              <option value="Cancelled">Cancelled (បានបោះបង់)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600">
              ការទូទាត់ (Payment) <span className="text-red-500">*</span>
            </label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            >
              <option value="Paid">Paid (បានបង់)</option>
              <option value="Unpaid">Unpaid (មិនទាន់បង់)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ផ្នែកព័ត៌មានអតិថិជន និងការដឹកជញ្ជូន */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
          ព័ត៌មានអតិថិជន និងការដឹកជញ្ជូន
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600">
              លេខទូរស័ព្ទ (Phone) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600">
              សេវាដឹកជញ្ជូន (Delivery Fee){" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                name="deliveryFee"
                value={formData.deliveryFee}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full pl-8 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600">
              អាសយដ្ឋាន (Address) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              required
              rows="2"
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* ផ្នែកទំនិញ (Items) ដែលបានរចនាថ្មី */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-800">
            ទំនិញ (Items) <span className="text-red-500">*</span>
          </h3>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            សរុប: {formData.items.length} មុខ
          </span>
        </div>

        {formData.items.length === 0 && (
          <div className="text-center py-6 bg-red-50/50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-500 font-medium">
              សូមបញ្ចូលទំនិញយ៉ាងហោចណាស់មួយ។
            </p>
          </div>
        )}

        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              {/* Product Select */}
              <div className="flex-1">
                <SearchableProductSelect
                  value={item.productId}
                  onChange={(productId) =>
                    handleItemChange(index, "productId", productId)
                  }
                  products={products}
                />
              </div>

              {/* Quantity, Price, and Delete Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border border-slate-200 bg-white rounded-lg shadow-sm h-[38px]">
                  <button
                    type="button"
                    onClick={() =>
                      handleItemChange(
                        index,
                        "quantity",
                        Math.max(1, item.quantity - 1),
                      )
                    }
                    className="w-9 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Math.max(1, Number(e.target.value)),
                      )
                    }
                    min="1"
                    required
                    className="w-12 text-center text-sm font-medium outline-none bg-transparent h-full border-x border-slate-200 appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const product = products.find(
                        (p) => p.id === item.productId,
                      );

                      if (!product) return;

                      handleItemChange(
                        index,
                        "quantity",
                        Math.min(item.quantity + 1, product.stockQuantity),
                      );
                    }}
                    className="w-9 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                {/* Price Display */}
                <div className="min-w-[80px] h-[38px] flex items-center justify-center px-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm">
                  ${Number(item.price ?? 0).toFixed(2)}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="w-[38px] h-[38px] flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
                  title="លុបទំនិញ"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-blue-600 border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
        >
          <Plus size={16} /> បន្ថែមទំនិញ (Add Product)
        </button>
      </div>

      {/* ប៊ូតុងបញ្ជាក់ */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 border border-slate-200 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50"
        >
          បោះបង់ (Cancel)
        </button>
        <button
          type="submit"
          disabled={isSubmitting || formData.items.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-50"
        >
          <Save size={18} />
          {isSubmitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក (Update Order)"}
        </button>
      </div>
    </form>
  );
}
