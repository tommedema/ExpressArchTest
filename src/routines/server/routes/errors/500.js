var mediator = require('mediator');

mediator.once('server.running', function(server, port) {
    
    /* catch server errors */
    server.error(function(err, req, res) {
        res.render('500', {
            status : 500
          , title : 'Internal Server Error (500)'
          , error : err
        });
    });
});