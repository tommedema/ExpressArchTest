var mediator    = require('mediator'),
    bootUtil    = require('../../boot/util'),
    fs          = require('fs');

/* setup browserify as soon as http server is created */
mediator.once('server.created', function(server) {
    /* halt route setup since we need to hook first */
    mediator.emit('server.router.haltSetup');
    
    /* halt server run since we first need to install browserify */
    mediator.emit('server.haltRun');
    
    /* set bootstrap data */
    var bootstrapLoc    = __dirname + '/../../client/js/bootstrap.js',
        routinesDir     = __dirname + '/../../client/js/routines',
        localFolder     = './routines',
        startDelimiter  = '/* routines-start */\n',
        endDelimiter    = '\n/* routines-end */';
    
    /* read bootstrap file */
    fs.readFile(bootstrapLoc, 'utf8', function(err, data) {        
        if (err) return mediator.emit('browserify.error', 'could not open bootstrapLoc: ' + bootstrapLoc);
        
        /* find injection point */
        var startLoc    = data.indexOf(startDelimiter),
            endLoc      = data.indexOf(endDelimiter);
        
        /* validate */
        if (startLoc === -1 || endLoc === -1 || startLoc > endLoc) return mediator.emit('browserify.error', 'could not find bootstrap startLoc or endLoc');
        
        /* remove current entries */        
        data = data.substring(0, startLoc + startDelimiter.length - 1) + data.substring(endLoc);
        
        /* relocate end location */
        endLoc = data.indexOf(endDelimiter);
        
        /* inject client-side routines to client side bootstrap.js */
        bootUtil.getRoutines(routinesDir, function(err, routines) {
            
            /* inject each route */
            var offset = 0;
            routines.forEach(function(routine) {
                
                /* normalize */
                var absRoutine = routine;
                routine = routine.replace(routinesDir, '');
                if (routine === absRoutine) return mediator.emit('browserify.error', 'routine could not be normalized: ' + routine);
                
                /* inject */
                entry = '\n' + 'require(\'' + localFolder + routine + '\');';
                data = data.substring(0, startLoc + startDelimiter.length - 1 + offset) + entry + data.substring(endLoc + offset);
                offset += entry.length;
            });
            
            /* write file */
            fs.writeFile(bootstrapLoc, data, 'utf8', function(err) {
                if (err) return mediator.emit('browserify.error', 'could not write to bootstrap file');
                
                /* setup browserify now that bootstrap has been prepared */
                server.use(require('browserify')({
                    require: bootstrapLoc
                  , mount: '/browserify.js'
                }));
                
                /* ready */
                mediator.emit('browserify.ready');
                
                /* resume routes hook setup now that we have hooked */
                mediator.emit('server.router.continueSetup');
                
                /* resume server run now that we are ready */
                mediator.emit('server.continueRun');
            });
        });
    }); 
});