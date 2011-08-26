var mediator        = require('mediator'),
    Settings        = require('settings'),
    settingsFile    = __dirname + '/../../config/environment.js';

mediator.once('boot.init', function() {
    var settings = new Settings(settingsFile).getEnvironment();
    
    /* answer port request */
    mediator.on('settings.request.port', function(cb) {
        cb(settings.server.port);
    });
});