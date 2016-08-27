var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    State           = sequelize.import('../models/mysql/State'),
    City            = sequelize.import('../models/mysql/City');

// Routes
router.route('/states')
    .get(isAuthenticated, function(request, response) {

        State.findAll()
            .then(function(states) {
                response.status(200).json({ data: states });
            });
    });

router.route('/states/:state_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.state_id;
        var options = {
            include: [{ all: true }]
        };

        State.findById(id, options)
            .then(function(state) {
                response.status(200).json({ data: state });
            });
    });

router.route('/states/:state_id/cities')
    .get(isAuthenticated, function(request, response) {


        var options = {
            where: { stateId: request.params.state_id },
            include: [{ all: true }]
        };

        City.findAll(options)
            .then(function(cities) {
                response.status(200).json({ data: cities });
            });
    });

module.exports = router;