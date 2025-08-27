function validarCadastro() {
  const nome = document.getElementById("nome").value.trim();
  const nascimento = document.getElementById("nascimento").value;
  const sexo = document.getElementById("sexo").value;
  const nomeMaterno = document.getElementById("nomeMaterno").value.trim();
  const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
  const email = document.getElementById("email").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const fixo = document.getElementById("fixo").value.trim();
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  const endereco = document.getElementById("endereco").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  const erro = document.getElementById("mensagem");
  erro.textContent = "";

  const letras = /^[0-9\d]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (!nome || nome.length < 10 || nome.length > 80 || letras.test(nome)) {
  erro.textContent = "Nome completo inválido.";
  return;
  }
  if (!nascimento ) {
    erro.textContent = "Campo Data de Nascimento não preenchido ";
    return;
  }
  if (!sexo ) {
    erro.textContent = "Campo Gênero não preenchido ";
    return;
  }
  if (!nomeMaterno || nomeMaterno.length < 10 || nomeMaterno.length > 80 || letras.test(nomeMaterno)) {
    erro.textContent = "Nome Materno inválido.";
    preventDefault();
    return;
  }
  if (!validarCPF(cpf)) {
    erro.textContent = "CPF inválido.";
    return;
  }
  if (!email || !regexEmail.test(email)) {
      erro.textContent = "Email inválido. Verifique o formato.";
      return;
  }
  if (!celular) {
    erro.textContent = "Campo Telefone Celular não preenchido ";
    return;
  }
  if (!fixo) {
    erro.textContent = "Campo Telefone Fixo não preenchido ";
    return;
  }
  if (!cep || cep.length < 8) {
    erro.textContent = "Campo CEP não preenchido ";
    return;
  }
  if (!endereco) {
    erro.textContent = "Campo Endereço não preenchido ";
    return;
  }
  if (!cidade) {
    erro.textContent = "Campo Cidade não preenchido ";
    return;
  }
  if (!estado) {
    erro.textContent = "Campo Estado não preenchido ";
    return;
  }
  if (!login || login.length < 6) {
    erro.textContent = "Login deve conter no mínimo 6 letras ";
    preventDefault();
    return;
  }

  const loginValido = /^[a-zA-Z0-9_]+$/.test(login);
    if (!loginValido) {
      erro.textContent = "Login só pode conter letras, números e underline.";
      return;
    }
  if (!senha || senha.length < 8) {
    erro.textContent = "Senha deve ter mais de 8 letras.";
    return;
  }
  if (senha !== confirmarSenha) {
    erro.textContent = "As senhas não coincidem.";
    return;
  }
  const dadosUsuario = {
    nome: nome,
    login: login,
    senha: senha
  };

  localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosUsuario));

  alert("Cadastro enviado com sucesso!");
  document.getElementById("cadastroForm").reset();
  window.location.href = "login.html";
  
}

function validarCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
                                        for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

var im = new Inputmask("999.999.999-99");
im.mask(document.getElementById("cpf"));

var im = new Inputmask("(+55)99-999999999");
im.mask(document.getElementById("celular"));

var im = new Inputmask("(+55)99-99999999");
im.mask(document.getElementById("fixo"));

var im = new Inputmask("99999-999");
im.mask(document.getElementById("cep"));

document.getElementById("cep").addEventListener("blur", function () {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.erro) {
          document.getElementById("endereco").value = data.logradouro || "";
          document.getElementById("cidade").value = data.localidade || "";
          document.getElementById("estado").value = data.uf || "";
        } else {
          alert("CEP não encontrado. Preencha manualmente.");
        }
      })
      .catch(() => alert("Erro ao buscar o CEP. Verifique sua conexão."));
  }
});

document.getElementById("anoAtual").textContent = new Date().getFullYear();