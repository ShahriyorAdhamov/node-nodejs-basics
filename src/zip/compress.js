import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';

const compress = async () => {
    const inputPath = resolve('files/fileToCompress.txt');
    const outputPath = resolve('files/archive.gz');

    const gzip = createGzip();
    const source = createReadStream(inputPath);
    const destination = createWriteStream(outputPath);

    try {
        await pipeline(source, gzip, destination);
        console.log('File compressed successfully');
    } catch (err) {
        console.error('Compression failed:', err.message);
    }
};

await compress();