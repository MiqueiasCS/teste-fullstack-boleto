import { getItem } from "../services/index.js";

export const findBoleto = (req, res) => {
  const { boleto_num } = req.params;
  const boleto = getItem(boleto_num);

  res.status(200).json({ message: boleto });
};
