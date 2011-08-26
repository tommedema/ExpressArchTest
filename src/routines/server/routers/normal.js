/**
 * Handles router for normal routes
 */

var mediator        = require('mediator'),
    browserifyRdy   = false,
    staticRdy       = false;

mediator.on('server.routers.static.ready', function() {
    staticRdy = true;
    check();
});

mediator.on('server.routers.browserify.ready', function() {
    browserifyRdy = true;
    check();
});

function check() {
    if (browserifyRdy && staticRdy) {
        mediator.emit('server.request.server', function(server) {
            server.use(server.router);
            
            /* routers ready */
            mediator.emit('server.routers.ready');
        });
    }
}