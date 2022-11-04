const TelegramBot = require('node-telegram-bot-api');

class SinhVienITBot {
    constructor(config) {
        this.config = config;
        this.token = config.token;  
    }

    Run() {
        this.bot = new TelegramBot(this.token, { polling: true });
        // this.PostCommand();
        this.PollingError();
        this.GetRoomID();
        this.ForwardMessage();
        this.Google();
        this.MyID();
        this.Help();
    }

    PollingError() {
        this.bot.on("polling_error", (err) => { 
            console.log(err);
            process.exit(99);
        });
    }

    ForwardMessage() {
        this.bot.on("channel_post", (msg) => {
            const channelID = msg.chat.id;
            const listForwarding = this.config.forwarding;
            for(let i=0; i<listForwarding.length; i++) {
                if(listForwarding[i].channelID == channelID) {
                    listForwarding[i].roomID.forEach(room => {
                        this.bot.forwardMessage(room, channelID, msg.message_id);
                    })
                    break;
                }
            }
        })
    }

    GetRoomID() {
        this.bot.onText(/\/roomid/, (msg, match) => {
            this.bot.sendMessage(msg.chat.id, "This room's ID: " + "`" + msg.chat.id + "`", {parse_mode: "Markdown"});
        })
    }

    Google() {
        this.bot.onText(/\/google (.+)/, (msg, match) => {
            // console.log("Searching Google");
            var url = `https://googlethatforyou.com?q=${encodeURIComponent(match[1])}`;
            this.bot.sendMessage(msg.chat.id, "Đây thanh niên: " + url);
        })
    }

    MyID() {
        this.bot.onText(/\/myid/, (msg, match) => {
            this.bot.sendMessage(msg.chat.id, "Your Telegram ID: " + "`" + msg.from.id + "`", {parse_mode: "Markdown"});
        })
    }

    Help() {
        this.bot.onText(/\/help/, (msg, match) => {
            let help = "/myid: Lấy ID Telegram của bạn\n"
            help += "/roomid: Lấy ID Telegram của room này\n";
            help += "/google [từ khoá]: Google dùm các thanh niên\n"
            this.bot.sendMessage(msg.chat.id, help);
        })
    }
}

module.exports = SinhVienITBot;

