var mediator = require('mediator');

/* on client connect */
mediator.on('csio.client.connected', function _listenEvent(csio, socket) {
    
    /* on unregister */
    socket.on('unregister', function _unregister() {
        
        /* unregister */
        unregisterClient(csio, socket);
    });
});

/* unregister when client disconnects */
mediator.on('csio.client.disconnected', function _unregister(csio, socket) {
   
    /* unregister */
    unregisterClient(csio, socket);
});

/* unregisters client */
function unregisterClient(csio, socket) {
    
    /* client must be registered */
    socket.get('registered', function _unregisterClient(err, registered) {
        if (!registered) return mediator.emit('csio.registration.error', 'client is not registered on unregister');
        
        /* unregister */
        socket.set('registered', false);
        socket.set('available', false);
        
        /* emit event */
        mediator.emit('csio.client.unregistered', csio, socket);
    });
}