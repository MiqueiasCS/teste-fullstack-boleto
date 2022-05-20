import { Router } from "express";
import { findBoleto } from "../controllers/index.js";

const routes = (app) => {
  const route = Router();

  route.get("/:boleto_num", findBoleto);

  app.use("/boleto", route);
};

export default routes;
