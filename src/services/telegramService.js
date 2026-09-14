
import { settingService } from './settingService'

const TELEGRAM_API = 'https://api.telegram.org'

const getTelegramToken = () => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN

  if (!token) {
    throw new Error(
      'Telegram bot token is missing. Check your .env file.'
    )
  }

  return token
}

const sendMessage = async (text, chatId) => {
  if (!chatId) {
    throw new Error('Telegram chat ID is missing for this shop.')
  }

  const token = getTelegramToken()

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    }
  )

  const data = await response.json()

  if (!response.ok || !data.ok) {
    throw new Error(
      data.description || 'Failed to send Telegram message'
    )
  }

  return data
}

const getCourierName = (order = {}, courier) => {
  if (courier) {
    if (typeof courier === 'string') {
      return courier
    }

    return (
      courier.name ||
      courier.title ||
      courier.providerName ||
      courier.provider_name ||
      courier.deliveryName ||
      courier.delivery_name ||
      ''
    )
  }

  return (
    order.courier ||
    order.courierName ||
    order.courier_name ||
    order.deliveryProviderName ||
    order.delivery_provider_name ||
    order.deliveryServiceName ||
    order.delivery_service_name ||
    order.deliveryProvider?.name ||
    order.deliveryProvider?.title ||
    order.deliveryProvider?.providerName ||
    order.deliveryProvider?.provider_name ||
    order.deliveryProvider?.deliveryName ||
    order.deliveryProvider?.delivery_name ||
    order.provider?.name ||
    order.provider?.title ||
    order.providerName ||
    order.provider_name ||
    ''
  )
}

const buildOrderMessage = (order = {}, courier) => {
  const rawItems =
    order.orderDetails ||
    order.items ||
    []

  const items = rawItems
    .map((item) => {
      const price =
        Number(item.price) ||
        Number(item.salePrice) ||
        Number(item.sale_price) ||
        0

      const quantity =
        Number(item.quantity) || 1

      const total = price * quantity

      const name =
        item.product_name ||
        item.productName ||
        item.name ||
        item.product?.name ||
        'ទំនិញ'

      return `• ${name} × ${quantity} — $${total.toFixed(2)}`
    })
    .join('\n')

  const orderNum =
    order.orderNo ||
    order.orderNumber ||
    order.order_no ||
    order.order_number ||
    order.id ||
    'N/A'

  const customerName =
    order.customerName ||
    order.customer_name ||
    order.customerInfo?.name ||
    'អតិថិជនទូទៅ'

  const phone =
    order.customerPhone ||
    order.customer_phone ||
    order.phone ||
    order.customerInfo?.phone ||
    '—'

  const address =
    order.customerAddress ||
    order.customer_address ||
    order.address ||
    order.customerInfo?.address ||
    '—'

  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('km-KH')
    : `${order.date || ''} ${order.time || ''}`.trim() ||
      '—'

  const delivery = Number(
    order.deliveryFee ??
      order.delivery_fee ??
      order.delivery ??
      0
  )

  const total = Number(
    order.totalAmount ??
      order.total_amount ??
      order.total ??
      0
  )

  const subtotal =
    Number(order.subtotal) ||
    Number(order.sub_total) ||
    (total > delivery
      ? total - delivery
      : 0)

  const courierName = getCourierName(
    order,
    courier
  )

  return (
    `🧾 <b>វិក្កយបត្រ: ${orderNum}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${customerName.trim()}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${phone.trim()}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${address.trim()}\n` +
    `📅 <b>កាលបរិច្ឆេទ:</b> ${dateStr}\n` +
    (courierName
      ? `🚚 <b>សេវាដឹក:</b> ${courierName}\n`
      : '') +
    `\n` +
    `------------------------\n` +
    `${items || '• គ្មានទំនិញ'}\n` +
    `------------------------\n\n` +
    `🔹 <b>Subtotal:</b> $${subtotal.toFixed(2)}\n` +
    `🚚 <b>Delivery:</b> $${delivery.toFixed(2)}\n` +
    `💰 <b>Total:</b> $${(
      total > 0
        ? total
        : subtotal + delivery
    ).toFixed(2)}`
  )
}

const buildStickerMessage = (
  order = {},
  courier
) => {
  const orderNum =
    order.orderNo ||
    order.orderNumber ||
    order.order_no ||
    order.order_number ||
    order.id ||
    'N/A'

  const customerName =
    order.customerName ||
    order.customer_name ||
    order.customerInfo?.name ||
    'អតិថិជនទូទៅ'

  const phone =
    order.customerPhone ||
    order.customer_phone ||
    order.phone ||
    order.customerInfo?.phone ||
    '—'

  const address =
    order.customerAddress ||
    order.customer_address ||
    order.address ||
    order.customerInfo?.address ||
    '—'

  const total = Number(
    order.totalAmount ??
      order.total_amount ??
      order.total ??
      0
  )

  const courierName = getCourierName(
    order,
    courier
  )

  return (
    `📦 <b>ប័ណ្ណដឹកជញ្ជូន: ${orderNum}</b>\n\n` +
    `👤 <b>អតិថិជន:</b> ${customerName.trim()}\n` +
    `📲 <b>លេខទូរស័ព្ទ:</b> ${phone.trim()}\n` +
    `📍 <b>អាសយដ្ឋាន:</b> ${address.trim()}\n` +
    `💰 <b>សរុប:</b> $${total.toFixed(2)}` +
    (courierName
      ? `\n🚚 <b>សេវាដឹក:</b> ${courierName}`
      : '')
  )
}

const resolveChatId = async (order) => {
  const settingId =
    order.settingId ||
    order.setting_id

  if (!settingId) {
    throw new Error(
      'Order settingId is missing. Cannot determine target Telegram chat.'
    )
  }

  const settingData =
    await settingService.getSettingById(settingId)

  const rawData =
    settingData?.data ||
    settingData ||
    []

  const settings = Array.isArray(rawData)
    ? rawData[0] || {}
    : rawData

  if (!settings.chat_id) {
    throw new Error(
      'Target shop does not have a Telegram chat ID configured.'
    )
  }

  return settings.chat_id
}

export const sendOrderToTelegram = async (
  order,
  courier
) => {
  const chatId =
    await resolveChatId(order)

  return sendMessage(
    buildOrderMessage(order, courier),
    chatId
  )
}

export const sendStickerToTelegram = async (
  order,
  courier
) => {
  const chatId =
    await resolveChatId(order)

  return sendMessage(
    buildStickerMessage(order, courier),
    chatId
  )
}
