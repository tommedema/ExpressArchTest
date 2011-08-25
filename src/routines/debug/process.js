var mediator = require('mediator');

mediator.once('boot.ready', function() {
    
    process
    .on('uncaughtException', function(exception) {
        mediator.emit('debug', 'process uncaught exception: ' + exception);
    })
    .on('exit', function() {
        mediator.emit('debug', 'process exit');
    })
    .on('SIGINT', function() {
        mediator.emit('debug', 'process sigint');
        process.exit();
    })
    .on('SIGKILL', function() {
        mediator.emit('debug', 'process sigkill');
        process.exit(1);
    })
    .on('SIGUSR1', function() {
        mediator.emit('debug', 'process sigusr1');
    });
});