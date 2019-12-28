import {join} from "path";
import * as cpy from 'cpy';
import {closeSync, openSync} from "fs";
import {distDirectory} from "./constants";

const ghpages = require('gh-pages');

async function createDist() {
    await cpy([
        'index.html',
        'favicon.ico',
        'assets/**/*',
        'resources/**/*.css',
        'node_modules/reveal.js/**/*',
        'src/**/*'
    ], distDirectory, {
        parents: true
    });
    closeSync(openSync(join(distDirectory, '.nojekyll'), 'w'));
}

async function publish() {
    await new Promise((resolve, reject) => {
        ghpages.publish(distDirectory, {
            dotfiles: true,
            push: true
        }, () => resolve())
    });
    console.log('Published!');
}

createDist();
publish();

