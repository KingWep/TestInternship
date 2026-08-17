import { useState } from "react"
import FilterTabs from "../common/FilterTabs"
import SectionHeader from "../common/SectionHeader"
import ProductGrid from "../products/ProductGrid"
import { products } from "../../data/Products"
import { useSearch } from "../../context/SearchContext"

export default function ProductSection() {
 const tabs = [
  "ទាំងអស់",...new Set(products.map((product) => product.category)),
  ];
  const [activeTab, setActiveTab] = useState("ទាំងអស់")
  const {searchItem, priceRange} = useSearch()

  const matchPriceRange = (price) => {
    if (priceRange === "under-20") return price < 20
    if (priceRange === "20-50") return price >= 20 && price <= 50
    if (priceRange === "50-100") return price > 50 && price <= 100
    if (priceRange === "over-100") return price > 100
    return true  //return all price
  } 

  const filtered = products
    .filter((products)=> activeTab === "ទាំងអស់" || products.category === activeTab)
    .filter((products)=> products.name.toLowerCase().includes(searchItem.toLowerCase()))
    .filter((products)=> matchPriceRange(products.price))
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