const { Client } = require('discord.js');
const mongoose = require('mongoose');
const guild = require('../guild');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    guild =new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('Gue join ke server baru !')
}
