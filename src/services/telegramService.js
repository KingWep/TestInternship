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
const buildOrderMessage = (order) => {
  const items = (order.items || [])
    .map((item) => {
      const price = Number(item.price) || Number(item.salePrice) || 0
      const quantity = Number(item.quantity) || 0
      const total = price * quantity
      return `• ${item.name} × ${quantity} — $${total.toFixed(2)}`
    })
    .join('\n')

  return (
    `🧾 <b>វិក្កយបត្រ — ORD:${order.orderNumber || order.id}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${order.customerName?.trim() || 'អតិថិជនទូទៅ'}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${order.phone?.trim() || '—'}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${order.address?.trim() || '—'}\n` +
    `📅 <b>កាលបរិច្ឆេទ:</b> ${order.date || '—'} ${order.time || ''}\n\n` +
    `------------------------\n` +
    `${items || '• គ្មានទំនិញ'}\n` +
    `------------------------\n\n` +
    `🔹 <b>Subtotal:</b> $${(Number(order.subtotal) || 0).toFixed(2)}\n` +
    `🚚 <b>Delivery:</b> $${(Number(order.delivery) || 0).toFixed(2)}\n` +
    `💰 <b>Total:</b> $${(Number(order.total) || 0).toFixed(2)}`
  )
}

// ── Sticker message ────────────────────────────────────────────────────────
const buildStickerMessage = (order, courier) => {
  return (
    `📦 <b>ប័ណ្ណដឹកជញ្ជូន — ORD:${order.orderNumber || order.id}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${order.customerName?.trim() || 'អតិថិជនទូទៅ'}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${order.phone?.trim() || '—'}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${order.address?.trim() || '—'}\n` +
    `💰 <b>សរុប:</b> $${(Number(order.total) || 0).toFixed(2)}` +
    (courier ? `\n🚚 <b>សេវាដឹក:</b> ${courier}` : '')
  )
}

// ── Exports ────────────────────────────────────────────────────────────────
export const sendOrderToTelegram = (order) =>
  sendMessage(buildOrderMessage(order))

export const sendStickerToTelegram = (order, courier) =>
  sendMessage(buildStickerMessage(order, courier))