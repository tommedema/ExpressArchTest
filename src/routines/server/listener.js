/*
 * Listener: makes server bind to port once configured
 */

var mediator = require('mediator');

/* bind server to port once it has been configured */
mediator.on('server.configured', function _getPort(server) {
        
    /* get port */
    mediator.emit('settings.request.port', function _bindToPort(port) {
        
        /* listen */
        server.listen(port);
        
        /* listening */
        mediator.emit('server.listening', server, port);
    });
});