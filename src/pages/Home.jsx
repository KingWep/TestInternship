import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Container from "../components/layout/Container"
import PromoBanner from "../components/home/PromoBanner"
import ProductSection from "../components/home/ProductSection"

export default function Home() {
  return (
    <div>
      <Header className="fixed top-0 left-0 w-full z-50" />
      <Container className="py-6 space-y-8 mt-20">
        <PromoBanner />
        <ProductSection />
      </Container>

      <Footer />
    </div>
  )
}