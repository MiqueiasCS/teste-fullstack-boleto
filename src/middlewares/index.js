export const validateType = (req, res, next) => {
  const { boleto_num } = req.params;

  console.log(typeof boleto_num, boleto_num.length);
  req.boleto_num = boleto_num;

  if (boleto_num.length != 47) {
    return res.status(400).json({
      error: `Devem haver 47 dígitos na linha digitável. Foram passados ${boleto_num.length} dígitos`,
      identificador_informado: boleto_num,
    });
  }

  for (const digito of boleto_num) {
    if (isNaN(parseInt(digito))) {
      return res.status(400).json({
        error: `Os dígitos devem ser apenas números. Foi encontrado o seguinte dígito não numérico: ${digito}`,
        identificador_informado: boleto_num,
      });
    }
  }

  next();
};
