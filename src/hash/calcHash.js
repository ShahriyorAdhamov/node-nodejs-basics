import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';

const calculateHash = async () => {
  const filePath = resolve('files/fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('error', (err) => {
    console.error('Error reading file:', err.message);
  });

  stream.on('data', (chunk) => {
    hash.update(chunk);
  });

  stream.on('end', () => {
    const finalHash = hash.digest('hex');
    console.log(finalHash);
  });
};

await calculateHash();
