import { FaBoxOpen } from "react-icons/fa";
export default function EmptyState({ message = "រកមិនឃើញផលិតផលទេ" }) {
  return (
    <div className="text-center py-16 flex flex-col justify-center items-center text-slate-400">
      <FaBoxOpen className="w-20 h-20 md:w-40 md:h-40 text-slate-400"/>
      <p>{message}</p>
    </div>
  )
}