import { getItem } from "../services/index.js";

export const findBoleto = (req, res) => {
  const boleto = getItem(req.boleto_num);

  res.status(200).json({ message: boleto });
};
