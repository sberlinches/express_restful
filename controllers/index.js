var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated');

router.route('/')
    .get(isAuthenticated, function(request, response) {
        response.status(200).json({ data: 'Greetings human!' });
    });

router.use(require('./auth'));
router.use(require('./user'));
router.use(require('./city'));
router.use(require('./state'));
router.use(require('./country'));
router.use('/api', router);

module.exports = router;