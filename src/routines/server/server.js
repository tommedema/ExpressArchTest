var mediator    = require('mediator'),
    express     = require('express');

mediator.once('boot.ready', function() {
    
    /* create the server */
    var server = express.createServer();
    
    /* provide server */
    mediator.on('server.request', function(cb) {
        cb(server);
    });

    /* created */
    mediator.emit('server.created', server);
});