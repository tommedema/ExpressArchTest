/*
    ShareDiscover1 bootstrap
    
    The bootstrap is responsible for:
        > setting up our mediator (global event broker)
        > running routines (submodules) so that their event listeners are being registered
*/

/* references */
var fs          = require('fs'),
    mediator    = require('mediator');

/* run routines (submodules) */
runRoutines(__dirname + '/routines', function(err, routines) {
    if (err) throw err;
    
    /* late-boot (for late boot routines once all routines have been loaded, before ready) */
    mediator.emit('boot.lateboot');
    
    /* ready (for normal routines, after post-boot) */
    mediator.emit('boot.ready');
});

/* runs the routines in the given directory */
function runRoutines(dir, doneCb) {
    getRoutines(dir, function(err, routines) {
        if (err) doneCb(err, routines);
        
        routines.forEach(function(routine) {
            var module = require(routine);
            if (typeof(module) === 'function') module();
        });
        
        doneCb(null, routines);
    });
};

/* detects and returns routines recursively and unordered */
function getRoutines(dir, doneCb) {
    var results = [];
    
    fs.readdir(dir, function(err, files) {
        if (err) return doneCb(err);
        
        var pending = files.length;
        files.forEach(function(file) {
            file = dir + '/' + file;
            
            fs.stat(file, function(err, stats) {
                if (err || !stats) return doneCb('err (' + err + ') or stats of ' + file + ' returns null.');
                
                if (stats.isDirectory()) {
                    getRoutines(file, function(err, res) {
                        if (err) return doneCb(err);
                        results = results.concat(res);
                        pending--;
                        if (pending === 0) doneCb(null, results);
                    });
                }
                else {
                    if (file.trim().toLowerCase().substr(file.length - 3, 3) === '.js') results.push(file);
                    pending--;
                    if (pending === 0) doneCb(null, results);
                }
            });
        });
    });
};