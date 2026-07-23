const { database } = require('../settings');
const { DataTypes } = require('sequelize');

const SIGNATURE_TSUNA = `╭───『 𝑻𝑺𝑼𝑵𝑨 𝑩𝑶𝑻 』───╮
│  么⸙ 𝑷𝑹𝑶𝑷𝑹𝑰𝑬𝑻𝑬 𝑫𝑬 𝑻𝑺𝑼𝑵𝑨乛亗࿐
│  𝑪𝒐𝒏𝒕𝒂𝒄𝒕 : wa.me/243971474966
╰─────────────────────────╯`

const GptConversationDB = database.define('gpt_conversations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_jid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ai_response: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
});

async function initGptDB() {
    try {
        await GptConversationDB.sync({ alter: true });
        console.log('╭───『 𝑻𝑺𝑼𝑵𝑨 𝑫𝑩 』───╮');
        console.log('│ 𝑮𝑷𝑻 𝑪𝒐𝒏𝒗𝒆𝒓𝒔𝒂𝒕𝒊𝒐𝒏𝒔 : 𝑷𝑹𝑬𝑻𝑬');
        console.log('╰──────────────────────╯');
    } catch (error) {
        console.log('╭───『 𝑻𝑺𝑼𝑵𝑨 𝑬𝑹𝑬𝑼𝑹 』───╮');
        console.log(`│ 𝑬𝒄𝒉𝒆𝒄 𝑰𝒏𝒊𝒕 : ${error.message}`);
        console.log('╰─────────────────────────╯');
        throw error;
    }
}

// 𝑺𝒂𝒖𝒗𝒆𝒈𝒂𝒓𝒅𝒆𝒓 𝒄𝒐𝒏𝒗𝒆𝒓𝒔𝒂𝒕𝒊𝒐𝒏
async function saveConversation(userJid, userMessage, aiResponse) {
    try {
        await GptConversationDB.create({
            user_jid: userJid,
            user_message: userMessage,
            ai_response: aiResponse
        });
        return true;
    } catch (error) {
        console.log(`[𝑻𝑺𝑼𝑵𝑨] 𝑬𝒓𝒆𝒖𝒓 𝒔𝒂𝒖𝒗𝒆𝒈𝒂𝒓𝒅𝒆: ${error.message}`);
        return false;
    }
}

// 𝑹𝒆𝒄𝒖𝒑𝒆𝒓𝒆𝒓 𝒉𝒊𝒔𝒕𝒐𝒓𝒊𝒒𝒖𝒆
async function getConversationHistory(userJid, limit = 10) {
    try {
        const history = await GptConversationDB.findAll({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']],
            limit: limit
        });
        return history.map(conv => ({
            user: conv.user_message,
            ai: conv.ai_response,
            time: conv.timestamp
        }));
    } catch (error) {
        console.log(`[𝑻𝑺𝑼𝑵𝑨] 𝑬𝒓𝒆𝒖𝒓 𝒉𝒊𝒔𝒕𝒐𝒓𝒊𝒒𝒖𝒆: ${error.message}`);
        return [];
    }
}

// 𝑬𝒇𝒂𝒄𝒆𝒓 𝒉𝒊𝒔𝒕𝒐𝒓𝒊𝒒𝒖𝒆
async function clearConversationHistory(userJid) {
    try {
        const deleted = await GptConversationDB.destroy({
            where: { user_jid: userJid }
        });
        return deleted > 0;
    } catch (error) {
        console.log(`[𝑻𝑺𝑼𝑵𝑨] 𝑬𝒓𝒆𝒖𝒓 𝒔𝒖𝒑𝒑𝒓𝒆𝒔𝒊𝒐𝒏: ${error.message}`);
        return false;
    }
}

// 𝑫𝒆𝒓𝒏𝒊𝒆𝒓 𝒎𝒆𝒔𝒂𝒈𝒆
async function getLastConversation(userJid) {
    try {
        const lastConv = await GptConversationDB.findOne({
            where: { user_jid: userJid },
            order: [['timestamp', 'DESC']]
        });
        return lastConv ? {
            user: lastConv.user_message,
            ai: lastConv.ai_response
        } : null;
    } catch (error) {
        console.log(`[𝑻𝑺𝑼𝑵𝑨] 𝑬𝒓𝒆𝒖𝒓 𝒅𝒆𝒓𝒏𝒊𝒆𝒓: ${error.message}`);
        return null;
    }
}

initGptDB().catch(err => {
    console.log('╭───『 𝑻𝑺𝑼𝑵𝑨 𝑪𝑹𝑰𝑻𝑰𝑸𝑼𝑬 』───╮');
    console.log(`│ 𝑬𝒄𝒉𝒆𝒄 𝑰𝒏𝒊𝒕 𝑫𝑩: ${err.message}`);
    console.log('╰───────────────────────────╯');
});

module.exports = {
    saveConversation,
    getConversationHistory,
    clearConversationHistory,
    getLastConversation,
    initGptDB,
    GptConversationDB
};

${SIGNATURE_TSUNA}
