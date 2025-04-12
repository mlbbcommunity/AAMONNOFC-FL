const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate QR code for authentication
client.on('qr', (qr) => {
    console.log('Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Log when the bot is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Handle messages
client.on('message', async (message) => {
    console.log(`Received message: ${message.body}`);
    if (message.body === 'hello') {
        await message.reply('Hello! How can I assist you today?');
    }
});

// Start the client
client.initialize();
