window.onload = function () {
    const userLogado = localStorage.getItem("usuarioLogado");
    const nomeUsuario = localStorage.getItem("usuarioNome");

    const loginLink = document.querySelector(".login-b");
    const userInfo = document.getElementById("userInfo");
    const nomeSpan = document.getElementById("nomeUsuario");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const removerTodosBtn = document.getElementById("removerTodos");
    const desmarcarTodosBtn = document.getElementById("desmarcarTodos");

    if (carrinho.length > 0) {
        removerTodosBtn.style.display = "inline";
        desmarcarTodosBtn.style.display = "inline-block";
    } else {
        removerTodosBtn.style.display = "none";
        desmarcarTodosBtn.style.display = "none";
    }

    if (userLogado === "true" && nomeUsuario) {
        loginLink.style.display = "none";
        nomeSpan.textContent = `Olá, ${nomeUsuario}`;
        userInfo.style.display = "flex";
    } else {
        loginLink.style.display = "inline-block";
        userInfo.style.display = "none";
    }
};

function logout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuarioNome");

    window.location.href = "login.html";
}
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderCarrinho() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";
    let subtotal = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {
        if (!item.quantidade) item.quantidade = 1;
        const checked = item.selecionado !== false;

        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""} data-index="${index}" class="check-item">
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="produto-info">
        <p><strong>${item.nome}</strong></p>
        <p>R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="produto-opcoes">
        <div class="quantidade">
          <button class="diminuir" data-index="${index}">-</button>
          <span>${item.quantidade}</span>
          <button class="aumentar" data-index="${index}">+</button>
        </div>
        <span class="excluir" data-index="${index}">Excluir</span>
      </div>
    `;

        lista.appendChild(div);

        if (checked) {
            subtotal += item.preco * item.quantidade;
            quantidadeTotal += item.quantidade;
        }
    });

    document.getElementById("valorTotal").textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById("quantidadeSelecionada").textContent = `${quantidadeTotal} produtos`;

    addEventListeners();
}

function addEventListeners() {
    document.querySelectorAll(".check-item").forEach(input => {
        input.addEventListener("change", (e) => {
            carrinho[e.target.dataset.index].selecionado = e.target.checked;
            salvarEAtualizar();
        });
    });

    document.querySelectorAll(".aumentar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            carrinho[e.target.dataset.index].quantidade++;
            salvarEAtualizar();
        });
    });

    document.querySelectorAll(".diminuir").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            if (carrinho[idx].quantidade > 1) {
                carrinho[idx].quantidade--;
                salvarEAtualizar();
            }
        });
    });

    document.querySelectorAll(".excluir").forEach(link => {
        link.addEventListener("click", (e) => {
            carrinho.splice(e.target.dataset.index, 1);
            salvarEAtualizar();
        });
    });
}

function salvarEAtualizar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
}

document.getElementById("desmarcarTodos").addEventListener("click", () => {
    carrinho.forEach(item => item.selecionado = false);
    salvarEAtualizar();
});

renderCarrinho();
document.getElementById("anoAtual").textContent = new Date().getFullYear();

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuario) {
    alert("Você precisa estar logado para acessar o carrinho.");
    window.location.href = "login.html";
}

document.getElementById("removerTodos").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja remover todos os itens do carrinho?")) {
        localStorage.removeItem("carrinho");
        location.reload();
    }
});

document.getElementById("finalizarCompra").addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itensSelecionados = carrinho.filter(item => item.selecionado !== false);

    if (itensSelecionados.length === 0) {
        alert("Selecione ao menos um item para finalizar a compra.");
        return;
    }

    const payload = {
        itens: itensSelecionados.map(item => ({
            nome: item.nome,
            preco: item.preco,
            quantidade: item.quantidade
        }))
    };

    fetch("http://localhost:5000/criar-preferencia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.init_point) {
            // Em vez de redirecionar, coloca o link no botão
            const botao = document.getElementById("finalizarCompra");
            botao.outerHTML = `
                <a href="${data.init_point}" target="_blank" class="botao-pagamento">Ir para o pagamento</a>
            `;
        } else {
            alert("Erro ao criar pagamento. Tente novamente.");
        }
    })
    .catch(err => {
        console.error("Erro ao conectar com o servidor:", err);
        alert("Erro ao conectar com o servidor de pagamento.");
    });
});
