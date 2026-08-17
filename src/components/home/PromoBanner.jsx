import { ArrowRight } from "lucide-react"
import Button from "../common/Button"

export default function PromoBanner({
  tag = "Limited Offer",
  title = "HOT SALE! 25% OFF",
  description = "បញ្ចុះតម្លៃពិសេសលើផលិតផលសម្រស់អាគ្រប់ប្រភេទ!",
  buttonText = "ទិញឥឡូវនេះ",
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-900 to-red-800 text-white rounded-2xl p-8 md:p-10">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full" />
      <span className="inline-block bg-white/15 text-xs font-medium px-3 py-1 rounded-full mb-4">
        {tag}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-white/80 max-w-md">{description}</p>
      <Button variant="white" className="mt-6 flex items-center gap-2 text-red-900 bg-white rounded-2xl">
        {buttonText}
        <ArrowRight size={16} />
      </Button>
    </div>
  )
}