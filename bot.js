const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client with local authentication to persist sessions
const client = new Client({
    authStrategy: new LocalAuth()
});

// Event listener for generating and displaying the QR code
client.on('qr', (qr) => {
    console.log('Scan this QR code to log in:');
    qrcode.generate(qr, { small: true });
});

// Event listener when the client is ready
client.on('ready', () => {
    console.log('WhatsApp Bot is ready!');
});

// Event listener to handle incoming messages
client.on('message', async (message) => {
    console.log(`Message from ${message.from}: ${message.body}`);
    
    // Respond to a ping command
    if (message.body.toLowerCase() === '!ping') {
        await message.reply('pong');
    }

    // Add another command, e.g., !help
    if (message.body.toLowerCase() === '!help') {
        const helpMessage = `
Available commands:
- !ping: Responds with "pong"
- !help: Displays this help message
        `;
        await message.reply(helpMessage);
    }
});

// Event listener for handling authentication failures
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

// Event listener for handling client disconnection
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
    client.initialize(); // Reinitialize the client if disconnected
});

// Start the bot
client.initialize();
