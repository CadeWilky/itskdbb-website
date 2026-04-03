/**
 * Download portfolio images from Dropbox.
 *
 * Usage:
 *   node scripts/download-images.mjs
 *
 * Requires: DROPBOX_ACCESS_TOKEN environment variable
 *   Get a token from https://www.dropbox.com/developers/apps
 *   with files.content.read scope, or use your existing app token.
 *
 *   Example:
 *     $env:DROPBOX_ACCESS_TOKEN="sl.u.XXXX..."   (PowerShell)
 *     node scripts/download-images.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');

const TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
if (!TOKEN) {
  console.error('ERROR: DROPBOX_ACCESS_TOKEN environment variable is not set.');
  console.error('Get a token from https://www.dropbox.com/developers/apps');
  process.exit(1);
}

const FILES = [
  { id: 'id:4CPh7skORlkAAAAAAAAA8A', name: 'L1006644.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABQQ', name: 'L1006875.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABXA', name: 'L1006992.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAAA7w', name: 'L1006638.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABOw', name: 'L1006848.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABYg', name: 'L1007001.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABOQ', name: 'L1006842.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABOA', name: 'L1006841.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAABCA', name: 'L1006710.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAAA6Q', name: 'L1006619.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAAA6w', name: 'L1006626.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAAArQ', name: 'L1006421.jpg' },
  { id: 'id:4CPh7skORlkAAAAAAAAA8w', name: 'L1006655.jpg' },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

async function downloadFile(fileId, fileName) {
  return new Promise((resolve, reject) => {
    const outPath = path.join(OUT_DIR, fileName);
    const options = {
      hostname: 'content.dropboxapi.com',
      port: 443,
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({ path: fileId }),
        'Content-Length': 0,
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${body.substring(0, 200)}`)));
        return;
      }
      const out = fs.createWriteStream(outPath);
      res.pipe(out);
      out.on('finish', () => {
        const size = fs.statSync(outPath).size;
        console.log(`  ✓ ${fileName} (${(size / 1024).toFixed(0)} KB)`);
        resolve();
      });
      out.on('error', reject);
    });

    req.on('error', reject);
    req.end();
  });
}

console.log(`Downloading ${FILES.length} images to ${OUT_DIR}...\n`);

for (const file of FILES) {
  process.stdout.write(`  Downloading ${file.name}...`);
  try {
    await downloadFile(file.id, file.name);
  } catch (err) {
    console.error(`\n  ✗ ${file.name}: ${err.message}`);
  }
}

console.log('\nDone!');
