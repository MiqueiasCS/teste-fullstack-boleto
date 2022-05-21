import { ApiError } from "../error/index.js";

export const checkFieldDV = (field, fieldDv) => {
  let sum = 0;
  let mult = 2;

  for (let i = field.length - 1; i >= 0; i--) {
    let aux = parseInt(field[i]) * mult;

    if (aux > 9) {
      aux = parseInt(aux.toString()[0]) + parseInt(aux.toString()[1]);
    }
    sum += aux;
    mult = 3 - mult;
  }

  let dv = 10 - (sum % 10);

  if (dv == 10) {
    dv = 0;
  }
  console.log(field, dv, fieldDv);
  return dv == fieldDv;
};

export const checkBarCodeDv = (barCode, barCodeDv) => {
  let sum = 0;
  let mult = 2;
  for (let i = barCode.length - 1; i >= 0; i--) {
    if (i == 4) {
      continue;
    }

    if (mult > 9) {
      mult = 2;
    }

    let aux = parseInt(barCode[i]) * mult;
    mult += 1;

    sum += aux;
  }
  let resto = sum % 11;
  let dv = 11 - resto;

  if (dv == 0 || dv == 10 || dv == 11) {
    dv = 1;
  }
  return dv == barCodeDv;
};

export const getExpirationDate = (fatorDeVencimento) => {
  let fatorMil = new Date(1997, 10 - 1, 7);
  fatorMil.setDate(fatorMil.getDate() + parseInt(fatorDeVencimento));
  return fatorMil.toISOString().slice(0, 10);
};

export const getAmount = (valor) => {
  return `${parseInt(valor) / 100}.00`;
};

export const getItem = (identifier) => {
  let codigoDoBanco = identifier.slice(0, 3);
  let codigoDaMoeda = identifier[3];

  let fieldOne = identifier.slice(0, 9);
  let firstDv = identifier[9];

  let fieldTwo = identifier.slice(10, 20);
  let secondDv = identifier[20];

  let fieldThree = identifier.slice(21, 31);
  let thirdDv = identifier[31];

  let barCodeDv = identifier[32];
  let fatorDeVencimento = identifier.slice(33, 37);
  let value = identifier.slice(37);

  let areValidDvFilds =
    checkFieldDV(fieldOne, firstDv) &&
    checkFieldDV(fieldTwo, secondDv) &&
    checkFieldDV(fieldThree, thirdDv);

  if (!areValidDvFilds) {
    throw new ApiError(
      "Foi passado pelo menos um DV inválido nos campos da linha digitável",
      400
    );
  }

  let freeField = fieldOne.slice(4, 9) + fieldTwo + fieldThree;
  let barCode = `${codigoDoBanco}${codigoDaMoeda}${barCodeDv}${fatorDeVencimento}${value}${freeField}`;

  if (!checkBarCodeDv(barCode, barCodeDv)) {
    throw new ApiError("DV do codigo de barras inválido!", 400);
  }

  let expirationDate = getExpirationDate(fatorDeVencimento);
  let amount = getAmount(value);

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
