/*
 * Runner: runs server once routes have been setup
 */

var mediator = require('mediator');

/* when routers are ready */
mediator.on('server.routers.ready', function() {
    
    /* get server */
    mediator.emit('server.request.server', function(server) {
        
        /* get port */
        mediator.emit('settings.getPort', function(port) {
            
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
});