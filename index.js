const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('Scan this QR code to log in:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('The Aamon bot is ready to use!');
});

client.on('message', message => {
    console.log(`Received message: ${message.body}`);
    if (message.body.toLowerCase() === 'hello') {
        message.reply('Hi there! How can Aamon assist you today?');
    }
});

client.initialize();