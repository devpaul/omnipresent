import * as rimraf from 'rimraf';
import {cssGlob, distDirectory} from "./constants";

rimraf.sync(cssGlob);
rimraf.sync(distDirectory);
