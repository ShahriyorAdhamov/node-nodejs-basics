import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';

const decompress = async () => {
  const inputPath = resolve('files/archive.gz');
  const outputPath = resolve('files/fileToCompress.txt');

  const gunzip = createGunzip();
  const source = createReadStream(inputPath);
  const destination = createWriteStream(outputPath);

  source.pipe(gunzip).pipe(destination);

  source.on('error', (err) => console.error('Error reading file:', err.message));
  destination.on('error', (err) => console.error('Error writing file:', err.message));
};

await decompress();
