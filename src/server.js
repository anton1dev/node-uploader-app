const net = require('net');
const fs = require('node:fs/promises');

const DELIMITER = '-------';
const PORT = process.env.PORT || 5050;
const HOST = '0.0.0.0';

const server = net.createServer(() => { });

let fileHandle, fileWriteStream;

server.on('connection', (socket) => {
  console.log('New connection!');

  socket.on('data', async (data) => {
    if (!fileHandle) {
      socket.pause();

      const indexOfDivider = data.indexOf(DELIMITER);
      const fileName = data.subarray(10, indexOfDivider).toString('utf-8');


      fileHandle = await fs.open(`storage/${fileName}`, 'w');
      fileWriteStream = fileHandle.createWriteStream();

      fileWriteStream.write(data.subarray(indexOfDivider + DELIMITER.length));

      socket.resume();
      fileWriteStream.on('drain', () => {
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on('end', () => {
    fileHandle.close();
    fileHandle = undefined;
    fileWriteStream = undefined;

    console.log('Connection closed!');
  })
});

server.listen(PORT, HOST, () => {
  console.log('Uploader server opened on ', server.address());
});