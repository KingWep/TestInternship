export default function CheckoutButton({ onClick, total }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-red-900 hover:bg-red-800 text-white font-semibold py-3 rounded-full transition-colors"
    >
      បញ្ជាទិញ — ${total.toFixed(2)}
    </button>
  )
}
