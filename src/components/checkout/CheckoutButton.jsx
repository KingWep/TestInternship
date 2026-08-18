export default function CheckoutButton({
  onClick,
  total,
  loading = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full bg-red-900 text-white font-semibold py-4 rounded-full hover:bg-red-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        "កំពុងបញ្ជាទិញ..."
      ) : (
        <>
          បញ្ជាទិញ
          <span className="ml-2">
            ${total.toFixed(2)}
          </span>
        </>
      )}
    </button>
  )
}