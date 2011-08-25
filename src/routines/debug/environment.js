var mediator    = require('mediator');

mediator.once('boot.ready', function() {
    
    mediator.emit('debug', 'NODE_ENV: ' + process.env.NODE_ENV);
});