const mongoose = require('mongoose')

const guildschema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   guildID: String,
   guildName: String
});

module.exports = mongoose.model('Guild', guildschema, 'guilds');
