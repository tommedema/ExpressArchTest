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
bootUtil.loadRoutines(__dirname + '/routines', function(err) {
    if (err) return mediator.emit('boot.error', err);
    
    /* lateboot (for late boot routines once all routines have been loaded, before ready) */
    mediator.emit('boot.lateboot');
    
    /* ready (for normal routines, after lateboot) */
    mediator.emit('boot.ready');
});