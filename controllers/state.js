var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    State           = sequelize.import('../models/mysql/State');

// Routes
router.route('/states')
    .get(isAuthenticated, function(request, result) {

        State.findAll()
            .then(function(states) {
                result.send({ data: states });
            });
    });

module.exports = router;