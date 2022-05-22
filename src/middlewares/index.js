export const validateType = (req, res, next) => {
  const { boleto_num } = req.params;

  req.boleto_num = boleto_num;

  for (const digito of boleto_num) {
    if (isNaN(parseInt(digito))) {
      return res.status(400).json({
        error: `Os dígitos devem ser apenas números. Foi encontrado o seguinte dígito não numérico: ${digito}`,
        identificador_informado: boleto_num,
      });
    }
  }

  if (boleto_num.length != 47 && boleto_num.length != 48) {
    return res.status(400).json({
      error: `Devem haver 44 ou 47 dígitos na linha digitável. Foram passados ${boleto_num.length} dígitos`,
      identificador_informado: boleto_num,
    });
  } else {
    req.convenio = boleto_num.length == 48;
  }

  next();
};
