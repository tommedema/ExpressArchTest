/**
 * csio: client server io
 */

var mediator    = require('../../lib/mediator'),
    csio        = require('../../lib/socket.io');

mediator.on('boot.ready', function _setupCsio() {

    /* socket.io has already been created (== csio) */
    
    /* answer to request */
    mediator.on('csio.request', function _provideCsio(cb) {
        cb(csio);
    });
    
    /* created */
    mediator.emit('csio.created', csio);
});