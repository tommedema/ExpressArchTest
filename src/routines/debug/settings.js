var mediator = require('mediator');

mediator.once('boot.ready', function() {
    
    mediator.emit('settings.getPort', function(port) {
        mediator.emit('debug', 'settings: port = ' + port);
    });
});