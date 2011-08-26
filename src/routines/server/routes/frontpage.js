var mediator = require('mediator');

mediator.once('boot.ready', function() {
    
    /* register route */
    mediator.emit('server.routes.register', 0, function(server) {
        
        /* install route */
        server.get('/', function(req, res) {
            res.render('index', {
                title: 'Frontpage'
            });
        }); 
    });
});