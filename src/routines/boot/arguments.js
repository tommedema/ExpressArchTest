var mediator = require('mediator'),
    optimist = require('optimist');

mediator.once('boot.lateboot', function() {
	
    /* force arguments */
    var argv =  optimist
                .usage('Usage: $0 --port [int]')
                .demand(['port'])
                .argv;
    
	/* emit input */
    mediator.emit('arguments.port', argv.port);
    
	/* answer to requests */
    mediator.on('arguments.getPort', function(cb) {
        cb(argv.port);
    });
});