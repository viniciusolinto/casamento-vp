const API_URL = "https://casamento-vp.onrender.com";

function adicionarCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (!carrinho.includes(id)) {
    carrinho.push(id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Presente adicionado ao carrinho 💙");
  }
}

async function carregarPresentes() {
  const res = await fetch(`${API_URL}/presentes`);
  const presentes = await res.json();

  const grid = document.getElementById("gift-grid");
  grid.innerHTML = "";

  if (presentes.length === 0) {
    grid.innerHTML = "<p>Nenhum presente disponível 💙</p>";
    return;
  }

  presentes.forEach(p => {
    const card = document.createElement("div");
    card.className = "gift-card";

    card.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>

      <button onclick="adicionarCarrinho('${p._id}')">
        Adicionar ao Carrinho
      </button>

      <a href="${p.linkLoja}" target="_blank">
        Comprar na loja
      </a>
    `;

    grid.appendChild(card);
  });
}

carregarPresentes();
