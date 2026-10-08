const status = document.getElementById("status");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

let timer = null;

start.addEventListener("click", () => {
  if (timer) {
    status.textContent = "Estado: ya está funcionando 🚀";
    return;
  }

  const chat = document.getElementById("chat").value.trim();
  const message = document.getElementById("message").value.trim();
  const interval = Number(document.getElementById("interval").value);

  if (!chat || !message) {
    status.textContent = "⚠️ Escribe el chat y el mensaje.";
    return;
  }

  status.textContent = "🟢 Programación iniciada";

  timer = setInterval(() => {
    console.log("Mensaje programado:", {
      chat,
      message
    });

    status.textContent =
      `🟢 Activo · próximo envío cada ${interval} min`;
  }, interval * 60 * 1000);
});

stop.addEventListener("click", () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  status.textContent = "🔴 Programación detenida";
});
