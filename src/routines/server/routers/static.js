/**
 * Handles router for static files
 */

var mediator    = require('mediator'),
    express     = require('express');

/* register static router as soon as server is created */
mediator.on('server.created', function(server) {
    
    /* register at a low level (high priority) */
    mediator.emit('server.routers.register', 0, function(cb) {
        cb(express.static(__dirname + '/../../../client/public'));
    });
});