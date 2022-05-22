import {
  getAmount,
  checarDvModuloDez,
  checarDvModuloOnze,
} from "../services/utils.js";
import { getExpirationDateTitulo } from "../services/titulo.js";
import {
  getExpirationDateConvenio,
  getAmountConvenio,
} from "../services/convenio.js";
import { describe, expect, it } from "@jest/globals";

describe("Testando o valor de pagamento dos boletos de titulo", () => {
  it("Testando um valor com resposta valida", () => {
    let valor = "0000002000";
    let amount = getAmount(valor);
    expect(amount).toBe("20.00");
  });

  it("Testando um valor com resposta invalida", () => {
    let valor = "0000002000";
    let amount = getAmount(valor);
    expect(amount).not.toBe("2000");
  });
});

describe("Testando a data de vencimento dos boletos de titulos", () => {
  it("Testando um fator de vencimento com resposta valida", () => {
    let fator = "7587";
    let expirationDate = getExpirationDateTitulo(fator);
    expect(expirationDate).toBe("2018-07-16");
  });

  it("Testando um fator de vencimento com resposta invalida", () => {
    let fator = "7587";
    let expirationDate = getExpirationDateTitulo(fator);
    expect(expirationDate).not.toBe("2018-08-16");
  });
});

describe("Testando o Dv dos campos com modulo 10", () => {
  it("Testando um dv com resposta valida", () => {
    let dv = 9;
    let field = "4014481606";
    let returnedDv = checarDvModuloDez(field, dv);
    expect(returnedDv).toBeTruthy();
  });

  it("Testando um dv com resposta invalida", () => {
    let dv = 5;
    let field = "0680935031";
    let returnedDv = checarDvModuloDez(field, dv);
    expect(returnedDv).toBeFalsy();
  });
});

describe("Testando o Dv com modulo 11 ", () => {
  it("Testando um dv com resposta valida", () => {
    let dv = 9;
    let barCodeSemDv = "2129758700000020000001121100012100447561740";
    let returnedDv = checarDvModuloOnze(barCodeSemDv, dv);
    expect(returnedDv).toBeTruthy();
  });

  it("Testando um dv com resposta invalida", () => {
    let dv = 5;
    let barCodeSemDv = "2129758700000020000001121100012100447561740";
    let returnedDv = checarDvModuloOnze(barCodeSemDv, dv);
    expect(returnedDv).toBeFalsy();
  });
});

describe("Testando data de vencimento dos boletos de convenio", () => {
  it("Testando uma data valida", () => {
    let campoLivre = "2020020780020200164107909";
    let date = getExpirationDateConvenio(campoLivre);
    expect(date).toBe("2020-02-07");
  });

  it("Testando uma data invalida", () => {
    let campoLivre = "020780020200164107909";
    let date = getExpirationDateConvenio(campoLivre);
    expect(date).toHaveLength(0);
  });
});

describe("Testando valor dos boletos de convenio", () => {
  it("Testando um valor em reais com valor de referencia 6", () => {
    let valorRealOuReferencia = 6;
    let valorCodigo = "00000006887";
    let valor = getAmountConvenio(valorCodigo, valorRealOuReferencia);

    expect(valor).toBe("68.87");
  });

  it("Testando um valor em reais com valor de referencia 8", () => {
    let valorRealOuReferencia = 8;
    let valorCodigo = "00000006887";
    let valor = getAmountConvenio(valorCodigo, valorRealOuReferencia);

    expect(valor).toBe("68.87");
  });

  it("Testando um valor em quantidade de moedas - valor de referencia 7", () => {
    let valorRealOuReferencia = 7;
    let valorCodigo = "00000006887";
    let valor = getAmountConvenio(valorCodigo, valorRealOuReferencia);

    expect(valor).toHaveLength(0);
  });
});
