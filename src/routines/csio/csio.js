/**
 * csio: client-server io
 */

var mediator = require('mediator'),
    socketio = require('socket.io');

/* initialize socket.io once server has been created */
mediator.once('server.created', function(server) {
    /* init socket.io */
    var csio = socketio.listen(server);
    
    /* csio created */
    mediator.emit('csio.created', csio);
});

/* csio is ready once configured */
mediator.once('csio.configured', function(csio) {
    
    /* ready */
    mediator.emit('csio.ready', csio);
});