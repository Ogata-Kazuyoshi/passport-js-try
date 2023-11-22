const router = require('express').Router();

router.use('/auth', require('./passport2'));

module.exports = router;
