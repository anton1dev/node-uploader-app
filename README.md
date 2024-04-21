# Node Uploader App

Here I've implemented such a tiny, easy-to-use, and simple and always-working file uploader application.

This App runs into Node CLI, in case that there is no need for a graphical user interface.

You can clone the entire repository to your PC, run 
`npm i`
and after that, run the application locally just using 
`npm start`.

Enjoy!


## Used technologies 

Main idea of this application - using a various built-in Node.js modules.

For better experience, in development process I've used the `net` module for creating a server, `fs` for create an access to user's file system, and a `path` built-in module to resolve an absolute path to file that should be uploaded.

## Description 

This application emulates a file downloading process.

Obiviously, you can upload any file, it doesn't even matter a size, extension or other specifity of your file.

When you just started an app, you should run: 
`node src/client.js`,
and after that string it's mandatory to specify a PATH for you file

e.g., 
- `../../123.jpg`

If the PATH to file is correct, and file exists, uploading process will begin.

All uploaded files are avaiable into `/storage` dir.

## Instructions

To run the application locally, follow these steps:

1. Clone the entire repository to your PC.
2. Install dependencies using `npm i`.
3. Start the application using `npm start`.

To initiate a new upload, you should run 
- `node src/client.js` 