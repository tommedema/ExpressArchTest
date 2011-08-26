var mediator = require('mediator');

mediator.on('boot.init', function() {
    mediator.emit('debug', 'boot init procedure executing');
});

mediator.on('boot.ready', function() {
    mediator.emit('debug', 'boot procedure has finished, now ready');
});