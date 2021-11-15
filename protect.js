console.log("\nLoading...")
console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { join } = require('path');
const { readdirSync } = require('fs');
const activities_list = [
    "ECLIPSE SUPPORT", 
    "by Bagus Junio",
    "87 Server", 
    "Anti Hack System",
    "608.419 User",
    "ECLIPSE SUPPORT"
    ];
client.commands= new Discord.Collection();
client.mongoose = require('./utils/mongoose');

client.mongoose.init();
client.login(token)

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
        client.user.setActivity(activities_list[index], { type: 'WATCHING' }); 
    }, 3000); 

  console.log('\x1b[31m%s\x1b[0m', `            MADE BY : BAGUS JUNIO `);  

 });

 const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           
      let premiumcheck = db.get(`blacklisted`)

      if(premiumcheck && premiumcheck.find(find => find.kid == message.author.id)) return message.channel.send(`you cant use the bot your blacklisted!!`);
 
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
   
           } catch (error){
               console.error(error);
           }
        }
   })
  
     
   client.on("roleCreate", async role => {
    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${role.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('User ini ada di whitelist');
    } 
  let author = db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`)
  let limts = db.get(`rolecreatelimt_${role.guild.id}`)
if(limts === null) {
    return console.log('Fuck');
}
let logs = db.get(`acitonslogs_${role.guild.id}`)

    if(author > limts) {
db.delete(`executer_${role.guild.id}_${entry.id}`)
 console.log('Mencoba ban user..')
 role.guild.members.ban(entry.id)
 let logsembed = new Discord.MessageEmbed()
 .setTitle(`${entry.tag} Mo ngeraid tapi gagal gblk ! mending gua ban`)
 .setColor("#ff4949")
 .setFooter("BJ PROTECT® 2021.")
 .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
return client.channels.cache.get(logs).send(logsembed);

}
       db.add(`executer_${role.guild.id}_${role.guild.id}_rolecreate`, 1)
       let warn = db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} Membuat role`)
       .setDescription(`User ini membuat role [${warn || 0}/${author || 0}]`)
       .setColor("#ff4949")
       .setFooter("BJ PROTECT® 2021.")
       .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
       client.channels.cache.get(logs).send(logsembed)

});

client.on("roleDelete", async role => {
    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
  let author = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
  let limts = db.get(`roledeletelimt_${role.guild.id}`)
if(limts === null) {
    return console.log('shit');
}
let trustedusers = db.get(`trustedusers_${role.guild.id}`)
if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
return console.log('Its Trusted User');
}
let logs = db.get(`actionslogs_${role.guild.id}`)
    if(author > limts) {
db.delete(`executer_${role.guild.id}_${entry.id}`)
 console.log('Mencoba ban user..')
 role.guild.members.ban(entry.id)
 let logsembed = new Discord.MessageEmbed()
 .setTitle(`${entry.tag} mo ngeraid ni orang ! Mending gua ban anjg`)
 .setColor("#ff4949")
 .setFooter("BJ PROTECT® 2021.")
 .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
return client.channels.cache.get(logs).send(logsembed);
       }
       db.add(`executer_${role.guild.id}_${entry.id}_roledelete`, 1)
       let warn = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} Menghapus role..`)
       .setDescription(`User ini menghapus role [${warn || 0}/${author || 0}]`)
       .setColor("#ff4949")
       .setFooter("BJ PROTECT® 2021.")
       .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
       client.channels.cache.get(logs).send(logsembed)
});        

client.on("channelCreate", async channel => {
    const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
  let author = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
  let limts = db.get(`channelcreatelimts_${channel.guild.id}`)
if(limts === null) {
    return console.log('shit');
}
let logs = db.get(`acitonslogs_${channel.guild.id}`)
    if(author > limts) {
db.delete(`executer_${channel.guild.id}_${entry.id}`)
 console.log('Gua ban juga nih..')
 channel.guild.members.ban(entry.id)  
 let logsembed = new Discord.MessageEmbed()
 .setTitle(`${entry.tag} Mau ngeraid tapi bego ! Gua ban ae lah kntl.`)
 .setColor("#ff4949")
 .setFooter("BJ PROTECT® 2021.")
 .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")

return client.channels.cache.get(logs).send(logsembed);
       }
       db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1)
       let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} Membuat channel..`)
       .setDescription(`"User ini membuat channel [${warn || 0}/${author || 0}]`)
       .setColor("#ff4949")
       .setFooter("BJ PROTECT® 2021.")
       .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
       client.channels.cache.get(logs).send(logsembed)
});        

