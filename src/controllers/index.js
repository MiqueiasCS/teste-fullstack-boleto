import { getItemTitulo } from "../services/titulo.js";
import { getItemConvenio } from "../services/convenio.js";

export const findBoleto = (req, res) => {
  try {
    const boleto = req.convenio
      ? getItemConvenio(req.boleto_num)
      : getItemTitulo(req.boleto_num);

    res.status(200).json({ message: boleto });
  } catch (e) {
    return res.status(e.statusCode).json({ message: e.message });
  }
};
