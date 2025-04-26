import { promises as fs } from 'fs';
import { join } from 'path';

const copy = async () => {
  const filePath = join('files');
  const copyFilePath = join('files_copy');

  try {
    await fs.access(filePath);
    try {
      await fs.access(copyFilePath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }
    await fs.cp(filePath, copyFilePath, { recursive: true });
    console.log('Folder copied successfully');
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await copy();
