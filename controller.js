const SinhVienITBot = require("./telegram.js")
const fs = require("fs");
const path = require("path");

class Controller {
    constructor() {
        const fdata = fs.readFileSync("config.json", { encoding: 'utf-8' });
        this.config = JSON.parse(fdata);
        this.svitbot = new SinhVienITBot(this.config);
    }

    Run() {
        this.svitbot.Run();
    }

    
}

module.exports = Controller;