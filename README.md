# EditEnv

> EditEnv is a simple and efficient Node.js library for loading, parsing, editing, and saving `.env` files. Ideal for programmatically managing environment variables in your projects.

![logo](https://raw.githubusercontent.com/marceloxp/editenv/main/logo.png)

## Installation

```sh
npm install editenv
```

## Usage

### CommonJS

If you are using CommonJS modules (e.g., in Node.js environments that use `require`), you can use the library like this:

```js
const { EditEnvLoad, EditEnvAsJson, EditEnvGet, EditEnvSet } = require('editenv');

EditEnvLoad('./.env');
EditEnvAsJson('./.env');
EditEnvGet('./.env', 'EXISTING_KEY');
EditEnvSet('./.env', 'EXISTING_KEY', 'new_value');
EditEnvSet('./.env', 'NEW_KEY', 'new_value');
```

### ES6 Modules

If you are using ES6 modules (e.g., in environments that support `import`), you can use the library like this:

```js
import { EditEnvLoad, EditEnvAsJson, EditEnvGet, EditEnvSet } from 'editenv';

EditEnvLoad('./.env');
EditEnvAsJson('./.env');
EditEnvGet('./.env', 'EXISTING_KEY');
EditEnvSet('./.env', 'EXISTING_KEY', 'new_value');
EditEnvSet('./.env', 'NEW_KEY', 'new_value');
```

## API

### `EditEnvLoad(filePath)`

Loads the content of the `.env` file located at `filePath`.

### `EditEnvAsJson(filePath)`

Parses the `.env` file located at `filePath` and returns its contents as a JSON object.

### `EditEnvGet(filePath, key)`

Gets the value associated with `key` from the `.env` file located at `filePath`.

### `EditEnvSet(filePath, key, value)`

Sets the value for `key` in the `.env` file located at `filePath`. If the key does not exist, it is added.
