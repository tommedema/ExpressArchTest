/*
 * Listener: makes server listen once configured
 */

var mediator = require('mediator');

/* run server once it has been configured */
mediator.on('server.configured', function(server) {
        
    /* get port */
    mediator.emit('settings.request.port', function(port) {
        
        /* pre-run */
        mediator.emit('server.prerun', server, port);
        
        /* pre-run late */
        mediator.emit('server.prerunLate', server, port);
        
        /* listen */
        server.listen(port);
        
        /* listening */
        mediator.emit('server.listening', server, port);
    });
});