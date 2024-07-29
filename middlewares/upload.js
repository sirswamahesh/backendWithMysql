const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
  destination: './uploads',
  filename:  (req, file, cb)=> {
    return cb(null,`${(file.originalname)}`);
  }
});


const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  }else{
    cb(new Error('Unsupported files'),false)
  }
}
const upload = multer({ storage: storage,
  fileFilter:fileFilter
 });

module.exports = upload;
