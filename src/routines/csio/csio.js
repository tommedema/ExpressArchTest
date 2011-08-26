/**
 * csio: client-server io
 */

var mediator = require('mediator'),
    socketio = require('socket.io');

/* halt server running until csio is ready */
mediator.once('server.created', function() {
    mediator.emit('server.haltRun');
});

/* initialize socket.io once server has been configured */
mediator.once('server.configured', function(server) {
    /* init socket.io */
    var csio = socketio.listen(server);
    
    /* csio created */
    mediator.emit('csio.created', csio);
});

/* csio is ready once configured */
mediator.once('csio.configured', function(csio) {
    
    /* ready */
    mediator.emit('csio.ready', csio);
    
    /* continue server run */
    mediator.emit('server.continueRun');
});