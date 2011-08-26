var fs      = require('fs'),
    after   = require('after');

/* runs the routines in the given directory */
var loadRoutines = exports.loadRoutines = function(dir, cb) {
    getRoutines(dir, function(err, routines) {
        if (err) cb(err);
        
        routines.forEach(function(routine) {
            var module = require(routine);
            if (typeof(module) === 'function') module();
        });
        
        cb();
    });
};

/* detects and returns routines recursively and unordered */
var getRoutines = exports.getRoutines = function(dir, cb) {    
    fs.readdir(dir, function(err, files) {
        if (err) return cb(err);
        
        var results = [];
        
        var delayed = after(files.length, function() {
            cb(null, results);
        });
        
        files.forEach(function(file) {
            file = dir + '/' + file;
            
            fs.stat(file, function(err, stats) {
                if (err || !stats) return cb('err (' + err + ') or stats of ' + file + ' returns null.');
                
                if (stats.isDirectory()) {
                    getRoutines(file, function(err, res) {
                        if (err) return cb(err);
                        
                        results = results.concat(res);
                        delayed();
                    });
                }
                else {
                    if (file.substr(-3) === '.js') results.push(file);
                    delayed();
                }
            });
        });
    });
};