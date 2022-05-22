import { getAmount, checarDvModuloDez, checarDvModuloOnze } from "./utils.js";
import { ApiError } from "../error/index.js";

export const getExpirationDateConvenio = (campoLivre) => {
  let ano = campoLivre.slice(0, 4);
  let mes = campoLivre.slice(4, 6);
  let dia = campoLivre.slice(6, 8);

  let dataExiste =
    parseInt(ano) >= 1997 &&
    parseInt(mes) >= 1 &&
    parseInt(mes) <= 12 &&
    parseInt(dia) > 0 &&
    parseInt(dia) <= 31;

  return dataExiste ? `${ano}-${mes}-${dia}` : "";
};

export const getAmountConvenio = (valor, indicador) => {
  if (indicador == 6 || indicador == 8) {
    return getAmount(valor);
  }
  return "";
};

export const checarDvsConvenio = (barCode, dvs, indicador) => {
  let campoUm = barCode.slice(0, 11);
  let campoDois = barCode.slice(11, 22);
  let campoTres = barCode.slice(22, 33);
  let campoQuatro = barCode.slice(33);

  let barCodeSemDv = barCode.slice(0, 3) + barCode.slice(4);

  let dvGeralValido = false;
  let saoDvsDeCamposValidos = false;

  if (indicador <= 7) {
    dvGeralValido = checarDvModuloDez(barCodeSemDv, dvs["barCodeDv"]);

    saoDvsDeCamposValidos =
      checarDvModuloDez(campoUm, dvs["dvUm"]) &&
      checarDvModuloDez(campoDois, dvs["dvDois"]) &&
      checarDvModuloDez(campoTres, dvs["dvTres"]) &&
      checarDvModuloDez(campoQuatro, dvs["dvQuatro"]);
  } else {
    let tipoBoleto = "convenio";
    dvGeralValido = checarDvModuloOnze(
      barCodeSemDv,
      dvs["barCodeDv"],
      tipoBoleto
    );

    saoDvsDeCamposValidos =
      checarDvModuloOnze(campoUm, dvs["dvUm"], tipoBoleto) &&
      checarDvModuloOnze(campoDois, dvs["dvDois"], tipoBoleto) &&
      checarDvModuloOnze(campoTres, dvs["dvTres"], tipoBoleto) &&
      checarDvModuloOnze(campoQuatro, dvs["dvQuatro"], tipoBoleto);
  }

  if (!dvGeralValido) {
    throw new ApiError("DV geral do codigo de barras inválido!", 400);
  }

  if (!saoDvsDeCamposValidos) {
    throw new ApiError(
      "Foi passado pelo menos um DV inválido nos campos da linha digitável",
      400
    );
  }
};

export const getItemConvenio = (identifier) => {
  let produtoId = identifier[0];
  let segmentoId = identifier[1];
  let valorRealOuReferencia = identifier[2];

  let valor = identifier.slice(4, 11) + identifier.slice(12, 16);
  let empresaOuOrgaoId =
    segmentoId == 6
      ? identifier.slice(16, 23) + identifier[24]
      : identifier.slice(16, 20);

  let campoLivre =
    segmentoId == 6
      ? identifier.slice(25, 35) + identifier.slice(36, 47)
      : identifier.slice(20, 23) +
        identifier.slice(24, 35) +
        identifier.slice(36, 47);

  let dvs = {
    dvUm: identifier[11],
    dvDois: identifier[23],
    dvTres: identifier[35],
    dvQuatro: identifier[47],
    barCodeDv: identifier[3],
  };

  let barCode = `${produtoId}${segmentoId}${valorRealOuReferencia}${dvs["barCodeDv"]}${valor}${empresaOuOrgaoId}${campoLivre}`;

  checarDvsConvenio(barCode, dvs, valorRealOuReferencia);

  let expirationDate = getExpirationDateConvenio(campoLivre);

  let amount = getAmountConvenio(valor, valorRealOuReferencia);

  let res = {
    barCode,
    amount,
    expirationDate,
  };

  return res;
};
