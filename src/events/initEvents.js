const addToChannel = require('./addToChannel');
function initEvents(client) {
    addToChannel(client);
}

module.exports = initEvents;