client.on("channelDelete", async channel => {
     const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
  let author = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
  let limts = db.get(`channeldeletelimts_${channel.guild.id}`)
if(limts === null) {
    return console.log('shit');
}
let logs = db.get(`acitonslogs_${channel.guild.id}`)
    if(author > limts) {
db.delete(`executer_${channel.guild.id}_${entry.id}`)
 console.log('Mencoba ban user..')
 channel.guild.members.ban(entry.id)  
 let logsembed = new Discord.MessageEmbed()
 .setTitle(`${entry.tag} Pen ngeraid tapi tolol ! Mending gua ban.`)
 .setColor("#ff4949")
 .setFooter("BJ PROTECT® 2021.")
 .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
return client.channels.cache.get(logs).send(logsembed);
       }
       db.add(`executer_${channel.guild.id}_${entry.id}_channeldelete`, 1)
       let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
       let logsembed = new Discord.MessageEmbed()

       .setTitle(`${entry.tag} Menghapus Channel..`)
       .setDescription(`User ini menghapus Channel [${warn || 0}/${author || 0}]`)
       .setColor("#ff4949")
       .setFooter("BJ PROTECT® 2021.")
       .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
       
       client.channels.cache.get(logs).send(logsembed)
});    
client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
        })
        .then(audit => audit.entries.first());
        const entry = entry2.executor;
        let trustedusers = db.get(`trustedusers_${member.guild.id}`)
        if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return console.log('Its Trusted User');
        }
        let author = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
        let limts = db.get(`kicklimts_${member.guild.id}`)
      if(limts === null) {
          return console.log('shit');
      }
      let logs = db.get(`acitonslogs_${member.guild.id}`)
          if(author > limts) {
      db.delete(`executer_${member.guild.id}_${entry.id}`)
       console.log('Sabar gua ban ni orang..')
       channel.guild.members.ban(entry.id)  
       let logsembed = new Discord.MessageEmbed()
       .setTitle(`${entry.tag} Pen ngeraid tapi gagal kentot ! gblk banget asli`)
       .setColor("#ff4949")
       .setFooter("BJ PROTECT® 2021.")
       .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
      return client.channels.cache.get(logs).send(logsembed);
             }
             db.add(`executer_${member.guild.id}_${entry.id}_kicklimts`, 1)
             let warn = db.get(`executer_${member.guild.id}_${entry.id}_kicklimts`)
             let logsembed = new Discord.MessageEmbed()
             .setTitle(`${entry.tag} Ngekick orang..`)
             .setDescription(`orang ini ngekick orang [${warn || 0}/${author || 0}] Udah gblk sok sok an ngekick orang`)
             .setColor("#ff4949")
             .setFooter("BJ PROTECT® 2021.")
             .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
             client.channels.cache.get(logs).send(logsembed)
      
    }
    })
    client.on("guildMemberRemove", async member => {
        const entry1 = await member.guild
        .fetchAuditLogs()
        .then(audit => audit.entries.first());
      if (entry1.action === "MEMBER_BAN_ADD") {
        const entry2 = await member.guild
          .fetchAuditLogs({
            type: "MEMBER_BAN_ADD"
            })
            .then(audit => audit.entries.first());
            const entry = entry2.executor;
            let trustedusers = db.get(`trustedusers_${member.guild.id}`)
            if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
            return console.log('Its Trusted User');
            }
            let author = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
            let limts = db.get(`banlimts_${member.guild.id}`)
          if(limts === null) {
              return console.log('shit');
          }
          let logs = db.get(`acitonslogs_${member.guild.id}`)
              if(author > limts) {
          db.delete(`executer_${member.guild.id}_${entry.id}`)
           console.log('trying to ban the user..')
           member.guild.members.ban(entry.id)  
           let logsembed = new Discord.MessageEmbed()
           .setTitle(`${entry.tag} Pen ngeraid ni orang bego !`)
           .setColor("#ff4949")
           .setFooter("BJ PROTECT® 2021.")
           .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
          return client.channels.cache.get(logs).send(logsembed);
                 }
                 db.add(`executer_${member.guild.id}_${entry.id}_banlimts`, 1)
                 let warn = db.get(`executer_${member.guild.id}_${entry.id}_banlimts`)
                 let logsembed = new Discord.MessageEmbed()
                 .setTitle(`${entry.tag} Ngeban orang..`)
                 .setDescription(`Udah tolol ngeban orang [${warn || 0}/${author || 0}]`)
                 .setColor("#ff4949")
                 .setFooter("BJ PROTECT® 2021.")
                 .setImage("https://media.discordapp.net/attachments/899495198348951622/899886318098722867/20211019_130636.gif")
                 client.channels.cache.get(logs).send(logsembed)
          
        }
        })
    
        
