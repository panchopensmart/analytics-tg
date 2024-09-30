const channelId = '@sendlify_marketing'; // Ваш канал
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require('input');
const fs = require('fs');

const session = new StringSession(''); // leave this empty for now
const apiId = 27696885;
const apiHash = 'caeb9fdba70b5c3909ecddf3e0aeee64';
const sessionFile = 'session.json';

async function init() {
    let session;

    if (fs.existsSync(sessionFile)) {
        const sessionDate = JSON.parse(fs.readFileSync(sessionFile));
        session = new StringSession(sessionDate.session);
    } else {
        session = new StringSession('')
    }

    const client = new TelegramClient(
        session,
        apiId,
        apiHash,
        { connectionRetries: 5 }
    );

    console.log('Connecting to Telegram...');

    await client.start({
        phoneNumber: async () => await input.text('Введите номер телефона: '),
        password: async () => await input.text('Введите пароль: '),
        phoneCode: async () => await input.text('Введите код: '),
        onError: (err) => console.log(err),
    });

    console.log('You are now connected.');

    fs.writeFileSync(sessionFile, JSON.stringify({ session: client.session.save() }));

    return client;
}

module.exports = {init};