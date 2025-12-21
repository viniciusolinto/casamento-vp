const API = "https://casamento-vp.onrender.com";

async function carregarCarrinho() {
  const res = await fetch(`${API}/carrinho/${sessionId}`);
  const carrinho = await res.json();

  const grid = document.getElementById("carrinho-grid");
  grid.innerHTML = "";

  carrinho.itens.forEach(p => {
    grid.innerHTML += `
      <div class="gift-card">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
      </div>
    `;
  });
}

async function finalizarCompra() {
  await fetch(`${API}/carrinho/${sessionId}/finalizar`, {
    method: "POST"
  });

  alert("Presentes reservados! Agora faça o PIX 💙");
  location.href = "index.html";
}

carregarCarrinho();
