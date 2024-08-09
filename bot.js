const express = require('express');
const { Telegraf } = require('telegraf');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const botToken = '7319447606:AAFyixebZW0o8r4TVczJEnwRNFSU1PZm2LY'; // Замените на ваш токен
const channelUsername = 'mge_family'; // Замените на имя вашего канала

const bot = new Telegraf(botToken);

// Команда для получения количества подписчиков
bot.command('subscribers', async (ctx) => {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getChatMembersCount?chat_id=@${channelUsername}`);
        const data = await response.json();

        if (data.ok) {
            ctx.reply(`Количество подписчиков в канале: ${data.result}`);
        } else {
            ctx.reply('Ошибка при получении данных о канале.');
        }
    } catch (error) {
        ctx.reply('Произошла ошибка: ' + error.message);
    }
});

// Запускаем бота
bot.launch();

// Настройка веб-сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});