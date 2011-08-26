var mediator = require('mediator');

mediator.once('csio.created', function _handleConnections(csio) {
    
    /* handle new connections */
    csio.sockets.on('connection', function _listenEvents(socket) {
        
        /* listen for register */
        socket.on('register', onRegister);
    });
});

/* called when client tries to register
 * cb(success, id) */
function onRegister(cb) {
    var socket = this;
    
    /* validate input */
    if (typeof(cb) !== 'function') {
        cb(false);
        return mediator.emit('csio.registration.error', 'register callback is not a function');
    }
    
    /* client may not already have registered */
    socket.get('registered', function _registerClient(err, registered) {
        if (registered) {
            cb(false);
            return mediator.emit('csio.registration.error', 'client is already registered on registering');
        }
        
        /* register */
        socket.set('id', socket.id);
        socket.set('registered', true);
        socket.set('available', true);
        
        /* emit client event */
        mediator.emit('csio.client.registered', socket);
        
        /* done */
        cb(true, socket.id);
    });
}