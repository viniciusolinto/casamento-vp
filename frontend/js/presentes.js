const API_URL = "https://casamento-vp.onrender.com";

async function carregarPresentes() {
  const res = await fetch(`${API_URL}/presentes`);
  const presentes = await res.json();

  const grid = document.getElementById("gift-grid");
  grid.innerHTML = "";

  presentes.forEach(p => {
    const card = document.createElement("div");
    card.className = "gift-card";

    const totalCotas = Math.round(p.valorTotal / p.valorCota);
    const cotasPagas = totalCotas - p.cotasDisponiveis;
    const percentual = Math.round((cotasPagas / totalCotas) * 100);

    card.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>

      <p>Total: ${formatarReal(p.valorTotal)}</p>
      <p>Cota: ${formatarReal(p.valorCota)}</p>

      <div class="progress-bar">
        <div class="progress" style="width:${percentual}%"></div>
      </div>
      <small>${percentual}% do presente já foi pago</small>

      ${
        p.cotasDisponiveis > 0
          ? `
            <div class="botoes-card">
              <button class="btn-pix" onclick="pagarCota('${p._id}', ${p.valorCota}, '${p.nome}')">
                💙 Pagar cota via PIX
              </button>

              <a href="${p.linkLoja}" target="_blank" class="btn-loja">
                🛒 Comprar no site
              </a>
            </div>
          `
          : `<span class="indisponivel">Presente completo 💙</span>`
      }
    `;

    grid.appendChild(card);
  });
}

async function pagarCota(id, valor, nome) {
  await fetch(`${API_URL}/presentes/${id}/pagar-cota`, {
    method: "POST"
  });

  presentear(nome, valor);
  carregarPresentes();
}

carregarPresentes();
