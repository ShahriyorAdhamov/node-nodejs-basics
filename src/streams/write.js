import { createWriteStream } from 'fs';
import { resolve } from 'path';

const write = async () => {
    const filePath = resolve('files/fileToWrite.txt');
    const writeStream = createWriteStream(filePath);

    process.stdin.pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
};

await write();