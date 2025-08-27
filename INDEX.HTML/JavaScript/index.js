window.onload = function () {
  const userLogado = localStorage.getItem("usuarioLogado");
  const nomeUsuario = localStorage.getItem("usuarioNome");

  const loginLink = document.querySelector(".login-b");
  const userInfo = document.getElementById("userInfo");
  const nomeSpan = document.getElementById("nomeUsuario");

  if (userLogado === "true" && nomeUsuario) {
    loginLink.style.display = "none";
    nomeSpan.textContent = `Olá, ${nomeUsuario}`;
    userInfo.style.display = "flex";
  } else {
    loginLink.style.display = "inline-block";
    userInfo.style.display = "none";
  }
  atualizarCarrinho();
};

function logout() {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("usuarioNome");

  window.location.href = "login.html";
}

document.getElementById("searchInput").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const cards = document.querySelectorAll(".manga-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

function mostrarConteudo(id) {
  const secoes = document.querySelectorAll(".conteudo");
  secoes.forEach((secao) => (secao.style.display = "none"));
  document.getElementById(id).style.display = "block";
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
  alert(`${nome} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const total = document.getElementById("totalCarrinho");
  lista.innerHTML = "";
  let soma = 0;
  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    soma += item.preco;
  });
  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
document.getElementById("anoAtual").textContent = new Date().getFullYear();

document.getElementById("carrinhoBtn").addEventListener("click", function () {
  const dropdown = document.getElementById("dropdownCarrinho");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

function adicionarAoCarrinho(nome, preco, imagem) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario) {
    alert("Você precisa estar logado para adicionar itens ao carrinho.");
    window.location.href = "login.html";
    return;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({
    nome: nome,
    preco: preco,
    imagem: imagem,
    quantidade: 1,
    selecionado: true
  });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const total = document.getElementById("totalCarrinho");
  lista.innerHTML = "";
  let soma = 0;
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    soma += item.preco;
  });
  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

document.addEventListener("click", function (e) {
  const carrinhoBtn = document.getElementById("carrinhoBtn");
  const dropdown = document.getElementById("dropdownCarrinho");

  if (!dropdown.contains(e.target) && !carrinhoBtn.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario) {
  alert("Você precisa estar logado para acessar o carrinho.");
  window.location.href = "login.html";
}

function filtrarPorCategoria(categoria) {
  const cards = document.querySelectorAll('.manga-card');

  cards.forEach(card => {
    const categoriasDoCard = card.getAttribute('data-categoria').split(' ');

    if (categoria === 'todos' || categoriasDoCard.includes(categoria)) {
      card.style.display = 'flex'; // ou 'block', dependendo do seu layout
    } else {
      card.style.display = 'none';
    }
  });
}