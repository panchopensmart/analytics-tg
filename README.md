### Описание структуры

- **/src**: Основная директория с исходным кодом бота.
    - **/commands**: Здесь будут находиться файлы с командами бота. Например,  start.js ,  help.js  и т.д. Каждый файл будет экспортировать функцию, которая обрабатывает соответствующую команду.
    - **/middlewares**: Промежуточные обработчики, которые могут использоваться для обработки сообщений, проверки прав пользователей и т.д.
    - **/models**: Модели данных, если вы используете базу данных. Например, модели пользователей, сообщений и т.д.
    - **/services**: Логика приложения, взаимодействие с базой данных, внешними API и т.д.
    - **/utils**: Вспомогательные функции, которые могут быть использованы в разных частях бота.
    - **/config**: Конфигурационные файлы, например, для подключения к базе данных или API.
    - **/events**: Обработчики событий, таких как  my_chat_member ,  callback_query , и т.д. Это позволяет разделить логику обработки событий.
    - **/api**: Взаимодействие с внешними API, если это необходимо.
    - **index.js**: Основной файл, который запускает бота и инициализирует его.
    - **bot.js**: Файл, где происходит инициализация бота и его настроек, таких как настройки вебхуков или опроса.

- **/tests**: Директория для тестов вашего бота. Вы можете использовать такие библиотеки, как  jest  или  mocha  для написания тестов.

- **.env**: Файл для хранения переменных окружения, таких как токен бота и другие конфиденциальные данные.

- **package.json**: Файл, в котором указаны зависимости вашего проекта и скрипты для его запуска.

- **README.md**: Документация проекта, где можно описать, как установить и запустить бота.
  const { Bot } = require('grammy');

// Замените на ваш токен Telegram бота
const bot = new Bot('7319447606:AAFyixebZW0o8r4TVczJEnwRNFSU1PZm2LY');

bot.command('start', (ctx) => ctx.reply('Добро пожаловать! Напишите мне сообщение, и я повторю его обратно.'));

// Ответ на любое текстовое сообщение
// bot.on('message:text', (ctx) => {
//     const userMessage = ctx.message.text;
//     ctx.reply(`Вы сказали: ${userMessage}`);
// });

// bot.on('my_chat_member', (ctx) => {
//     const chatMember = ctx.chatMember;
//     if (chatMember.new_chat_member.status === 'member' && chatMember.old_chat_member.status === "left") {
//         ctx.reply(`${chatMember.new_chat_member.user.first_name} присоединился к каналу!`);
//     }
// })

bot.command('get_invite_links', async (ctx) => {
try {
const chat = await ctx.getChat(); // Получаем информацию о канале
const inviteLinks = chat.invite_link; // Получаем пригласительные ссылки
console.log(chat);

        if (inviteLinks) {
            ctx.reply(`Пригласительная ссылка: ${inviteLinks}`);
        } else {
            ctx.reply('Пригласительных ссылок нет.');
        }
    } catch (error) {
        console.error('Ошибка при получении пригласительных ссылок:', error);
        ctx.reply('Произошла ошибка при получении пригласительных ссылок.');
    }
});

bot.command('export_channel_info', async (ctx) => {
try {
const chat = await ctx.chat; // Получаем информацию о канале
// const admins = await ctx.getChatAdministrators(); // Получаем список администраторов
// const membersCount = await ctx.getChatMembersCount(); // Получаем количество участников
// const members = await ctx.getChatMember();
//
// // Формируем сообщение с информацией о канале
// let channelInfo = `
// Название: ${chat.title}
// Описание: ${chat.description || 'Нет описания'}
// Тип: ${chat.type}
// ID: ${chat.id}
// Количество участников: ${membersCount}
// Администраторы: ${admins.map(admin => admin.user.username || admin.user.first_name).join(', ') || 'Нет администраторов'}
// `;

        console.log(chat);
        // console.log(members);
        //
        // ctx.reply(channelInfo);
    } catch (error) {
        console.error('Ошибка при получении информации о канале:', error);
        await ctx.reply('Произошла ошибка при получении информации о канале.');
    }
});

// Запуск бота
bot.start();
console.log('Бот запущен...');