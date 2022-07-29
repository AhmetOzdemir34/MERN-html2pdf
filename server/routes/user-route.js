const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-ctrl');

router.route('/').post(userCtrl.login); //login
router.route('/register').post(userCtrl.register); //register
router.route('/').get(userCtrl.loggedin); //loggedin
router.route('/logout').get(userCtrl.logout); //logout

module.exports = router;