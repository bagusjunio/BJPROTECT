const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = {
    name: "whitelist",
    description: "white list",
    run: async (client, message, args) => {
        let guild = message.guild.iconURL()
   
          let wordlist = new Discord.MessageEmbed()
           .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
           .setDescription("White List")
         .setFooter(message.author.username, message.author.displayAvatarURL)
         let database = db.get(`trustedusers_${message.guild.id}`)
         if(database && database.length) {
            let array =[]
              database.forEach(m => {
              array.push(`<@${m.user}>`)
            })
         
            wordlist.addField('** White list**', `${array.join("\n")}`)
        }
        return message.channel.send(wordlist);
}}
