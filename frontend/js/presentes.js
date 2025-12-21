const API_URL = "https://casamento-vp.onrender.com";
let carrinhoId = null;

/* ===============================
   CRIAR CARRINHO AO ENTRAR
================================ */
async function criarCarrinho() {
  const res = await fetch(`${API_URL}/carrinho`, { method: "POST" });
  const carrinho = await res.json();
  carrinhoId = carrinho._id;
}

async function adicionarCarrinho(presenteId) {
  await fetch(`${API_URL}/carrinho/${carrinhoId}/adicionar/${presenteId}`, {
    method: "POST"
  });

  alert("Presente adicionado ao carrinho 💙");
}

async function carregarPresentes() {
  const res = await fetch(`${API_URL}/presentes`);
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

      <button onclick="adicionarCarrinho('${p._id}')">
        Adicionar ao Carrinho
      </button>
    `;

    grid.appendChild(card);
  });
}

/* INICIALIZA */
criarCarrinho().then(carregarPresentes);
