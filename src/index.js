const fs = require('fs');
const dotenv = require('dotenv');

class EditEnv {
    constructor(filePath) {
        this.filePath = filePath;
        this.envConfig = this.load();
    }

    load() {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        return dotenv.parse(fileContent);
    }

    parse() {
        return this.envConfig;
    }

    edit(key, value) {
        this.envConfig[key] = value;
    }

    save() {
        const envContent = Object.keys(this.envConfig)
            .map(key => `${key}=${this.envConfig[key]}`)
            .join('\n');
        fs.writeFileSync(this.filePath, envContent);
    }
}

module.exports = EditEnv;
