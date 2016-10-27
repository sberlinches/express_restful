var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    ResponseHelper  = require('../helpers/response.helper'),
    res;

router.route('/')
    .get(isAuthenticated, function(request, response) {
        var responseHelper = new ResponseHelper('/', 'get');
        res = responseHelper.getResponse('ok', data);
        return response.status(res.status).json(res.body);
    });

router.use(require('./auth'));
router.use(require('./user'));
router.use(require('./city'));
router.use(require('./state'));
router.use(require('./country'));
router.use('/api', router);

module.exports = router;