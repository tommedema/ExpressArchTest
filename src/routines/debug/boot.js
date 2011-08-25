var mediator = require('mediator');

mediator.on('boot.lateboot', function() {
    mediator.emit('debug', 'lateboot procedure executing');
});

mediator.on('boot.ready', function() {
    mediator.emit('debug', 'boot procedure has finished, now ready');
});