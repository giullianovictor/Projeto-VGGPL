
function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("error");
  erro.textContent = "";

  if (usuario === "") {
    erro.textContent = "Preencha o campo Usuário";
    return;
  }
  if (senha === "") {
    erro.textContent = "Preencha o campo Senha ";
    return;
  }
  const dadosSalvos = localStorage.getItem("usuarioCadastrado");
   
  if (!dadosSalvos) {
    erro.textContent = "Nenhum usuário cadastrado.";
    return;
  }

  const dados = JSON.parse(dadosSalvos);

  if (usuario === dados.login && senha === dados.senha) {
    alert("Login bem-sucedido!");

    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("usuarioNome", dados.nome);
    
    window.location.href = "indexfoundmanga.html";
  } else {
    erro.textContent = "Usuário ou senha incorretos!";
    erro.style.display = "block";
    document.getElementById("senha").value = "";
    document.getElementById("senha").focus();
  }
}
document.getElementById("anoAtual").textContent = new Date().getFullYear();