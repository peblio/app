const express = require('express');
const webSocketRoutes = express.Router();

webSocketRoutes.ws('/echo/:id', function(ws, req) {
    ws.on('message', function(msg) {
      ws.send(msg+req.params.id);
    });
});

module.exports = webSocketRoutes;
   