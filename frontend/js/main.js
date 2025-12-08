/* ===============================
   FUNÇÕES DE PIX
================================*/

function formatarReal(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function selecionarValor(v) {
    const el = document.getElementById("valor-escolhido");
    el.textContent = formatarReal(v);
}

function copiarPix() {
    const chave = document.getElementById("pix-chave").textContent.trim();

    navigator.clipboard.writeText(chave)
      .then(() => {
        alert("Chave Pix copiada! Agora é só colar no app do seu banco. 💜");
      })
      .catch(() => {
        alert("Não foi possível copiar automaticamente. Copie manualmente: " + chave);
      });
}

/* ===============================
   CONTAGEM REGRESSIVA
================================*/

function iniciarContagem() {
    // DEFINA A DATA DO CASAMENTO AQUI
    const dataCasamento = new Date("2026-03-28T17:00:00").getTime();

    setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataCasamento - agora;

        if (distancia <= 0) {
            document.getElementById("countdown").innerHTML = `
                <h3>O grande dia chegou! 💙</h3>
            `;
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = dias;
        document.getElementById("hours").textContent = horas;
        document.getElementById("minutes").textContent = minutos;
        document.getElementById("seconds").textContent = segundos;

    }, 1000);
}

iniciarContagem();

/* ===============================
   MOSTRAR / FECHAR LISTA DE PRESENTES
================================*/

function abrirPresentes() {
    document.getElementById("pagina-presentes").style.display = "block";
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function fecharPresentes() {
    document.getElementById("pagina-presentes").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
