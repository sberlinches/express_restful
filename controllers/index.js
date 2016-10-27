var express         = require('express'),
    router          = express.Router(),
    ResponseHelper  = require('../helpers/response.helper'),
    res;

router.use(require('./root'));
router.use(require('./auth'));
router.use(require('./user'));
router.use(require('./city'));
router.use(require('./state'));
router.use(require('./country'));
router.use('/api', router);

router.use(function(request, response) {
    var responseHelper = new ResponseHelper(request);
    res = responseHelper.getResponse('not_found');
    return response.status(res.status).json(res.body);
});

module.exports = router;