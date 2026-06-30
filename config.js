const CONFIG = {
  turno1: {
    tabela: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeEGAKmGG2pZN206tc_Dlkz4GGZa9fU4WGxRUbAsTTvRI9Ku5Dvyp5Sy-3FgpWp9GwqKNb73VOHEE2/pub?gid=1851970368&single=true&output=csv",
    equipes: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeEGAKmGG2pZN206tc_Dlkz4GGZa9fU4WGxRUbAsTTvRI9Ku5Dvyp5Sy-3FgpWp9GwqKNb73VOHEE2/pub?gid=587354078&single=true&output=csv",
    classificacao: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSeEGAKmGG2pZN206tc_Dlkz4GGZa9fU4WGxRUbAsTTvRI9Ku5Dvyp5Sy-3FgpWp9GwqKNb73VOHEE2/pub?gid=345592738&single=true&output=csv"
  },

  turno2: {
    tabela: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLOA-hCfAK-IxHZBlS4PquUfI4ArLQZ2e8Su7UCzdTmfQaRIyU8oqj4JfAAyoUkAQ6eVnilrreU_t2/pub?gid=1851970368&single=true&output=csv",
    equipes: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLOA-hCfAK-IxHZBlS4PquUfI4ArLQZ2e8Su7UCzdTmfQaRIyU8oqj4JfAAyoUkAQ6eVnilrreU_t2/pub?gid=587354078&single=true&output=csv",
    classificacao: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLOA-hCfAK-IxHZBlS4PquUfI4ArLQZ2e8Su7UCzdTmfQaRIyU8oqj4JfAAyoUkAQ6eVnilrreU_t2/pub?gid=345592738&single=true&output=csv"
  }
};

const params = new URLSearchParams(window.location.search);
const turnoAtual = params.get("turno") === "2" ? "turno2" : "turno1";
const numeroTurno = turnoAtual === "turno2" ? "2" : "1";

function aplicarLinksTurno() {
  const links = document.querySelectorAll("[data-link-turno]");

  links.forEach(link => {
    const pagina = link.getAttribute("href").split("?")[0];
    link.href = `${pagina}?turno=${numeroTurno}`;
  });

  document.querySelectorAll(".botao-turno").forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.turno === numeroTurno);
  });
}

document.addEventListener("DOMContentLoaded", aplicarLinksTurno);
