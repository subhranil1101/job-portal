import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer().fields([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'resume', maxCount: 1 }
]);

export default upload
export const singleUpload = multer({ storage }).single("file")