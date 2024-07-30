import fs from 'fs';
import { EditEnvLoad, EditEnvAsJson, EditEnvSet } from '../src/index.js';  // ajuste o caminho e a extensão conforme necessário

// Cria um arquivo .env de teste
const testEnvPath = './tests/.env.test';
fs.writeFileSync(testEnvPath, '#MAIN TEST\n\nEXISTING_KEY=existing_value\nANOTHER_KEY=another_value\n');

describe('EditEnv', () => {

    afterEach(() => {
        fs.writeFileSync(testEnvPath, '#MAIN TEST\n\nEXISTING_KEY=existing_value\nANOTHER_KEY=another_value\n');
    });

    test('should load .env file', () => {
        const envConfig = EditEnvAsJson(testEnvPath);
        expect(envConfig).toEqual({
            EXISTING_KEY: 'existing_value',
            ANOTHER_KEY: 'another_value',
        });
    });

    test('should parse .env file', () => {
        const parsedConfig = EditEnvAsJson(testEnvPath);
        expect(parsedConfig).toEqual({
            EXISTING_KEY: 'existing_value',
            ANOTHER_KEY: 'another_value',
        });
    });

    test('should edit .env file', () => {
        EditEnvSet(testEnvPath, 'NEW_KEY', 'new_value');
        EditEnvSet(testEnvPath, 'EXISTING_KEY', 'updated_value');
        const parsedConfig = EditEnvAsJson(testEnvPath);
        expect(parsedConfig).toEqual({
            EXISTING_KEY: 'updated_value',
            ANOTHER_KEY: 'another_value',
            NEW_KEY: 'new_value',
        });
    });

    test('should save .env file', () => {
        EditEnvSet(testEnvPath, 'NEW_KEY', 'new_value');
        const fileContent = EditEnvLoad(testEnvPath);
        expect(fileContent).toContain('NEW_KEY=new_value');
    });
});
