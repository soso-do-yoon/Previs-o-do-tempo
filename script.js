var API_KEY = "bd5e378503939ddaee76f12ad7a97608";

function buscarClima() {
  var cidade = document.getElementById("cidade").value;

  if (cidade == "") {
    alert("Digite o nome de uma cidade!");
    return;
  }

  document.getElementById("resultado").style.display = "none";
  document.getElementById("erro").style.display = "none";
  document.getElementById("loading").style.display = "block";

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + API_KEY + "&units=metric&lang=pt_br";

  fetch(url)
    .then(function(resposta) {
      if (!resposta.ok) {
        throw new Error("Cidade não encontrada");
      }
      return resposta.json();
    })
    .then(function(dados) {
      document.getElementById("loading").style.display = "none";

      var nome = dados.name + " / " + dados.sys.country;
      var temp = Math.round(dados.main.temp);
      var desc = dados.weather[0].description;
      var icone = dados.weather[0].icon;
      var umidade = dados.main.humidity;
      var vento = dados.wind.speed;

      document.getElementById("nomeCidade").textContent = nome;
      document.getElementById("temperatura").textContent = temp + "°";
      document.getElementById("descricao").textContent = "— " + desc;
      document.getElementById("umidade").textContent = "umidade  " + umidade + "%";
      document.getElementById("vento").textContent = "vento  " + vento + " m/s";
      document.getElementById("icone").src = "https://openweathermap.org/img/wn/" + icone + "@2x.png";

      document.getElementById("resultado").style.display = "block";
    })
    .catch(function(erro) {
      document.getElementById("loading").style.display = "none";
      document.getElementById("erro").style.display = "block";
      console.log("Erro:", erro);
    });
}

document.getElementById("cidade").addEventListener("keypress", function(evento) {
  if (evento.key === "Enter") {
    buscarClima();
  }
});