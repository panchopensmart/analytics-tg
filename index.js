const { Bot } = require('grammy');

// Замените на ваш токен Telegram бота
const bot = new Bot('7319447606:AAFyixebZW0o8r4TVczJEnwRNFSU1PZm2LY');

// Ответ на команду /start
bot.command('start', (ctx) => ctx.reply('Добро пожаловать! Напишите мне сообщение, и я повторю его обратно.'));

// Ответ на любое текстовое сообщение
bot.on('message:text', (ctx) => {
    const userMessage = ctx.message.text;
    ctx.reply(`Вы сказали: ${userMessage}`);
});

// Запуск бота
bot.start();
console.log('Бот запущен...');