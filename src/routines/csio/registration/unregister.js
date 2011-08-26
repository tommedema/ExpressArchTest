var mediator = require('mediator');

mediator.once('csio.created', function(csio) {
    
    /* handle new connections */
    csio.sockets.on('connection', function(socket) {
        
        /* listen for register */
        socket.on('unregister', onUnregister);
    });
});

/* called when client tries to unregister */
function onUnregister() {
    var socket = this;
    
    /* client must be registered */
    socket.get('registered', function(err, registered) {
        if (!registered) return mediator.emit('csio.registration.error', 'client is not registered on unregister');
        
        /* unregister */
        socket.set('registered', false);
        socket.set('available', false);
        
        /* emit event */
        mediator.emit('csio.client.unregistered');
    });
}