var mediator = require('../../../lib/mediator');

mediator.on('csio.created', function(csio) {
    mediator.emit('debug', 'csio has been created: %o', csio);
});

mediator.on('csio.configured', function(csio, options) {
    mediator.emit('debug', 'csio %o has been configured: %o', csio, options);
});

mediator.on('csio.connected', function(socket) {
    mediator.emit('debug', 'csio is now connected: socket %o', socket);
});