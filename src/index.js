require('dotenv').config();
const { Bot } = require('grammy');
const bot = new Bot('7319447606:AAFyixebZW0o8r4TVczJEnwRNFSU1PZm2LY'); //TODO Сделать чтобы токен подтягивался с process.env.BOT_TOKEN
const registerCommands = require('./commands');
// const { registerMiddlewares } = require('./middlewares');
// const { registerEvents } = require('./events');

// registerMiddlewares(bot);
registerCommands(bot);
// registerEvents(bot);

bot.start();
console.log('Бот запущен...')