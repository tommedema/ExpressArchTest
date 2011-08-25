var mediator    = require('mediator'),
    express     = require('express');

mediator.once('boot.ready', function() {
    
    /* create the server */
    var server = express.createServer();
    
    /* answer request */
    mediator.on('server.getServer', function(cb) {
        cb(server);
    });

    /* created */
    mediator.emit('server.created', server);
});