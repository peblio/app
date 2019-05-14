const express = require('express');
const webSocketRoutes = express.Router();
const pageController = require('../controllers/pageController.js');

function webSocketRouter(wsInstance) {

  webSocketRoutes.ws('/page/:id', function (ws, req) {
    ws.on('message', function (msg) {
      const clientsToBeUpdated = [];
      for(let client of wsInstance.getWss().clients) {
        if(client.request.url === req.url) {
          clientsToBeUpdated.push(client);
        }
      }
      pageController.updateClientsAboutPage(req, clientsToBeUpdated, ws);
    });
  });

  webSocketRoutes.ws('/health', function (ws, req) {
    ws.on('message', function () {
      const clients = wsInstance.getWss().clients;
      console.log("All clients", clients);
      ws.send('Im OK');
      clients.forEach(client => {
        if (client.request.url === req.url) {
          client.send('Im OK');
        }
      });
    });
  });

  return webSocketRoutes;

}

module.exports = webSocketRouter;
