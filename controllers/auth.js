var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-uthenticated'),
    sequelize       = require('../models/mysql'),
    User            = sequelize.import('../models/mysql/User'),
    bcrypt          = require('bcrypt');

router.route('/auth/login')
    .post(isAuthenticated, function(request, response) {

        var username = request.body.username;
        var password = request.body.password;

        if(username && password) {

            var options = {
                where: { username: username }
            };

            User.findOne(options)
                .then(function(data) {

                    var isValidPassword = bcrypt.compareSync(password, data.password);

                    if(isValidPassword) {
                        delete data.dataValues.password;
                        response.status(200).json({ data: data });
                    } else {
                        response.status(422).json({ error: 'Bad password' });
                    }
                })
                .catch(function(error) {
                    response.status(422).json({ error: 'Bad username' });
                });
        } else {
            response.status(400).json({ error: 'Data not provided' });
        }
    });

module.exports = router;