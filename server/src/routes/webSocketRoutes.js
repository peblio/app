const express = require('express');
const webSocketRoutes = express.Router();

function webSocketRouter(wsInstance) {

  webSocketRoutes.ws('/echo/:id', function (ws, req) {

    ws.on('message', function (msg) {
      const clients = wsInstance.getWss().clients;
      console.log("All clients", clients);
      ws.send(msg + req.params.id);
      clients.forEach(client => {
        if (client.request.url === req.url) {
          client.send(msg + req.params.id);
        }
      });
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
