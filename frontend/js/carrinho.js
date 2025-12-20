const API_URL = "https://casamento-vp.onrender.com";

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderCarrinho() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  carrinho.forEach(p => {
    total += p.preco;

    const div = document.createElement("div");
    div.className = "gift-card";
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
    `;

    list.appendChild(div);
  });

  totalEl.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;
}

async function finalizarCompra() {
  if (!carrinho.length) {
    alert("Carrinho vazio");
    return;
  }

  const ids = carrinho.map(p => p._id);

  await fetch(`${API_URL}/presentes/finalizar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids })
  });

  alert("Presentes reservados! Agora faça o PIX 💙");

  localStorage.removeItem("carrinho");
  window.location.href = "index.html";
}

renderCarrinho();
