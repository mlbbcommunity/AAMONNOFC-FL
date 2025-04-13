const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client
const client = new Client();
client.on('qr', qr => {
    // Generate and scan this QR code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

// Start the bot
client.initialize();
