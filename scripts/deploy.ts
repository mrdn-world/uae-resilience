import "dotenv/config"
import SftpClient from 'ssh2-sftp-client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = path.resolve(__dirname, '..', 'dist');
const REMOTE_DIR = process.env.DEPLOY_DIR;
const HOST = process.env.DEPLOY_HOST;
const USER = process.env.DEPLOY_USER;


async function uploadDir(sftp: SftpClient, localDir: string, remoteDir: string) {
  const entries = fs.readdirSync(localDir, { withFileTypes: true });

  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    const remotePath = remoteDir + '/' + entry.name;

    if (entry.isDirectory()) {
      const exists = await sftp.exists(remotePath);
      if (!exists) {
        await sftp.mkdir(remotePath, true);
      }
      await uploadDir(sftp, localPath, remotePath);
    } else {
      await sftp.put(localPath, remotePath);
    }
  }
}

async function main() {
  if (!fs.existsSync(LOCAL_DIR)) {
    console.error(`Directory not found: ${LOCAL_DIR}`);
    console.error('Run "npm run generate" first.');
    process.exit(1);
  }

  const password = process.env.DEPLOY_KEY;
  const sftp = new SftpClient();

  console.log(`Connecting to ${HOST}...`);

  await sftp.connect({
    host: HOST,
    port: 22,
    username: USER,
    password: password,
  });

  console.log('Connected. Uploading files...');

  const exists = await sftp.exists(REMOTE_DIR!);
  if (!exists) {
    await sftp.mkdir(REMOTE_DIR!, true);
  }

  await uploadDir(sftp, LOCAL_DIR, REMOTE_DIR!);

  await sftp.end();
  console.log('Upload done.');

  // Purge Cloudflare cache
  const cfZone = process.env.CF_ZONE_ID;
  const cfToken = process.env.CF_API_TOKEN;

  if (cfZone && cfToken) {
    console.log('Purging Cloudflare cache...');
    const res = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${cfZone}/purge_cache`,
      { purge_everything: true },
      { headers: { Authorization: `Bearer ${cfToken}` } }
    );
    if (res.data.success) {
      console.log('Cloudflare cache purged.');
    } else {
      console.error('Cloudflare purge failed:', res.data.errors);
    }
  } else {
    console.warn('CF_ZONE_ID or CF_API_TOKEN not set, skipping cache purge.');
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Deploy failed:', err.message);
  process.exit(1);
});
