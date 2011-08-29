var mediator = require('mediator');

/* when a client connects */
mediator.on('csio.client.connected', function _listenRegister(csio, socket) {
   
    /* register */
    socket.on('register', function _validateInput(cb) {
        
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
            mediator.emit('csio.client.registered', csio, socket);
            
            /* done */
            cb(true, socket.id);
        });
    });
});