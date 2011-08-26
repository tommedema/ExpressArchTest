/**
 * Allows routers to register themselves
 * Installs routers when applicable.
 */

var mediator    = require('mediator'),
    routers     = [],
    progress    = 0,
    hookReady   = false;

/* allow routers to register themselves
 * the lower the level the earlier it will be registered 
 * router can be passed in at any time by calling the callback */ 
mediator.on('server.routers.register', function(level, cb) {
    progress++;
    
    cb(function(router) {
        /* add router on callback */
        routers.push({
            'level' : level
          , 'router': router
        });
        
        /* registered */
        progress--;
        checkHook();
    });
});

/* install routers on hook point or wait until ready */
mediator.once('server.routers.hook', function(server) {
    hookReady = true;
    checkHook();
});

/* installs routers if no progress going on and hook is ready */
function checkHook() {
    /* check if we are ready */
    if (progress > 0 || !hookReady) return;
    
    /* sort array by level */
    routers.sort(function(a, b){
        return a.level - b.level;
    });
    
    /* get server */
    mediator.emit('server.request', function(server) {
        
        /* install each router ordered by level */
        routers.forEach(function(rObj) {
            /* install */
            server.use(rObj.router);
            
            /* installed event */
            mediator.emit('server.routers.installed', rObj.router, rObj.level);
        });
        
        /* ready */
        mediator.emit('server.routers.ready');
    });
}