const chalk = require("chalk");
const fs = require('fs/promises');
const path = require('path');

class Logger {
    static DateTimeFormat = Intl.DateTimeFormat('fr', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    info(ctx, msg) {
        const log = `[${ctx}] ${Logger.DateTimeFormat.format(new Date())} => INFO: ${JSON.stringify(msg, null, "\t")}`;
        console.info(chalk.green(log));
    }

    debug(ctx, msg) {
        const log = `[${ctx}] ${Logger.DateTimeFormat.format(new Date())} => DEBUG: ${JSON.stringify(msg, null, "\t")}`;
        console.debug(chalk.yellow(log));
    }

    error(ctx, msg, stop = false) {
        const log = `[${ctx}] ${Logger.DateTimeFormat.format(new Date())} => ERROR: ${JSON.stringify(msg, null, "\t")}`;
        console.error(chalk.red(log));
        fs.appendFile(path.join(__dirname,"..", "logs", "error.log"), `${log}\n`).then(_ => {
            this.info(Logger.name, `Error logs update`)
            if(stop)    throw msg
        });
    }
}

module.exports = new Logger();