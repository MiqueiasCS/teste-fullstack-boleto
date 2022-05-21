import { getItem } from "../services/index.js";

export const findBoleto = (req, res) => {
  try {
    const boleto = getItem(req.boleto_num);
    res.status(200).json({ message: boleto });
  } catch (e) {
    return res.status(e.statusCode).json({ message: e.message });
  }
};
