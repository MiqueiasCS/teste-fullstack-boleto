# teste-fullstack-boleto
## Desafio
Queremos poder através da aplicação consultar linhas digitáveis de boleto de título bancário e pagamento de concessionárias, verificando 
se a mesma é válida ou não. Sendo válida e possuindo valor e/ou data de vencimento ter o retorno desses dados.

## Instruções
O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada
como entrada uma linha digitada de um boleto e que retorna:
- **status**: 200 para linha válida ou 400 para linha inválida
- **amount**: O valor do boleto, se existir
- **expirationDate**: A data de vencimento do boleto, se existir
- **barCode**: Os 44 dígitos correspondentes ao código de barras desse boleto

## Instalação
- Faça um for e clone este [repositório](https://github.com/MiqueiasCS/teste-fullstack-boleto.git)
- Em seguida faça um git clone para a sua maquina
- Instale as dependencias necessárias utilizando o comando
```
$ yarn install
```
- Inicie a aplicação local em modo de desenvolvimento através do comando:

```
$ yarn run dev
```

- A aplicação inicializará na rota http://localhost:3000

## Testes Unitários
Para rodar os testes unitários, utilize o comando no terminal:
```
$ yarn test
```

## Rotas
Existe apenas uma rota **GET**

#### Endpoint - /boleto/linhaDigitavel
- Exemplo de requisição: http://localhost:3000/boleto/26090017023033374448705800000001689610000002750
- Response:
  ```
  {
    "barCode": "26096896100000027500017030333744480580000000",
    "amount": "27.50",
    "expirationDate": "2022-04-20"
  }
  ```
