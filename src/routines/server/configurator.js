var mediator    = require('mediator'),
    express     = require('express');

/* configure server once it has been created */
mediator.once('server.created', function _configureServer(server) {
    
    /* general configuration */
    server.configure(function _setGeneralConfig() {
        server.use(express.methodOverride());
        server.use(express.bodyParser());
        server.set('views', __dirname + '/../../client/views');
        server.set('view engine', 'jade');
    });
    
    /* development */
    server.configure('development', function _setDevConfig() {
        mediator.emit('server.config.development');
        
        server.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    });
    
    /* production */
    server.configure('production', function _setProdConfig() {
        mediator.emit('server.config.production');
    });
    
    /* configured when routes and routers are ready */    
    mediator.once('server.routers.ready', function _setRoutesHook() {
        /* done with configuration when routes have been setup */
        mediator.once('server.routes.ready', function _emitConfigured() {
            mediator.emit('server.configured', server);
        });
        
        /* allow routes to hook now */
        mediator.emit('server.routes.hook', server);
    });
    
    /* allow routers to hook now */
    mediator.emit('server.routers.hook', server);
});