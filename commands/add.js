const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
module.exports = {
    name: "add",
    description: "Menambahkan user ke daftar white list",
    run: async (client, message, args) => {
const guildicon = message.guild.iconURL();
if(message.author.id === message.guild.ownerID) {
    
        let user = message.mentions.users.first()
        if(!user) {
            let usermention = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`
            **Mention User!** 
            `)
            .setFooter(message.guild.name, guildicon)
    
            return message.channel.send(usermention)
        }
        let trustedusers = db.get(`trustedusers_${message.guild.id}`)
        if(trustedusers && trustedusers.find(find => find.user == user.id)) {
        return message.channel.send(`Dia sudah ada di daftar Trusted`)
        }
let data = {
    user: user.id
}
        db.push(`trustedusers_${message.guild.id}`, data)
        let added = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`
        **Menambahkan ${user} Ke White list! Cihuy** 
        `)
        .setFooter(message.guild.name, guildicon)

        return message.channel.send(added);
    }
message.channel.send(`Cuman Ownership yang bisa setting !`)
}}
 
