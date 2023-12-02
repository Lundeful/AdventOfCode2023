import fs from 'fs';

export const readFile = (path: string): string => {
  try {
    return fs.readFileSync(path, 'utf8').toString();
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      fs.writeFileSync(path, '');
      return '';
    } else {
      throw error;
    }
  }
};

export const readLines = (path: string) => readFile(path).split('\n');
