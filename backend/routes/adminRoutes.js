const express = require('express');
const { adminLogin, userDelete, updateUserDetail,getUserDetail } = require('../controllers/adminControllers');
const router = express.Router();

router.post('/', adminLogin);
router.delete('/userdelete/:id', userDelete);
router.get("/userdetail/:id", getUserDetail);
router.put("/userupdate/:id", updateUserDetail);

module.exports = router;