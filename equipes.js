const CSV_EQUIPES_URL = CONFIG[turnoAtual].equipes;

const escudos = {
  "Palmeiras": "assets/palmeiras.png",
  "Flamengo": "assets/flamengo.png",
  "Cruzeiro": "assets/cruzeiro.png",
  "Mirassol": "assets/mirassol.png",
  "Fluminense": "assets/fluminense.png",
  "Bahia": "assets/bahia.png",
  "São Paulo": "assets/saopaulo.png",
  "Bragantino": "assets/bragantino.png",
  "Grêmio": "assets/gremio.png",
  "Atlético-MG": "assets/atletico.png",
  "Corinthians": "assets/corinthians.png",
  "Internacional": "assets/internacional.png",
  "Athlético-PR": "assets/athletico.png",
  "Remo": "assets/remo.png",
  "Coritiba": "assets/coritiba.png",
  "Botafogo": "assets/botafogo.png",
  "Vitória": "assets/vitoria.png",
  "Santos": "assets/santos.png",
  "Vasco": "assets/vasco.png",
  "Chapecoense": "assets/chapecoense.png"
};

let dadosEquipes = [];

Papa.parse(CSV_EQUIPES_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(resultado) {
    dadosEquipes = resultado.data;
    desenharListaEquipes(dadosEquipes);
  }
});

function desenharListaEquipes(linhas) {
  const area = document.querySelector("#lista-equipes");
  area.innerHTML = "";

  if (!linhas.length) return;

  const colunas = Object.keys(linhas[0]);
  const colunaTime = colunas[0];
  const colunaTexto = colunas[1];

  const grupos = {};

linhas.forEach(linha => {

    const time = String(linha[colunaTime] || "").trim();
    const texto = String(linha[colunaTexto] || "").trim();

    if (!time) return;

    if (!grupos[time]) {
        grupos[time] = [];
    }

    if (texto !== "") {
        grupos[time].push(texto);
    }

});

  Object.entries(grupos).forEach(([time, textos]) => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-equipe";

const titulo = document.createElement("h2");

const escudo = escudos[time];

if (escudo) {
  const img = document.createElement("img");
  img.src = escudo;
  img.alt = time;
  img.className = "bandeira-equipe";

  titulo.appendChild(img);
}

titulo.appendChild(document.createTextNode(time));

    const lista = document.createElement("ul");

if (textos.length === 0) {

    const item = document.createElement("li");
    item.textContent = "Nenhuma pontuação obtida";
    item.className = "sem-pontos";
    lista.appendChild(item);

} else {

    textos.forEach(texto => {
        const item = document.createElement("li");
        item.textContent = texto;
        lista.appendChild(item);
    });

}

    bloco.appendChild(titulo);
    bloco.appendChild(lista);

    area.appendChild(bloco);
  });
}
