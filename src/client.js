import net from 'net';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { HOST, PORT } from '../config.js';

const DELIMITER = '-------';

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const socket = net.createConnection({ host: HOST, port: PORT }, async () => {

  const fileName = process.argv[2];
  const filePath = `${__dirname}/${fileName}`;
  const fileHandle = await fs.open(filePath, 'r');
  const fileReadStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;

  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  socket.write(`filename: ${fileName}${DELIMITER}`);

  console.log();

  fileReadStream.on('data', async (data) => {
    if (!socket.write(data)) {
      fileReadStream.pause();
    }

    bytesUploaded += data.length;
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

    if (newPercentage && newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage;
      await moveCursor(0, -1);
      await clearLine(0);

      console.log(`Uploading... ${uploadedPercentage}%`);
    }
  });

  socket.on('drain', () => {
    fileReadStream.resume();
  })

  fileReadStream.on('end', () => {
    console.log('File was successfully uploaded!');
    socket.end();
  })
});
