/**
 * Connects with server. 
 */

var mediator = require('../../lib/mediator');

/* connect once configured */
mediator.on('csio.configured', function _connect(csio, options) {
    
    /* auto-connect */
    var socket = csio.connect(null, options);
    
    /* catch connect */
    socket.on('connect', function _emitConnected() {
        
        /* connected */
        mediator.emit('csio.connected', socket);
    });
    
    /* answer to request */
    mediator.on('csio.request.socket', function(cb) {
        cb(socket);
    });
});