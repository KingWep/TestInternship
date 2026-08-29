const TELEGRAM_API = 'https://api.telegram.org'

const getTelegramConfig = () => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error(
      'Telegram configuration is missing. Check your .env file.'
    )
  }

  return { token, chatId }
}

// ── Shared send helper ─────────────────────────────────────────────────────
const sendMessage = async (text) => {
  const { token, chatId } = getTelegramConfig()

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    }
  )

  const data = await response.json()

  if (!response.ok || !data.ok) {
    throw new Error(data.description || 'Failed to send Telegram message')
  }

  return data
}

// ── Receipt message ────────────────────────────────────────────────────────
const buildOrderMessage = (order = {}) => {
  const rawItems = order.orderDetails || order.items || []
  const items = rawItems
    .map((item) => {
      const price = Number(item.price) || Number(item.salePrice) || 0
      const quantity = Number(item.quantity) || 1
      const total = price * quantity
      const name = item.product_name || item.name || 'ទំនិញ'
      return `• ${name} × ${quantity} — $${total.toFixed(2)}`
    })
    .join('\n')

  const orderNum = order.orderNo || order.orderNumber || order.id || 'N/A'
  const customerName = order.customerName || order.customerInfo?.name || 'អតិថិជនទូទៅ'
  const phone = order.customerPhone || order.phone || order.customerInfo?.phone || '—'
  const address = order.customerAddress || order.address || order.customerInfo?.address || '—'
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('km-KH')
    : `${order.date || ''} ${order.time || ''}`.trim() || '—'

  const delivery = Number(order.deliveryFee ?? order.delivery ?? 0)
  const total = Number(order.totalAmount ?? order.total ?? 0)
  const subtotal = Number(order.subtotal) || (total > delivery ? total - delivery : 0)

  return (
    `🧾 <b>វិក្កយបត្រ — ORD:${orderNum}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${customerName.trim()}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${phone.trim()}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${address.trim()}\n` +
    `📅 <b>កាលបរិច្ឆេទ:</b> ${dateStr}\n\n` +
    `------------------------\n` +
    `${items || '• គ្មានទំនិញ'}\n` +
    `------------------------\n\n` +
    `🔹 <b>Subtotal:</b> $${subtotal.toFixed(2)}\n` +
    `🚚 <b>Delivery:</b> $${delivery.toFixed(2)}\n` +
    `💰 <b>Total:</b> $${(total > 0 ? total : subtotal + delivery).toFixed(2)}`
  )
}

// ── Sticker message ────────────────────────────────────────────────────────
const buildStickerMessage = (order = {}, courier) => {
  const orderNum = order.orderNo || order.orderNumber || order.id || 'N/A'
  const customerName = order.customerName || order.customerInfo?.name || 'អតិថិជនទូទៅ'
  const phone = order.customerPhone || order.phone || order.customerInfo?.phone || '—'
  const address = order.customerAddress || order.address || order.customerInfo?.address || '—'
  const total = Number(order.totalAmount ?? order.total ?? 0)

  return (
    `📦 <b>ប័ណ្ណដឹកជញ្ជូន — ORD:${orderNum}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${customerName.trim()}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${phone.trim()}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${address.trim()}\n` +
    `💰 <b>សរុប:</b> $${total.toFixed(2)}` +
    (courier ? `\n🚚 <b>សេវាដឹក:</b> ${courier}` : '')
  )
}

// ── Exports ────────────────────────────────────────────────────────────────
export const sendOrderToTelegram = (order) =>
  sendMessage(buildOrderMessage(order))

export const sendStickerToTelegram = (order, courier) =>
  sendMessage(buildStickerMessage(order, courier))