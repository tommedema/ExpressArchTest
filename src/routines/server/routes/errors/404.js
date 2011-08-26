var mediator = require('mediator');

mediator.once('server.prerunLate', function(server, port) {
    
    /* catch 404s */
    server.get('*', function(req, res) {
        res.render('404', {
            status: 404
          , title: 'Page Not Found (404)'
        });
    });
});