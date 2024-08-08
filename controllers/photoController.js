const { Storage } = require('@google-cloud/storage');
const path = require('path');
const multer  = require('multer');

const storage = new Storage({
    keyFilename: path.join(__dirname, '../photo-upload-service.json'),
  });
const bucket = storage.bucket('wip_photo_upload');

const upload = multer({
    storage: multer.memoryStorage(),
  });


exports.uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log("Received photo");

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send({ url: publicUrl });
  });

  blobStream.end(req.file.buffer);
};

exports.generateSignedUrl = async (req, res) => {
  const { filename } = req.query;
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  try {
    const [url] = await bucket.file(filename).getSignedUrl(options);
    res.status(200).send({ url });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
