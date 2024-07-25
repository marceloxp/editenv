# EditEnv

> EditEnv is a simple and efficient Node.js library for loading, parsing, editing, and saving `.env` files. Ideal for programmatically managing environment variables in your projects.


![logo](https://raw.githubusercontent.com/marceloxp/editenv/main/logo.png)

## Installation

```sh
npm install editenv
```

## Usage

```js
const { EditEnvLoad, EditEnvAsJson, EditEnvGet, EditEnvSet } = require('editenv');

EditEnvLoad('./.env');
EditEnvAsJson('./.env');
EditEnvGet('./.env', 'EXISTING_KEY')
EditEnvSet('./.env', 'EXISTING_KEY', 'new_value');
EditEnvSet('./.env', 'NEW_KEY', 'new_value');
```
