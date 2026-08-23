import Header from "../../../components/layout/Header"
import Footer from "../../../components/layout/Footer"
import Container from "../../../components/layout/Container"
import PromoBanner from "../components/PromoBanner"
import ProductSection from "../components/ProductSection"
import CartDrawer from "../../cart/components/CartDrawer"
import { useSearch } from "../../../../context/SearchContext"
import ScrollToTopButton from "../../../components/common/ScrollToTopButton"

export default function Home() {
  const { searchItem, priceRange } = useSearch()
  const isFiltering = searchItem.trim() !== "" || priceRange !== "all"

  return (
    <div>
      <Header className="fixed top-0 left-0 w-full z-50" />
      <Container className="py-6 space-y-8 mt-28 md:mt-20">
        {!isFiltering && <PromoBanner />}
        <ProductSection />
      </Container>
      <CartDrawer />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}