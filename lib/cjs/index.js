// src/index.js
var fs = require("fs");
var EditEnv = class {
  constructor(filePath) {
    this.filePath = filePath;
    this.originalContent = fs.readFileSync(this.filePath, "utf-8");
  }
  get() {
    return this.originalContent;
  }
  load() {
    return this.parse();
  }
  parse() {
    const lines = this.originalContent.split("\n");
    const envConfig = {};
    lines.forEach((line) => {
      const match = line.match(/^([^#\n=]+)=([^#\n]*)/);
      if (match) {
        envConfig[match[1].trim()] = match[2].trim();
      }
    });
    return envConfig;
  }
  edit(key, value) {
    const regex = new RegExp(`^(${key}=.*)$`, "m");
    if (regex.test(this.originalContent)) {
      this.originalContent = this.originalContent.replace(regex, `${key}=${value}`);
    } else {
      this.originalContent += `
${key}=${value}`;
    }
  }
  save() {
    fs.writeFileSync(this.filePath, this.originalContent, "utf-8");
  }
};
function EditEnvGet(filePath, key) {
  const envEditor = new EditEnv(filePath);
  return envEditor.load()[key];
}
function EditEnvLoad(filePath) {
  const envEditor = new EditEnv(filePath);
  return envEditor.get();
}
function EditEnvAsJson(filePath) {
  const envEditor = new EditEnv(filePath);
  return envEditor.parse();
}
function EditEnvSet(filePath, key, value) {
  const envEditor = new EditEnv(filePath);
  envEditor.edit(key, value);
  envEditor.save();
  process.env[key] = value;
}
module.exports = {
  EditEnvLoad,
  EditEnvAsJson,
  EditEnvGet,
  EditEnvSet
};
