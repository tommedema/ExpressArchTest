var mediator = require('mediator');

mediator.once('boot.ready', function _regRoute() {
    
    /* register route at high level (low priority) */
    mediator.emit('server.routes.register', 100, function _setRoute(server) {
        
        /* catch 404s */
        server.get('*', function _render(req, res) {
            res.render('404', {
                status: 404
              , title: 'Page Not Found (404)'
            });
        });
    });
});