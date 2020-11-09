const { Router } = require('express');
const router = Router();
const { sendMail, getNotifications, updateNotifications } = require('../controllers/mailController');

router.post('/', sendMail);
router.get('/notifications', getNotifications)
router.put('/notifications/update/:id', updateNotifications)
module.exports = router;