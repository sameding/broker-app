const express = require('express');
const apiController = require('./../controllers/apiController');

const router = express.Router();


router
  .route('/clients')
  .get(apiController.protect, apiController.getClients)
  .post(apiController.protect, apiController.addClients)

router
  .route('/clients/:clientId')
  .get(apiController.protect, apiController.getClientByClientId)
  .put(apiController.protect, apiController.updateClient)
  .delete(apiController.protect, apiController.deleteClient)

router
  .route('/brokers')
  .post(apiController.addBrokers)

router.post('/login', apiController.login)

router.get('/logout', apiController.logout)


module.exports = router;
