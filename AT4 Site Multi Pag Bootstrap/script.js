var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("resposta").textContent = "Obrigado pelo feedback! (Este site é só uma demonstração, nada foi enviado.)";
  formulario.reset();
});
