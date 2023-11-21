const router = require('express').Router();

router.use('/auth', require('./passport'));

module.exports = router;
