const validateDVs = () => {};

const getExpirationDate = (fatorDeVencimento) => {
  let fatorMil = new Date(1997, 10 - 1, 7);
  fatorMil.setDate(fatorMil.getDate() + parseInt(fatorDeVencimento));
  return fatorMil.toISOString().slice(0, 10);
};

export const getItem = (identifier) => {
  let codigoDoBanco = identifier.slice(0, 3);
  let codigoDaMoeda = identifier[3];
  let campoLivre =
    identifier.slice(4, 9) +
    identifier.slice(10, 20) +
    identifier.slice(21, 31);
  let primeiroDv = identifier[9];
  let segundoDv = identifier[20];
  let terceiroDv = identifier[31];
  let codidoDeBarraDv = identifier[32];
  let fatorDeVencimento = identifier.slice(33, 37);
  let valor = identifier.slice(37);

  let expirationDate = getExpirationDate(fatorDeVencimento);

  let resp = {
    barCode: `${codigoDoBanco}${codigoDaMoeda}${codidoDeBarraDv}${fatorDeVencimento}${valor}${campoLivre}
    `,
    amount: `${parseInt(valor) / 100}.00`,
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
