import { promises as fs } from 'fs';
import { join } from 'path';

const read = async () => {
  const filePath = join('files', 'fileToRead.txt');
  try {
    await fs.access(filePath);
    const res = await fs.readFile(filePath, 'utf-8');

    console.log(res);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read();
