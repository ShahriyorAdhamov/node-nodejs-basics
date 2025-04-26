import { promises as fs } from 'fs';
import { join } from 'path';

const rename = async () => {
  const oldFilePath = join('files', 'wrongFilename.txt');
  const newFilePath = join('files', 'properFilename.md');

  try {
    await fs.access(oldFilePath);
    try {
      await fs.access(newFilePath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }
    
    await fs.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully');
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await rename();
