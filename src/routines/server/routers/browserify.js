/**
 * Handles router for browserify
 */

var mediator    = require('mediator');

/* install browserify as soon as server is configured */
mediator.on('server.configured', function(server) {
    
    /* ready when browserify is */
    mediator.once('browserify.ready', function() {
        mediator.emit('server.routers.browserify.ready');
    });
    
    /* setup browserify router */
    mediator.emit('browserify.setup', server);
});