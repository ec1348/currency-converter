module.exports = app => {
  const router = require('express').Router()
  const currencyExchangeServiceController = require("../controllers/currencyExchangeService.controller");
  app.use("/", router)
  router.get("/currencyexchange", currencyExchangeServiceController.exchangeRate)
}