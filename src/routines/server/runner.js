var mediator = require('mediator');

/* once server has been configured, run it */
mediator.once('server.runable', function(server) {
    
    /* get port */
    mediator.emit('arguments.getPort', function(port) {
        server.listen(port);
        
        /* running */
        mediator.emit('server.running', server, port);
        
        /* running late (for routes that wish to register later to get a lower priority) */
        mediator.emit('server.runningLate', server, port);
    });
});