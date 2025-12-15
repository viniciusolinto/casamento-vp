const API_URL = "https://casamento-vp.onrender.com";

/* ===============================
   CARREGAR PRESENTES
================================*/
async function carregarPresentes() {
  try {
    const res = await fetch(`${API_URL}/presentes`);
    const presentes = await res.json();

    const grid = document.getElementById("gift-grid");
    grid.innerHTML = "";

    if (presentes.length === 0) {
      grid.innerHTML = "<p>Nenhum presente disponível no momento 💙</p>";
      return;
    }

    presentes.forEach(p => {
      const card = document.createElement("div");
      card.className = "gift-card";

      card.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco.toFixed(2)}</p>

        ${
          p.disponivel
            ? `
              <button class="btn" onclick="comprarPresente('${p._id}')">
                Presentear via PIX
              </button>
              <a class="btn blue" href="${p.linkLoja}" target="_blank">
                Comprar na loja
              </a>
            `
            : `<span class="indisponivel">Já presenteado 💙</span>`
        }
      `;

      grid.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar presentes:", erro);
  }
}

/* ===============================
   MARCAR PRESENTE COMO COMPRADO
================================*/
async function comprarPresente(id) {
  const confirmar = confirm("Deseja marcar este presente como comprado?");
  if (!confirmar) return;

  await fetch(`${API_URL}/presentes/${id}/comprar`, {
    method: "POST"
  });

  carregarPresentes();
}

carregarPresentes();
