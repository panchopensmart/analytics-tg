const {Api} = require("telegram");
module.exports = async (client, channelId) => {

    // //Отображает информацию по пригласительной ссылке
    // return await client.invoke(
    //     new Api.messages.GetChatInviteImporters({
    //     peer: channelId,
    //     offsetUser: 937308202, // Установите 0 или нужного пользователя
    //     link: 'https://t.me/+b__zvtI3JAdkZjA6',
    // })
    // )

    // Выводит все пригласительные ссылки и кто их создал
    return await client.invoke(
        new Api.messages.GetExportedChatInvites({
            peer: channelId,
            adminId: 937308202,
            limit: 100,
            revoked: false,
            offsetDate: 0,
            offsetLink: "",
        })
    )
}