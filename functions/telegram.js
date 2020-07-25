const functions = require('firebase-functions');
const Slimbot = require('slimbot');

const telegramConfig = functions.config().telegram;
const CHAT_ID = telegramConfig.chat_id;
const BOT_API_KEY = telegramConfig.bot_api_key;

const bot = new Slimbot(BOT_API_KEY);

const sendMessage = async (apartment) => {
    const extraParams = {
        caption: `[${apartment['address']}](${apartment['url']})\nLocation: ${apartment['locations_string']}\nPrice: *${apartment['price']}*\nAvgift: *${apartment['fee']}*`,
        parse_mode: 'MarkdownV2',
    };
    await bot.sendPhoto(CHAT_ID, apartment['medium_image_url'], extraParams);
}

const sendUpdatedStatus = async (status) => {
    let message;
    if (status === 'success') {
        message = 'Fetching restored to successful state! 🙂💪';
    } else if (status === 'error') {
        message = 'Fetching started failing! 🔥🔥🔥';
    } else {
        message = `Unknown status: ${status}`;
    }
    await bot.sendMessage(CHAT_ID, message);
}

module.exports = {
    sendMessage,
    sendUpdatedStatus
}