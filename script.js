const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeEGAKmGG2pZN206tc_Dlkz4GGZa9fU4WGxRUbAsTTvRI9Ku5Dvyp5Sy-3FgpWp9GwqKNb73VOHEE2/pub?gid=1851970368&single=true&output=csv";

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
  "Athletico-PR": "assets/athletico.png",
  "Remo": "assets/remo.png"
  "Coritiba": "assets/coritiba.png"
  "Botafogo": "assets/botafogo.png"
  "Vitória": "assets/vitoria.png"
  "Santos": "assets/santos.png"
  "Vasco": "assets/vasco.png"
  "Chapecoense": "assets/chapecoense.png"
};

let dados = [];
let cachePesquisa = [];

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(resultado) {
dados = resultado.data;
desenharTabela(dados);
criarCachePesquisa();
  }
});

function normalizar(texto) {
  return String(texto || "").trim();
}

function criarCachePesquisa() {
  cachePesquisa = dados.map((linha, indice) => ({
    indice,
    texto: Object.values(linha).join(" ").toLowerCase()
  }));
}

function criarTime(nomeTime) {
  const time = String(nomeTime || "").trim();

  const span = document.createElement("span");
  span.className = "pais";

  if (escudos[time]) {
    const img = document.createElement("img");
    img.src = escudos[time];
    img.alt = time;
    img.title = time;
    span.appendChild(img);
  } else {
    span.textContent = time;
  }

  return span;
}

function preencherCelula(td, valor) {
  const texto = normalizar(valor);

  if (!texto) {
    td.textContent = "";
    return;
  }

  if (bandeiras[texto]) {
    td.appendChild(criarPais(texto));
    return;
  }

  if (texto.includes(";")) {
    texto.split(";").forEach(item => {
      const pais = normalizar(item);
      if (pais) td.appendChild(criarPais(pais));
    });
    return;
  }

  td.textContent = texto;
}

function desenharTabela(linhas) {
  const thead = document.querySelector("#tabela thead");
  const tbody = document.querySelector("#tabela tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (!linhas.length) return;

  const colunas = Object.keys(linhas[0]);

  const colunasFixas = colunas.slice(0, 3);      // C, PARTICIPANTE, P
  const colunasPontos = colunas.slice(3, 14);    // N1 a N11
  const colunasBandeiras = colunas.slice(14);    // 16 seleções

  // Cabeçalho
  const trHead = document.createElement("tr");

  colunasFixas.forEach(coluna => {
    const th = document.createElement("th");
    th.textContent = coluna.replace(/_\d+$/, "");
    trHead.appendChild(th);
  });

  colunasPontos.forEach(coluna => {
    const th = document.createElement("th");
    th.textContent = coluna.replace(/_\d+$/, "");
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);

  linhas.forEach((linha, indiceLinha) => {
    const trBandeiras = document.createElement("tr");
    const trPontos = document.createElement("tr");

    const posicaoOriginal = dados.indexOf(linha);

    trBandeiras.dataset.indice = posicaoOriginal;
trPontos.dataset.indice = posicaoOriginal;

    if (posicaoOriginal === 0) {
      trBandeiras.classList.add("top1");
      trPontos.classList.add("top1");
    }

    if (posicaoOriginal === 1) {
      trBandeiras.classList.add("top2");
      trPontos.classList.add("top2");
    }

    if (posicaoOriginal === 2) {
      trBandeiras.classList.add("top3");
      trPontos.classList.add("top3");
    }

    if (posicaoOriginal === 3) {
      trBandeiras.classList.add("top4");
      trPontos.classList.add("top4");
    }

    if (posicaoOriginal === dados.length - 1) {
      trBandeiras.classList.add("ultimo");
      trPontos.classList.add("ultimo");
    }

    // Colunas fixas: C, PARTICIPANTE, P
    colunasFixas.forEach(coluna => {
      const td = document.createElement("td");

      if (coluna === colunasFixas[0]) td.classList.add("fixa-c");
if (coluna === colunasFixas[1]) td.classList.add("fixa-participante");
      
      td.rowSpan = 2;

      preencherCelula(td, linha[coluna]);

      const nomeColuna = coluna.toLowerCase();

      if (nomeColuna.includes("pos") || nomeColuna === "c") {
        td.classList.add("posicao");
      }

      if (nomeColuna.includes("ponto") || nomeColuna === "p") {
        td.classList.add("pontos");
      }

      trBandeiras.appendChild(td);
    });

    // N1 a N11
    colunasPontos.forEach((colunaPonto, indiceNivel) => {
      const tdBandeiras = document.createElement("td");
      tdBandeiras.classList.add("celula-bandeiras");

      const tdPonto = document.createElement("td");
      tdPonto.classList.add("celula-ponto-nivel");

const timesDoNivel = obterTimesDoNivel(linha, colunasBandeiras, indiceNivel);

timesDoNivel.forEach(nomeTime => {
  tdBandeiras.appendChild(criarTime(nomeTime));
});

      tdPonto.textContent = linha[colunaPonto];

      trBandeiras.appendChild(tdBandeiras);
      trPontos.appendChild(tdPonto);
    });

    tbody.appendChild(trBandeiras);
    tbody.appendChild(trPontos);
  });
}

function obterTimesDoNivel(linha, colunasTimes, indiceNivel) {
  const coluna = colunasTimes[indiceNivel];
  return coluna ? [String(linha[coluna] || "").trim()] : [];
}

const busca = document.querySelector("#busca");

let timerBusca;

busca.addEventListener("input", function () {
  clearTimeout(timerBusca);

  timerBusca = setTimeout(() => {
    const termo = busca.value.toLowerCase();

    const linhas = document.querySelectorAll("#tabela tbody tr");

    linhas.forEach(linha => {
      linha.classList.remove("destacada", "apagada");
    });

    if (termo === "") return;

    cachePesquisa.forEach(item => {
      const linhasDoParticipante = document.querySelectorAll(
        `#tabela tbody tr[data-indice="${item.indice}"]`
      );

      linhasDoParticipante.forEach(linha => {
        if (item.texto.includes(termo)) {
          linha.classList.add("destacada");
        } else {
          linha.classList.add("apagada");
        }
      });
    });
  }, 150);
});
