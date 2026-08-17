export default function EmptyState({ message = "រកមិនឃើញផលិតផលទេ" }) {
  return (
    <div className="text-center py-16 text-slate-400">
      <p>{message}</p>
    </div>
  )
}