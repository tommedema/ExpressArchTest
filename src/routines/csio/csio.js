/**
 * csio: client-server io
 */

var mediator = require('mediator'),
    socketio = require('socket.io');

/* initialize socket.io once server has been configured */
mediator.once('server.configured', function(server) {
    /* init socket.io */
    var csio = socketio.listen(server);
    
    /* csio created */
    mediator.emit('csio.created', csio);
});

/* server is runable once csio configurated */
mediator.once('csio.configured', function() {
    
    mediator.emit('server.getServer', function(server) {
        mediator.emit('server.runable', server);
    });
});