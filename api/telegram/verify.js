export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const { group } = req.body

    if (!group) {
      return res.status(400).json({
        success: false,
        message: 'Telegram group is required',
      })
    }

    const token =
      process.env.TELEGRAM_BOT_TOKEN

    if (!token) {
      return res.status(500).json({
        success: false,
        message:
          'Telegram bot token is not configured',
      })
    }

    const telegramResponse =
      await fetch(
        `https://api.telegram.org/bot${token}/getChat?chat_id=${encodeURIComponent(group)}`
      )

    const telegramData =
      await telegramResponse.json()

    if (!telegramData.ok) {
      return res.status(400).json({
        success: false,
        message:
          telegramData.description ||
          'Telegram group could not be verified',
      })
    }

    const chat =
      telegramData.result

    return res.status(200).json({
      success: true,
      data: {
        chat_id: String(chat.id),
        title: chat.title || null,
        username:
          chat.username || null,
        type: chat.type,
      },
      message:
        'Telegram group verified successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Failed to verify Telegram group',
    })
  }
}