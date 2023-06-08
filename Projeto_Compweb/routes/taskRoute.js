'use strict';
module.exports = function(app) {
    var taskHandlers = require('../Controllers/taskController.js');
    app.route('/post')
        .post(taskHandlers.post);
};