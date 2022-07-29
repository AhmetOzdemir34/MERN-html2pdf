const express = require('express');
const router = express.Router();
const docCtrl = require('../controllers/document-ctrl');
const {auth} = require('../middlewares/auth');

router.route('/doc').post(auth,docCtrl.createDoc); 
router.route('/fdoc/:key').get(auth,docCtrl.getDoc);
router.route('/user').get(auth,docCtrl.getUser);

module.exports = router;