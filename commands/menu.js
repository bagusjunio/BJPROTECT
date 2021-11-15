const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
module.exports = {
    name: "menu",
    description: " Setting Menu anti raid",
    run: async (client, message, args) => {
    let cmd = args[0];
    const guildicon = message.guild.iconURL();
    if(message.author.id === message.guild.ownerID) {
    if(!cmd) {
        const embed = new Discord.MessageEmbed()
        .setColor('#6558ff')
        .setAuthor('Menu Setting...',message.author.displayAvatarURL())
        .setImage('https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif')
        .setDescription(`
        ● **bp.menu rclimit [limitnya]**
        ➞ Setting limit Membuat role.

        ● **bp.menu rdlimit [limitnya]**
        ➞ Setting limit Menghapus role.

        ● **bp.menu log [tag channel untuk log]**
        ➞ Setting Log channel untuk menginformasikan.

        ● **bp.menu cclimit [limitnya]**
        ➞ Setting limit Membuat channel.

        ● **bp.menu cdlimit [limitnya]**
        ➞ Setting limit Menghapus channel.

        ● **bp.menu banlimit [limitnya]**
        ➞ Setting limit Ban user.

        ● **bp.menu kicklimit [limitnya]**
        ➞ Setting limit Kick user.

        ● **bp.menu show**
        ➞ Menampilkan menu setting.
       ` )
 .setFooter('Originally made by : BJ PROTECT® 2021.', 'https://media.discordapp.net/attachments/899495198348951622/900191086989951046/BJ_PROTECThvg.jpg.jpg')
 .setTimestamp()
  return message.channel.send(embed);
}
 if(cmd.toLowerCase() === 'show') {
   let rolelimt = db.get(`rolecreatelimt_${message.guild.id}`) 
   if(rolelimt === null) rolelimt = "Disabled"
   let roledelete = db.get(`roledeletelimt_${message.guild.id}`) 
   if(roledelete === null) roledelete = "Disabled"
   let logschannel = db.get(`acitonslogs_${message.guild.id}`)
   let logschannel2 = db.get(`acitonslogs_${message.guild.id}`)
   if(logschannel === null) logschannel = "Disabled"
   else logschannel = `<#${logschannel2}>`
   let channelcreatelimts = db.get(`channelcreatelimts_${message.guild.id}`)
   if(channelcreatelimts === null) channelcreatelimts = "Disabled"
   let channeldeletelimts = db.get(`channeldeletelimts_${message.guild.id}`)
   if(channeldeletelimts === null) channeldeletelimts = "Disabled"
   let banlimts = db.get(`banlimts_${message.guild.id}`)
  if(banlimts === null) banlimts = "Disabled"
  let kicklimts = db.get(`kicklimts_${message.guild.id}`)
  if(kicklimts === null) kicklimts = "Disabled"

   let showembed = new Discord.MessageEmbed()

   .setImage('https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setColor('#00000f')
   .addField('Role Create Limit', rolelimt, false)
   .addField('Role Delete Limit', roledelete, false)
   .addField(`Log Channel`, logschannel, false)
   .addField(`Channel Create Limit`, channelcreatelimts, false)
   .addField(`Channel Delete Limit`, channeldeletelimts, false)
   .addField(`Ban Limit`, banlimts, false)
   .addField(`Kick Limit`, kicklimts, false)
    .setFooter('BJ PROTECT® 2021.', 'https://media.discordapp.net/attachments/899495198348951622/900191086989951046/BJ_PROTECThvg.jpg.jpg')
    return message.channel.send(showembed);
 }
 if(cmd.toLowerCase() === 'rclimit') {
let rolecreate = args.slice(1).join(" ");
if(!rolecreate) {
 let missing = new Discord.MessageEmbed()
 .setColor('#81f4de')
 .setAuthor(message.author.username, message.author.displayAvatarURL())
 .setDescription(`**Salah jing yang bener :**\nbp.menu rclimit (number)`)
 .setFooter(message.guild.name, guildicon)

  return message.channel.send(missing);
}
if(isNaN(rolecreate)) {
  let missing = new Discord.MessageEmbed()
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu rclimit (number)`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(missing);
}
db.set(`rolecreatelimt_${message.guild.id}`, rolecreate)
let done = new Discord.MessageEmbed() 
.setColor('#81f4de')
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`Selesai Rolecreate limit udah di set jadi ${rolecreate}`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done);
}
if(cmd.toLowerCase() === 'rdlimit') {
  let roledelete = args.slice(1).join(" ");
  if(!roledelete) {
   let missing = new Discord.MessageEmbed()
   .setColor('#81f4de')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`**Salah jing yang bener :**\nbp.menu rdlimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(roledelete)) {
    let missing = new Discord.MessageEmbed()
    .setColor('#81f4de')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu rdlimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`roledeletelimt_${message.guild.id}`, roledelete)
  let done = new Discord.MessageEmbed() 
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Selesai Roledelete limit udah di set jadi ${roledelete}`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
  
}
if(cmd.toLowerCase() === 'log') {
  let logs = message.mentions.channels.first();
  if(!logs) {
  let logsembed = new Discord.MessageEmbed()
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Tag channel yang bener`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(logsembed);
}
logs.send(`** Anti-Raid Log**`)
db.set(`acitonslogs_${message.guild.id}`, logs.id)
let done = new Discord.MessageEmbed()
.setColor('#81f4de')
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`Action logs sekarang sudah di set ke ${logs}`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done)
}
if(cmd.toLowerCase() === 'cclimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setColor('#81f4de')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`**Salah jing yang bener :**\nbp.menu cclimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setColor('#81f4de')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu cclimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channelcreatelimts_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Selesai Channelcreate limit udah di set jadi ${rolecreate}`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'cdlimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setColor('#81f4de')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`**Salah jing yang bener :**\nbp.menu cdlimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setColor('#81f4de')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu cdlimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channeldeletelimts_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Selesai Channeldelete limit udah di set jadi ${rolecreate}`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'banlimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setColor('#81f4de')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`**Salah jing yang bener :**\nbp.menu banlimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setColor('#81f4de')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu banlimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`banlimts_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Selesai ban limit udah di set jadi ${rolecreate}`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'kicklimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setColor('#81f4de')
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`**Salah jing yang bener :**\nbp.menu kicklimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setColor('#81f4de')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** Salah tot (Cuman bisa nomor)**\nbp.menu kicklimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`kicklimts_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setColor('#81f4de')
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Selesai kick limit udah di set jadi ${rolecreate}`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'clearuser') {
  let user = message.mentions.users.first()
if(!user) {
  return message.channel.send(`** Mention User **`);
}
db.delete(`executer_${message.guild.id}_${user.id}_kicklimts`) 
db.delete(`executer_${message.guild.id}_${user.id}_banlimts`)
db.delete(`executer_${message.guild.id}_${user.id}_rolecreate`)
db.delete(`executer_${message.guild.id}_${user.id}_roledelete`)
db.delete(`executer_${message.guild.id}_${user.id}_channelcreate`)
db.delete(`executer_${message.guild.id}_${user.id}_channeldelete`)
return message.channel.send(`Reseted User Limts`);
}
return message.channel.send(`Cuman ownership server yang bisa Setting !`)
}}}
 