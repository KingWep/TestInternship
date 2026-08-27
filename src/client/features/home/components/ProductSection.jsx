import { useState } from "react"
import FilterTabs from "../../../components/common/FilterTabs"
import SectionHeader from "../../../components/common/SectionHeader"
import ProductGrid from "../../products/components/ProductGrid"
import { useSearch } from "../../../../context/SearchContext"
import { useProductContext } from "../../../../context/ProductContext"
import { useCategoryContext } from "../../../../context/CategoryContext"

export default function ProductSection() {
  const { products } = useProductContext()
  const { categories } = useCategoryContext()
  const tabs = [
    "ទាំងអស់", ...categories.map(c => c.name)
  ];
  const [activeTab, setActiveTab] = useState("ទាំងអស់")
  const { searchItem, priceRange } = useSearch()

  const matchPriceRange = (price) => {
    if (priceRange === "under-20") return price < 20
    if (priceRange === "20-50") return price >= 20 && price <= 50
    if (priceRange === "50-100") return price > 50 && price <= 100
    if (priceRange === "over-100") return price > 100
    return true  //return all price
  }

  const filtered = products
    .filter((product) => {
      if (activeTab === "ទាំងអស់") return true
      const catName = product.categoryName || (categories.find(c => c.id === product.categoryId)?.name)
      return catName === activeTab
    })
    .filter((product) => product.name.toLowerCase().includes(searchItem.toLowerCase()))
    .filter((product) => matchPriceRange(product.price))
  return (
    <div className="space-y-8">
      {/* <SectionHeader title=" " /> */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 leading-khmer">
          ស្វែងរកទំនិញតាមប្រភេទ
        </h2>
        <FilterTabs
          tabs={tabs}
          onChange={setActiveTab} />
      </div>
      
      <div>
        <SectionHeader title=" ទំនិញពេញនិយម" />
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}