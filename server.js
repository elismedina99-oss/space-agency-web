const express = require("express");
const QRCode = require("qrcode");
const { Client, LocalAuth } = require("whatsapp-web.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let qrCode = null;
let connected = false;

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "space-agency"
  }),
  puppeteer: {
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  }
});

client.on("qr", async (qr) => {
  try {
    qrCode = await QRCode.toDataURL(qr);
    connected = false;
    console.log("QR generado");
  } catch (error) {
    console.error("Error generando QR:", error);
  }
});

client.on("ready", () => {
  qrCode = null;
  connected = true;
  console.log("WhatsApp conectado 🚀");
});

client.on("disconnected", () => {
  connected = false;
  console.log("WhatsApp desconectado");
});

app.get("/api/status", (req, res) => {
  res.json({
    connected,
    qr: qrCode
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
  client.initialize();
});
