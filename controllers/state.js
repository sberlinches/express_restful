var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    State           = sequelize.import('../models/mysql/State'),
    City            = sequelize.import('../models/mysql/City');

// Routes
router.route('/states')
    .get(isAuthenticated, function(request, result) {

        State.findAll()
            .then(function(states) {
                result.send({ data: states });
            });
    });

router.route('/states/:state_id')
    .get(isAuthenticated, function(request, result) {

        State.findById(request.params.state_id, {
                include: [
                    { all: true }
                ]
            })
            .then(function(state) {
                result.json({ data: state });
            });
    });

router.route('/states/:state_id/cities')
    .get(isAuthenticated, function(request, result) {

        City.findAll({
                where: { stateId: request.params.state_id },
                include: [
                    { all: true }
                ]
            })
            .then(function(cities) {
                result.json({ data: cities });
            });
    });

module.exports = router;