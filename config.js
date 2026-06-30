const CONFIG = {
  turno1: {
    tabela: "CSV_TABELA_1_TURNO",
    equipes: "CSV_EQUIPES_1_TURNO",
    classificacao: "CSV_CLASSIFICACAO_1_TURNO"
  },

  turno2: {
    tabela: "CSV_TABELA_2_TURNO",
    equipes: "CSV_EQUIPES_2_TURNO",
    classificacao: "CSV_CLASSIFICACAO_2_TURNO"
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
