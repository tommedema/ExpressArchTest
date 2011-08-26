var mediator = require('mediator');

mediator.on('csio.created', function(csio) {
    mediator.emit('debug', 'csio has been created');
});

mediator.on('csio.configured', function() {
    mediator.emit('debug', 'csio has been configured');
});

mediator.on('csio.config.development', function() {
    mediator.emit('debug', 'csio configured for development');
});

mediator.on('csio.config.production', function() {
    mediator.emit('debug', 'csio configured for production');
});