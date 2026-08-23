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
    .filter((products) => activeTab === "ទាំងអស់" || products.category === activeTab)
    .filter((products) => products.name.toLowerCase().includes(searchItem.toLowerCase()))
    .filter((products) => matchPriceRange(products.price))
  return (
    <div className="space-y-8">
      <FilterTabs
        tabs={tabs}
        onChange={setActiveTab} />

      <div>
        <SectionHeader title=" ទំនិញពេញនិយម" />
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}