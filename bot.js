const { default: makeWASocket, DisconnectReason } = require('@adiwajshing/baileys');

async function startBot() {
    const sock = makeWASocket();
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut);
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Connected to WhatsApp');
        }
    });

    sock.ev.on('messages.upsert', (m) => {
        console.log(JSON.stringify(m, undefined, 2));
        const message = m.messages[0];
        if (!message.key.fromMe && message.message?.conversation === '!ping') {
            sock.sendMessage(message.key.remoteJid, { text: 'pong' });
        }
    });
}

startBot();
