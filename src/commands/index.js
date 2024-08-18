const startCommand = require('./start');
const exportChannelsInfo = require('./exportChannelsInfo');

function registerCommands(bot) {
    startCommand(bot);
    exportChannelsInfo(bot);
}

module.exports = registerCommands;