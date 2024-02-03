const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Dossier de destination
module.exports = upload;