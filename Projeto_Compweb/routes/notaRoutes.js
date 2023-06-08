'use strict';
module.exports = function(app) {
    var notaHandlers = require('../Controllers/notaController.js');
    app.route('/post')
        .post(notaHandlers.post);
};