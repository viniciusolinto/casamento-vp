async function carregarPresentes() {
  const res = await fetch("http://localhost:3000/presentes");
  const presentes = await res.json();

  const grid = document.getElementById("gift-grid");
  grid.innerHTML = "";

  presentes.forEach(p => {
    const card = document.createElement("div");
    card.className = "gift-card";

    card.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>

      ${
        p.disponivel
          ? `
            <button onclick="comprarPresente('${p._id}')">Presentear via PIX</button>
            <a href="${p.linkLoja}" target="_blank">Comprar na loja</a>
          `
          : `<span class="indisponivel">Já presenteado 💙</span>`
      }
    `;

    grid.appendChild(card);
  });
}

async function comprarPresente(id) {
  const confirmar = confirm("Deseja marcar este presente como comprado?");
  if (!confirmar) return;

  await fetch(`http://localhost:3000/presentes/${id}/comprar`, {
    method: "POST"
  });

  carregarPresentes();
}

carregarPresentes();
