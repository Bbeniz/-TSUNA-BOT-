const fs = require('fs-extra');
const path = require('path');

if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const session = process.env.SESSION || '';
const dev = process.env.OWNER_NUMBER || '243971474966'; 

const autostatusAutoviewStatus = process.env.AUTOVIEW_STATUS || 'true';
const autostatusAutoLikeStatus = process.env.AUTOLIKE_STATUS || 'true';
const autostatusAutoReplyStatus = process.env.AUTOREPLY_STATUS || 'false';
const autostatusStatusReplyText = process.env.STATUS_REPLY_TEXT || '✅ Statut vu par TSUNA-MD';
const autostatusStatusLikeEmojis = process.env.STATUS_LIKE_EMOJIS || '⚡,🔥,💜'; 

const botPrefix = process.env.PREFIX || "+";
const botAuthor = process.env.OWNER_NAME || "TSUNA"; 
const botexpiration = process.env.BOT_EXPIRATION_DATE || "11/03/2027";
const botUrl = process.env.BOT_PIC || "https://i.ibb.co/WWzYc0pQ/1bb0ef902f0a7e239b6ad1cf0282acc7.jpg"; 
const botGurl = process.env.BOT_GURL || "https://github.com/Bbeniz/-TSUNA-.git"; 
const botTimezone = process.env.BOT_TIMEZONE || "Africa/Kinshasa";
const botBotname = process.env.BOTNAME || "TSUNA-MD"; 
const botPackname = process.env.BOT_PACKNAME || "么⸙ TSUNA乛亗࿐"; 
const botMode = process.env.MODE || "public"; 
const botSessionName = process.env.BOT_SESSION_NAME || "tsuna-md";
const autosocialdownload = process.env.AUTO_SOCIAL_DOWNLOAD || "false";

const { Sequelize } = require('sequelize'); 
const DATABASE_URL = process.env.DATABASE_URL || './database.db'; 

const database = DATABASE_URL === './database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      });

module.exports = {  
  database,
  dev,
  session, 
  autostatusAutoviewStatus,
  autostatusAutoLikeStatus,
  autostatusAutoReplyStatus,
  autostatusStatusReplyText,
  autostatusStatusLikeEmojis,
  botPrefix,
  botAuthor,
  autosocialdownload,
  botUrl,
  botGurl,
  botTimezone,
  botBotname,
  botexpiration,
  botPackname,
  botMode,
  botSessionName
};
