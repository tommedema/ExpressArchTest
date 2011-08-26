/**
 * Allows routes to register
 * Installs routes to the server
 */

var mediator    = require('mediator'),
    routes      = [];

/* allow routes to register themselves
 * level determines order of registration
 * lower level means higher priority
 * cb is called when route should install itself to server
 */
mediator.on('server.routes.register', function(level, cb) {    
    routes.push({
        'level':    level
      , 'cb':       cb
    });
});

/* call route callbacks on hook point */
mediator.once('server.routes.hook', function(server) {    
    /* sort routes by level */
    routes.sort(function(a, b){
        return a.level - b.level;
    });
    
    /* execute callbacks */
    routes.forEach(function(rObj) {
        rObj.cb(server);
        mediator.emit('server.routes.installed', rObj.cb, rObj.level);
    });
    
    /* ready */
    mediator.emit('server.routes.ready');
});