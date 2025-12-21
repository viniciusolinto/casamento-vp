const API_URL = "https://casamento-vp.onrender.com";

async function carregarPresentes(categoria = "") {
  let url = `${API_URL}/presentes`;
  if (categoria) url += `?categoria=${categoria}`;

  const res = await fetch(url);
  const presentes = await res.json();

  const grid = document.getElementById("gift-grid");
  grid.innerHTML = "";

  presentes.forEach(p => {
    const card = document.createElement("div");
    card.className = "gift-card";

    card.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>

      <p>Total: R$ ${p.valorTotal.toFixed(2)}</p>
      <p>Cota: R$ ${p.valorCota.toFixed(2)}</p>
      <p>Cotas restantes: ${p.cotasDisponiveis}</p>

      ${
        p.cotasDisponiveis > 0
          ? `<button onclick="pagarCota('${p._id}', ${p.valorCota})">
              Pagar uma cota via PIX
            </button>`
          : `<span class="indisponivel">Presente completo 💙</span>`
      }
    `;

    grid.appendChild(card);
  });
}

async function pagarCota(id, valor) {
  await fetch(`${API_URL}/presentes/${id}/pagar-cota`, {
    method: "POST"
  });

  abrirModalPix(valor);
  carregarPresentes();
}

function abrirModalPix(valor) {
  document.getElementById("pix-valor").textContent =
    "Valor da cota: R$ " + valor.toFixed(2);

  document.getElementById("pix-modal").style.display = "flex";
}

carregarPresentes();

function toggleMenu() {
    document.getElementById("menuCategorias").classList.toggle("ativo");
}


