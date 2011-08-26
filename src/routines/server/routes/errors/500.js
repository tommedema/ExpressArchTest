var mediator = require('mediator');

mediator.once('boot.ready', function() {
    
    /* register route at high level (low priority) */
    mediator.emit('server.routes.register', 100, function(server) {
        
        /* catch server errors */
        server.use(function(err, req, res, next) {
            res.render('500', {
                status : 500
              , title : 'Internal Server Error (500)'
              , error : err
            });
        });
    });
});