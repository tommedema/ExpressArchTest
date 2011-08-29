/**
 * Handles debug messages
 */

var mediator = require('../../lib/mediator');

mediator.on('debug', function() {
    if (console) {
        console.debug.apply(console, arguments);
    }
});