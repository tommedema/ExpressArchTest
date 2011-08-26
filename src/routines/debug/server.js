var mediator    = require('mediator');

mediator.on('server.created', function(server) {
    mediator.emit('debug', 'http server created');
    
    server
    .on('close', function(errno) {
        mediator.emit('debug', 'server closing with error: ' + errno);
    })
    .on('clientError', function(exception) {
        mediator.emit('debug', 'a client emitted an exception: ' + util.inspect(exception));
    })
    .on('request', function (request, response) {
        mediator.emit('debug', 'Request: ' + request.url);
    });
});

mediator.on('server.listening', function(server, port) {
   mediator.emit('debug', 'http server is now listening at port: ' + port); 
});

mediator.on('server.configured', function() {
    mediator.emit('debug', 'http server has now been configurated');
});

mediator.on('server.config.development', function() {
    mediator.emit('debug', 'http server configured for development');
});

mediator.on('server.config.production', function() {
    mediator.emit('debug', 'http server configured for production');
});