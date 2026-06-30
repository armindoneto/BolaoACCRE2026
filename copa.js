const CSV_CLASSIFICACAO_URL = CONFIG[turnoAtual].classificacao;

const escudos = {
  "PALMEIRAS": "assets/palmeiras.png",
  "FLAMENGO": "assets/flamengo.png",
  "FLUMINENSE": "assets/fluminense.png",
  "ATHLETICO-PR": "assets/athletico.png",
  "BRAGANTINO": "assets/bragantino.png",
  "BAHIA": "assets/bahia.png",
  "CORITIBA": "assets/coritiba.png",
  "SÃO PAULO": "assets/saopaulo.png",
  "ATLÉTICO-MG": "assets/atletico.png",
  "CORINTHIANS": "assets/corinthians.png",
  "CRUZEIRO": "assets/cruzeiro.png",
  "BOTAFOGO": "assets/botafogo.png",
  "VITÓRIA": "assets/vitoria.png",
  "INTERNACIONAL": "assets/internacional.png",
  "SANTOS": "assets/santos.png",
  "GRÊMIO": "assets/gremio.png",
  "VASCO DA GAMA": "assets/vasco.png",
  "REMO": "assets/remo.png",
  "MIRASSOL": "assets/mirassol.png",
  "CHAPECOENSE": "assets/chapecoense.png"
};

Papa.parse(CSV_CLASSIFICACAO_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(resultado) {
    desenharClassificacao(resultado.data);
  }
});

function desenharClassificacao(linhas) {
  const thead = document.querySelector("#tabela-classificacao thead");
  const tbody = document.querySelector("#tabela-classificacao tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (!linhas.length) return;

  const colunas = Object.keys(linhas[0]);

  const trHead = document.createElement("tr");

  colunas.forEach(coluna => {
    const th = document.createElement("th");
    th.textContent = coluna;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);

  linhas.forEach(linha => {
    const tr = document.createElement("tr");

    colunas.forEach(coluna => {
      const td = document.createElement("td");
      const valor = String(linha[coluna] || "").trim();

      if (coluna.toLowerCase() === "times") {
        td.className = "time-classificacao";

        const escudo = escudos[valor.toUpperCase()];

        if (escudo) {
          const img = document.createElement("img");
          img.src = escudo;
          img.alt = valor;
          td.appendChild(img);
        }

        const span = document.createElement("span");
        span.textContent = valor;
        td.appendChild(span);
      } else {
        td.textContent = valor;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}
