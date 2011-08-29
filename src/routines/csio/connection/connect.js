/**
 * Handles clients that connect
 */

var mediator = require('mediator');

/* as soon as csio is created */
mediator.once('csio.created', function _handleConnections(csio) {
    
    /* handle new connections */
    csio.sockets.on('connection', function _emitConnected(socket) {
        
        /* client connected */
        process.nextTick(function() { //first need to leave this event
            mediator.emit('csio.client.connected', csio, socket);
        });
    });
});