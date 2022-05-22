import { getAmount, checarDvModuloDez, checarDvModuloOnze } from "./utils.js";
import { ApiError } from "../error/index.js";

export const getExpirationDateTitulo = (fatorDeVencimento) => {
  let fatorMil = new Date(1997, 10 - 1, 7);
  fatorMil.setDate(fatorMil.getDate() + parseInt(fatorDeVencimento));
  return fatorMil.toISOString().slice(0, 10);
};

export const getItemTitulo = (identifier) => {
  let codigoDoBanco = identifier.slice(0, 3);
  let codigoDaMoeda = identifier[3];

  let campoUm = identifier.slice(0, 9);
  let dvUm = identifier[9];

  let campoDois = identifier.slice(10, 20);
  let dvDois = identifier[20];

  let campoTres = identifier.slice(21, 31);
  let dvTres = identifier[31];

  let barCodeDv = identifier[32];
  let fatorDeVencimento = identifier.slice(33, 37);
  let valor = identifier.slice(37);

  let saoDvsDeCamposValidos =
    checarDvModuloDez(campoUm, dvUm) &&
    checarDvModuloDez(campoDois, dvDois) &&
    checarDvModuloDez(campoTres, dvTres);

  if (!saoDvsDeCamposValidos) {
    throw new ApiError(
      "Foi passado pelo menos um DV inválido nos campos da linha digitável",
      400
    );
  }

  let campoLivre = campoUm.slice(4, 9) + campoDois + campoTres;

  let barCode = `${codigoDoBanco}${codigoDaMoeda}${barCodeDv}${fatorDeVencimento}${valor}${campoLivre}`;

  let barCodeSemDv = `${codigoDoBanco}${codigoDaMoeda}${fatorDeVencimento}${valor}${campoLivre}`;

  if (!checarDvModuloOnze(barCodeSemDv, barCodeDv)) {
    throw new ApiError("DV do codigo de barras inválido!", 400);
  }

  let expirationDate = getExpirationDateTitulo(fatorDeVencimento);
  let amount = getAmount(valor);

  let resp = {
    barCode,
    amount,
    expirationDate,
  };
  return resp;
};

// 2129"0.0011" 9 "21100.01210" 9 "04475.61740" 5 -9 75870000002000

// 7587  "00011 21100.01210 04475.61740"

// 212 9 9 7587 0000002000 00011 21100.01210 04475.61740

// Código do Banco na Câmara de Compensação = 212
// Código da Moeda = 9 (Real)
// Digito Verificador (DV) do código de Barras =9
// Fator de Vencimento = 7587
// Valor = 0000002000
// ======================

// 21299758700000020000001121100012100447561740
// 21299758700000020000001121100012100447561740
