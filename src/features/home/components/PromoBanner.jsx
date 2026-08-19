import { ArrowRight } from "lucide-react"
import Button from "../../../components/common/Button"

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
      <p className="mt-2 text-base text-white/80 max-w-md leading-khmer">{description}</p>
     <Button
        variant="white"
        className="
          mt-6
          flex items-center gap-2
          rounded-[100px]
          font-semibold
          animate-[bounce_4s_ease-in-out_infinite]
          transition-all
          duration-100
          hover:scale-105">
        {buttonText}
        <ArrowRight size={16} />
      </Button>
    </div>
  )
}