const startCommand = require('./start');
const exportChannelsInfo = require('./exportChannelsInfo');
const getChatInvites = require('./getChatInvites');

function registerCommands(client, channelId) {
    startCommand(client);
    exportChannelsInfo(client);
    getChatInvites(client).then(r => lo);
}

module.exports = registerCommands;