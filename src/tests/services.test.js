import {
  getAmount,
  getExpirationDate,
  checkFieldDV,
  checkBarCodeDv,
} from "../services";
import { describe, expect, it } from "@jest/globals";

describe("Testando o valor de pagamento", () => {
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

describe("Testando a data de vencimento", () => {
  it("Testando um fator de vencimento com resposta valida", () => {
    let fator = "7587";
    let expirationDate = getExpirationDate(fator);
    expect(expirationDate).toBe("2018-07-16");
  });

  it("Testando um fator de vencimento com resposta invalida", () => {
    let fator = "7587";
    let expirationDate = getExpirationDate(fator);
    expect(expirationDate).not.toBe("2018-08-16");
  });
});

describe("Testando o Dv dos campos", () => {
  it("Testando um dv com resposta valida", () => {
    let dv = 9;
    let field = "4014481606";
    let returnedDv = checkFieldDV(field, dv);
    expect(returnedDv).toBeTruthy();
  });

  it("Testando um dv com resposta invalida", () => {
    let dv = 5;
    let field = "0680935031";
    let returnedDv = checkFieldDV(field, dv);
    expect(returnedDv).toBeFalsy();
  });
});

describe("Testando o Dv do codigo de barras", () => {
  it("Testando um dv com resposta valida", () => {
    let dv = 9;
    let barCode = "21299758700000020000001121100012100447561740";
    let returnedDv = checkBarCodeDv(barCode, dv);
    expect(returnedDv).toBeTruthy();
  });

  it("Testando um dv com resposta invalida", () => {
    let dv = 5;
    let barCode = "21299758700000020000001121100012100447561740";
    let returnedDv = checkBarCodeDv(barCode, dv);
    expect(returnedDv).toBeFalsy();
  });
});
