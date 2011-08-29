var mediator = require('../../../lib/mediator');

mediator.on('csio.registered', function(id, socket) {
    mediator.emit('debug', 'csio registered to server, id: %s', id);
});

mediator.on('csio.registration.failed', function() {
    mediator.emit('debug', 'csio registration failed');
});