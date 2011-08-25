var mediator = require('mediator');

mediator.once('server.running', function(server, port) {
    
    server.get('/', function(req, res) {
        res.render('index', {
            title: 'Frontpage'
        });
    });
});