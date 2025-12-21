/* ===============================
   FORMATAÇÃO DE VALOR EM REAL
================================*/
function formatarReal(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* ===============================
   FUNÇÃO PARA COPIAR PIX
================================*/
function copiarPix() {
    const chave = document.getElementById("pix-chave").textContent.trim();

    navigator.clipboard.writeText(chave)
      .then(() => {
        alert("Chave PIX copiada! 💙");
      })
      .catch(() => {
        alert("Não foi possível copiar automaticamente. Copie manualmente: " + chave);
      });
}


/* ===============================
   CONTAGEM REGRESSIVA
================================*/
function iniciarContagem() {
    const dataCasamento = new Date("2026-03-28T17:00:00").getTime();

    setInterval(() => {
        const agora = Date.now();
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
   FUNÇÕES PARA ABRIR / FECHAR LISTA
================================*/
function abrirPresentes() {
    document.getElementById("pagina-presentes").style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function fecharPresentes() {
    document.getElementById("pagina-presentes").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ===============================
   MODAL DE PIX POR PRESENTE
================================*/
function presentear(nome, valor) {
    document.getElementById("pix-titulo").textContent = nome;

    if (valor > 0) {
        document.getElementById("pix-valor").textContent = "Valor sugerido: " + formatarReal(valor);
    } else {
        document.getElementById("pix-valor").textContent = "Qualquer valor ❤️";
    }

    document.getElementById("pix-modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("pix-modal").style.display = "none";
}

function toggleMenu() {
    document.getElementById("menu").classList.toggle("aberto");
}

