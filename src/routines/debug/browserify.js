var mediator = require('mediator');

mediator.on('browserify.error', function(msg) {
    mediator.emit('debug', 'browserify error: ' + msg);
});

mediator.on('browserify.ready', function() {
    mediator.emit('debug', 'browserify is now ready');
});