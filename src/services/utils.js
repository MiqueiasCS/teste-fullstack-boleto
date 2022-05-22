export const checarDvModuloDez = (campo, campoDv) => {
  let sum = 0;
  let mult = 2;

  for (let i = campo.length - 1; i >= 0; i--) {
    let aux = parseInt(campo[i]) * mult;

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

  return dv == campoDv;
};

export const checarDvModuloOnze = (
  barCodeSemDv,
  barCodeDv,
  tipo = "titulo"
) => {
  let sum = 0;
  let mult = 2;
  for (let i = barCodeSemDv.length - 1; i >= 0; i--) {
    if (mult > 9) {
      mult = 2;
    }

    let aux = parseInt(barCodeSemDv[i]) * mult;
    mult += 1;

    sum += aux;
  }
  let resto = sum % 11;
  let dv = 11 - resto;

  if (tipo == "titulo") {
    if (dv == 0 || dv == 10 || dv == 11) {
      dv = 1;
    }
  } else {
    if (dv == 10 || dv == 11) {
      dv = 0;
    }
  }

  return dv == barCodeDv;
};

export const getAmount = (valor) => {
  return (parseInt(valor) / 100).toFixed(2);
};
