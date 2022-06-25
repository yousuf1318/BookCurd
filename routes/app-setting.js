const express = require('express');
const { appSettingController } = require('../controllers');
const AuthGuard = require('../middlewares/AuthGuard');
const RoleGuard = require('../middlewares/RoleGuard');
const router = express.Router();

router.patch('/', AuthGuard ,RoleGuard(['SUPERADMIN']), appSettingController.setAppSetting)
router.get('/', appSettingController.getAppSetting)

module.exports = router;