const {init} = require('./bot');
const getChatInvites = require('./commands/getChatInvites');
const pool = require('./db');
const {Api} = require("telegram");
const {ChatMemberUpdated} = require('telegram/events');


async function processUsersWithFalseFirstConnect(client) {
    const {rows} = await pool.query('SELECT * FROM users'); //TODO сделать first_connect_to_channel = false и флаг обноления у каждой записи
    for (const record of rows) {
        const channelId = record.telegram_channel_id;
        const userFirebaseId = record.user_id;

        try {
            const result = await client.invoke(
                new Api.channels.GetAdminLog({
                    channel: channelId, //TODO сделать провеку на нескольких каналах. Так как если человек перейдет по пригласительнрой ссылке, то в следующий раз он уже не отобразится
                    q: '',
                    maxId: 0,
                    minId: 0,
                    limit: 100,
                    eventsFilter: new Api.ChannelAdminLogEventsFilter({
                        join: true,
                        leave: true,
                        invite: true
                    }),
                })
            );
            // console.log(JSON.stringify(result, null, 2));

            for (const resultElement of result.events) {
                if (resultElement?.action?.className === 'ChannelAdminLogEventActionParticipantJoinByInvite') {
                    const inviteLink = resultElement?.action?.invite?.link;
                    const inviteTitle = resultElement?.action?.invite?.title;
                    const userId = String(resultElement?.userId);
                    const date = resultElement?.date;
                    const adminId = BigInt(resultElement?.action?.invite?.adminId);
                    const username = await client.invoke(
                        new Api.users.GetFullUser({
                            id: userId,
                        })
                    );
                    // console.log(username?.users[0]?.username);

                    try {
                        // Проверяем, существует ли запись с таким inviteLink
                        const existingRecord = await pool.query(
                            'SELECT * FROM invitation_links WHERE link = $1',
                            [inviteLink]
                        );

                        if (existingRecord.rows.length > 0) {
                            // Запись существует, обновляем joined_followers
                            const currentFollowers = existingRecord.rows[0].joined_followers || [];
                            const currentUsrNames = existingRecord.rows[0].usernames || [];
                            // Проверяем, есть ли уже userId в currentFollowers и не найден ли твой же элемент в юзернеймах
                            if (!currentFollowers.includes(userId) && !currentUsrNames.includes(username?.users[0]?.username)) {
                                // Если нет, добавляем userId
                                currentFollowers.push(userId);

                                await pool.query(
                                    'UPDATE invitation_links SET joined_followers = $1 WHERE link = $2',
                                    [currentFollowers, inviteLink]
                                );
                            }
                        } else {
                            // Запись не существует, создаем новую
                            await pool.query(
                                'INSERT INTO invitation_links (link, user_id, admin_id, link_title, joined_followers, date, usernames) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                                [inviteLink, userFirebaseId, parseInt(adminId, 10), inviteTitle, [userId], date, [username?.users[0]?.username]]
                            );
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else if (resultElement?.action?.className === 'ChannelAdminLogEventActionParticipantLeave') {
                    const leaveDate = BigInt(resultElement?.date);
                    const leaveUserId = BigInt(resultElement?.userId);
                    const existingRecord = await pool.query(
                        'SELECT * FROM followers_leave WHERE user_id = $1',
                        [leaveUserId]
                    );

                    // console.log(existingRecord.rows.length);

                    if (existingRecord.rows.length === 0) {
                        await pool.query(
                            'INSERT INTO followers_leave (user_id, date_leave, channel_id) VALUES ($1, $2, $3)',
                            [leaveUserId, leaveDate, channelId]
                        );
                    }
                }
            }

        } catch (e) {
            //TODO сделать чтобы ошибка выводилась в бд и на фронте ее уже разбирать.
            console.log(JSON.stringify(e.errorMessage, null, 2));
        }
        // await pool.query(
        //     'UPDATE users SET first_connect_to_channel = $1 WHERE user_id = $2', // TODO сделать индексы для user_id в users
        //     [true, userFirebaseId]
        // );
    }
}

async function main() {
    const client = await init();

    setInterval(async () => {
        try {
            await processUsersWithFalseFirstConnect(client);
        } catch (error) {
            console.error('Ошибка при выполнении processUsersWithFalseFirstConnect:', error);
        }
    }, 10 * 1000);

}

main().catch(console.error);