var mediator    = require('mediator'),
    express     = require('express');

mediator.once('server.created', function(server) {
    
    /* general configuration */
    server.configure(function() {
        server.use(express.methodOverride());
        server.use(express.bodyParser());
        server.set('views', __dirname + '/../../client/views');
        server.set('view engine', 'jade');
    });
    
    /* development */
    server.configure('development', function() {
        mediator.emit('server.config.development');
        
        server.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    });
    
    /* production */
    server.configure('production', function() {
        mediator.emit('server.config.production');
    });
    
    /* done with configuration */
    mediator.emit('server.configured', server);
});