# EditEnv

> EditEnv is a simple and efficient Node.js library for loading, parsing, editing, and saving `.env` files. Ideal for programmatically managing environment variables in your projects.


![logo](logo.jpeg)

## Installation

```sh
npm install editenv
```

## Usage

```js
const EditEnv = require('editenv');

const envEditor = new EditEnv('./.env');
envEditor.edit('NEW_KEY', 'new_value');
envEditor.save();
```
