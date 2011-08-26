/*
 * Runner: runs server once configured and there have been no halts
 */

var mediator    = require('mediator'),
    configured  = false,
    halts       = 0;

mediator.once('server.configured', function(server) {
    configured = true;
    checkRun();
});

mediator.on('server.haltRun', function() {
    halts++;
});

mediator.on('server.continueRun', function() {
    halts--;
    checkRun();
});

function checkRun() {
    if (configured && halts <= 0) runServer();
}

function runServer() {
    /* get server */
    mediator.emit('server.getServer', function(server) {
        
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
}