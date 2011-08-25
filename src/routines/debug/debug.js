var mediator    = require('mediator'),
    util        = require('util');

mediator.on('debug', function(msg) {
    util.debug(msg);
});