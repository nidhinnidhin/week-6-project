const express = require('express');
const { registerUser, loginUser, usersList } = require('../controllers/userControllers');
const router = express.Router();


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/userslist', usersList);


module.exports = router;