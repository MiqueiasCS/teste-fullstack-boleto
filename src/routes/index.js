import { Router } from "express";
import { findBoleto } from "../controllers/index.js";
import { validateType } from "../middlewares/index.js";

const routes = (app) => {
  const route = Router();

  route.get("/:boleto_num", validateType, findBoleto);

  app.use("/boleto", route);
};

export default routes;
