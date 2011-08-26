var mediator = require('mediator');

mediator.once('csio.created', function _configureCsio(csio) {
    
    /* general configuration */
    csio.configure(function _setGenConfig() {
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
    csio.configure('development', function _setDevConfig() {
        mediator.emit('csio.config.development');
        
        csio.set('log level', 2);
    });
    
    /* production */
    csio.configure('production', function _setProdConfig() {
        mediator.emit('csio.config.production');
        
        csio.enable('browser client minification');  // send minified client
        csio.enable('browser client etag');          // apply etag caching logic based on version number
        csio.set('log level', 1);                    // reduce logging
    });
    
    /* configured */
    mediator.emit('csio.configured', csio);
});