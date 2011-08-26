/*
    Bootstrap
    
    The bootstrap is responsible for:
        > setting up our mediator (global event broker)
        > running routines (submodules) so that their event listeners are being registered
*/

/* references */
var fs          = require('fs'),
    mediator    = require('mediator'),
    bootUtil    = require('./boot/util');

/* throw on boot errors */
mediator.on('boot.error', function(err) {
    throw err;
});

/* load routines (submodules) */
bootUtil.loadRoutines(__dirname + '/routines', function _routinesLoaded(err) {
    if (err) return mediator.emit('boot.error', err);
    
    /* boot initialization for routines that need to execute prior to normal routines */
    mediator.emit('boot.init');
    
    /* ready (for normal routines, after boot.init) */
    mediator.emit('boot.ready');
});