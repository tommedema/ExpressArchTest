/**
 * Handles router for normal routes
 */

var mediator = require('mediator');

/* register router */
mediator.on('server.created', function _regRouter(server) {
    
    /* register at highest level (lowest priority) */
    mediator.emit('server.routers.register', 100, function _provideRouter(cb) {
        cb(server.router);
    });
});