var mediator = require('mediator');

mediator.once('server.prerun', function(server, port) {
    
    server.get('/', function(req, res) {
        res.render('index', {
            title: 'Frontpage'
        });
    });
});