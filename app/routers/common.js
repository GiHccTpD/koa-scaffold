'use strict';

const Router = require('koa-router');
const router = new Router();

const common = require('../controllers/common');

router.get('/healthz', common.healthz);
router.get('/', common.root);
router.get('/error', common.error);

module.exports = router;
