/*
 * Runner: runs server once routes have been setup
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
        
        /* run */
        server.listen(port);
        
        /* running */
        mediator.emit('server.running', server, port);
    });
});