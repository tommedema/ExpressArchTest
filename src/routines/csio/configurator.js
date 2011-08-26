var mediator = require('mediator');

mediator.once('csio.created', function(csio) {
    
    /* general configuration */
    csio.configure(function () {
        csio.set('transports',
        [
             'websocket'
           , 'flashsocket'
           , 'htmlfile'
           , 'xhr-polling'
           , 'jsonp-polling'
        ]);
        csio.set('close timeout', 50);
        csio.set('heartbeat timeout', 30);
        csio.set('heartbeat interval', 40);
        csio.set('polling duration', 40);
    });
    
    /* development */
    csio.configure('development', function() {
        mediator.emit('csio.configDevelopment');
        
        csio.set('log level', 2);
    });
    
    /* production */
    csio.configure('production', function() {
        mediator.emit('csio.configProduction');
        
        csio.enable('browser client minification');  // send minified client
        csio.enable('browser client etag');          // apply etag caching logic based on version number
        csio.set('log level', 1);                    // reduce logging
    });
    
    /* configured */
    mediator.emit('csio.configured', csio);
});