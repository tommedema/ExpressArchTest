var mediator = require('mediator');

mediator.once('boot.ready', function _regRoute() {
    
    /* register route */
    mediator.emit('server.routes.register', 0, function _setRoute(server) {
        
        /* install route */
        server.get('/', function _render(req, res) {
            res.render('index', {
                title: 'Frontpage'
            });
        }); 
    });
});