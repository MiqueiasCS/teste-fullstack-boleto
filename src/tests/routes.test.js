import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../app.js";

describe("Testando respostas com dados inválidos", () => {
  it("Testando entrada de dados menor que 47 digitos", async () => {
    let linhaDig = "816100000008688716052024002078002025001641079";
    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("identificador_informado");
  });

  it("Testando entrada de dados maior que 48 digitos", async () => {
    let linhaDig = "8161000000086887160520240020780020250016410790900";
    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("identificador_informado");
  });

  it("Testando entrada de dados com dígito não numérico", async () => {
    let linhaDig = "8161000000086887160520240020780020250016410790aa";
    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("identificador_informado");
  });

  it("Testando entrada com dv Geral de convenio invalido", async () => {
    let linhaDig = "816300000008688716052024002078002025001641079098";
    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("DV geral do codigo de barras inválido!");
  });

  it("Testando entrada com dv de campo de convenio invalido", async () => {
    let linhaDig = "816100000008688716052029002078002025001641079098";
    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Foi passado pelo menos um DV inválido nos campos da linha digitável"
    );
  });
});

describe("Testando boleto de titulo", () => {
  it("Testando boleto com valor e data", async () => {
    let linhaDig = "21290001192110001210904475617405975870000002000";
    let responseBarCode = "21299758700000020000001121100012100447561740";

    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("barCode");
    expect(response.body.barCode).toBe(responseBarCode);
    expect(response.body.amount).toBe("20.00");
    expect(response.body.expirationDate).toBe("2018-07-16");
  });
});

describe("Testando boleto de convenio", () => {
  it("Testando requisicao com valor e data", async () => {
    let linhaDig = "816100000008688716052024002078002025001641079098";
    let responseBarCode = "81610000000688716052020020780020200164107909";

    const response = await request(app).get(`/boleto/${linhaDig}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("barCode");
    expect(response.body.barCode).toBe(responseBarCode);
    expect(response.body.amount).toBe("68.87");
    expect(response.body.expirationDate).toBe("2020-02-07");
  });
});
