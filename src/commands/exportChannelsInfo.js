module.exports = (bot) => {
    const channelIds = new Set();
    //TODO Вынести триггеры в отдельное место, тут должны оставаться только команды
    bot.on('my_chat_member', async (ctx) => {
        console.log('its member trigger');
        console.log(ctx);
    });

}