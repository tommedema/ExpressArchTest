/**
 * Sets up the general router, has to be done when other modules have hooked in
 * Will setup when there are no halts after server has been configured
 */

var mediator = require('mediator'),
    configured = false,
    halts = 0;
    
/* halt server running when router has not been setup */
mediator.on('server.created', function() {
    mediator.emit('server.haltRun');
});

mediator.on('server.router.haltSetup', function() {
    halts++;
});

mediator.on('server.router.continueSetup', function() {
    halts--;
    checkSetup();
});

mediator.on('server.configured', function() {
    configured = true;
    checkSetup();
});

function checkSetup() {
    if (configured && halts <= 0) {
        mediator.emit('server.request.server', function(server) {
            server.use(server.router);
            
            /* configured */
            mediator.emit('server.routes.configured');
            
            /* continue server running now that router has been setup */
            mediator.emit('server.continueRun');
        });
    }
}