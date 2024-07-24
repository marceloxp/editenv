const fs = require('fs');

class EditEnv {
    constructor(filePath) {
        this.filePath = filePath;
        this.originalContent = fs.readFileSync(this.filePath, 'utf-8');
    }

    load() {
        return this.parse();
    }

    parse() {
        const lines = this.originalContent.split('\n');
        const envConfig = {};

        lines.forEach(line => {
            const match = line.match(/^([^#\n=]+)=([^#\n]*)/);
            if (match) {
                envConfig[match[1].trim()] = match[2].trim();
            }
        });

        return envConfig;
    }

    edit(key, value) {
        const regex = new RegExp(`^(${key}=.*)$`, 'm');
        if (regex.test(this.originalContent)) {
            this.originalContent = this.originalContent.replace(regex, `${key}=${value}`);
        } else {
            this.originalContent += `\n${key}=${value}`;
        }
    }

    save() {
        fs.writeFileSync(this.filePath, this.originalContent, 'utf-8');
    }
}

module.exports = EditEnv;
