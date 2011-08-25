var mediator = require('mediator');

mediator.once('server.runningLate', function(server, port) {
    
    /* catch 404s */
    server.all('*', function(req, res) {
        res.render('404', {
            status: 404
          , title: 'Page Not Found (404)'
        });
    });
});