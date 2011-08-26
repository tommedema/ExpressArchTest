var mediator = require('mediator');

mediator.once('server.prerunLate', function(server, port) {
    
    /* catch server errors */
    server.use(function(err, req, res, next) {
        res.render('500', {
            status : 500
          , title : 'Internal Server Error (500)'
          , error : err
        });
    });
});