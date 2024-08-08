const express = require('express');
const multer = require('multer');
const photoController = require('../controllers/photoController');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);
router.get('/generate-signed-url', photoController.generateSignedUrl);

module.exports = router;