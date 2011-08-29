/**
 * Registers to the server
 */

var mediator    = require('../../../lib/mediator'),
    registered  = false,
    clientId    = null;

/* when emitted, callback is called as soon as client is registered */
mediator.on('csio.ensureRegistered', function(cb) {
    if (registered && clientId) return cb(clientId);
    mediator.once('csio.registered', function(id) {
        cb(id);
    });
});

/* register as soon as we are connected */
mediator.on('csio.connected', function _register(socket) {
    
    /* register */
    socket.emit('register', function _emitRegistered(success, id) {
        
        /* check flag */
        if (success) {
            
            /* update registered and id */
            registered = true;
            clientId = id;
            
            /* provide id */
            mediator.on('csio.request.id', function _respond(cb) {
                cb(id);
            });
            
            /* registered */
            mediator.emit('csio.registered', id, socket);
        }
        else {
            
            /* failed */
            mediator.emit('csio.registration.failed', socket);
        }
    });
});

/* add event listeners once connected */
mediator.on('csio.connected', function _listenEvents(socket) {
    
    /* update on disconnect */
    socket.on('disconnect', function _updateStatus() {
        
        /* update */
        registered = false;
        clientId = null;
        
        /* unregistered, disconnected */
        mediator.emit('csio.unregistered', socket);
        mediator.emit('csio.disconnected', socket);
    });
});