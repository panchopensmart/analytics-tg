module.exports = (bot) => {
    bot.command('start', (ctx) => {
        ctx.reply('Добро пожаловать в бота!');
    });
};