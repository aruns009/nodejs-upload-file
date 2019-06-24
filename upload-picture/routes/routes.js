const express = require('express');
const router = express.Router();

var upload = require('../controllers/uploadController');
var uploadMiddleware = require('../controllers/uploadMiddleware');

router.get('/getAllPictures', upload.getAllPictures);
router.post('/uploadPicture', uploadMiddleware.single('image'), upload.uploadPicture);

module.exports = router;
