const fs = require('fs');
const EditEnv = require('../src/index');

// Cria um arquivo .env de teste
const testEnvPath = './tests/.env.test';
fs.writeFileSync(testEnvPath, 'EXISTING_KEY=existing_value\nANOTHER_KEY=another_value\n');

describe('EditEnv', () => {
    let envEditor;

    beforeEach(() => {
        envEditor = new EditEnv(testEnvPath);
    });

    afterEach(() => {
        fs.writeFileSync(testEnvPath, 'EXISTING_KEY=existing_value\nANOTHER_KEY=another_value\n');
    });

    test('should load .env file', () => {
        const envConfig = envEditor.load();
        expect(envConfig).toEqual({
            EXISTING_KEY: 'existing_value',
            ANOTHER_KEY: 'another_value',
        });
    });

    test('should parse .env file', () => {
        const parsedConfig = envEditor.parse();
        expect(parsedConfig).toEqual({
            EXISTING_KEY: 'existing_value',
            ANOTHER_KEY: 'another_value',
        });
    });

    test('should edit .env file', () => {
        envEditor.edit('NEW_KEY', 'new_value');
        envEditor.edit('EXISTING_KEY', 'updated_value');
        const parsedConfig = envEditor.parse();
        expect(parsedConfig).toEqual({
            EXISTING_KEY: 'updated_value',
            ANOTHER_KEY: 'another_value',
            NEW_KEY: 'new_value',
        });
    });

    test('should save .env file', () => {
        envEditor.edit('NEW_KEY', 'new_value');
        envEditor.save();

        const fileContent = fs.readFileSync(testEnvPath, 'utf-8');
        expect(fileContent).toContain('NEW_KEY=new_value');
    });
});
