/**
 * Configures client server io (csio) 
 */

var mediator = require('../../lib/mediator');

mediator.on('csio.created', function _configureCsio(csio) {
    
    /* configure */
    var options = {
        transports                  : ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
      , 'connect timeout'           : 5000
      , 'try multiple transports'   : true
      , 'reconnect'                 : false
    };
    
    /* configured */
    mediator.emit('csio.configured', csio, options);
});