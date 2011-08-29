/**
 * Handles clients that disconnect
 */

var mediator = require('mediator');

/* when a client connects */
mediator.on('csio.client.connected', function _listenDisconnect(csio, socket) {
   
    /* on disconnect */
    socket.on('disconnect', function _fireDisconnect() {
        
        /* client disconnected */
        process.nextTick(function() { //first need to leave this event
            mediator.emit('csio.client.disconnected', csio, socket);
        });
    });
});