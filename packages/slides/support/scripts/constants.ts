import {join} from "path";

const root = join(__dirname, '../..');
export const cssDirectory = join(root, 'resources');
export const cssGlob = cssDirectory + '/*.css';
export const distDirectory = join(process.cwd(), '_dist');
