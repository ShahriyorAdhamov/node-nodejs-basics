import { promises as fs } from 'fs';
import { join } from 'path';

const create = async () => {
  const filePath = join('files', 'fresh.txt');

  try {
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
      console.log('File created successfully.');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await create();