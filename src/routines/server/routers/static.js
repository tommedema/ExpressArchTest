/**
 * Handles router for static files
 */

var mediator    = require('mediator'),
    express     = require('express');

/* install static as soon as server is configured */
mediator.on('server.configured', function(server) {
    server.use(express.static(__dirname + '/../../client/public'));
    
    /* ready */
    mediator.emit('server.routers.static.ready');
});