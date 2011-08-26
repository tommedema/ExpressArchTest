var mediator    = require('mediator'),
    express     = require('express');

/* configure server once it has been created */
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
    
    /* configured when routers are ready */
    mediator.once('server.routers.ready', function() {
        
        /* done with configuration when routers have been setup */
        mediator.emit('server.configured', server);
    });
    
    /* allow routers to hook now */
    mediator.emit('server.routers.hook', server);
});