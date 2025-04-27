import { createReadStream } from 'fs';
import { resolve } from 'path';

const read = async () => {
    const filePath = resolve('files/fileToRead.txt');
    const readStream = createReadStream(filePath, 'utf-8');

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('error', (error) => {
        console.error('Error reading file:', error);
        throw error;
    });

    return new Promise((resolve, reject) => {
        readStream.on('end', resolve);
        readStream.on('error', reject);
    });
};

await read();