const multer = require("multer");
const path = require("path");

//set where and how the file should be stored
const storage = multer.diskStorage({
    //folder where files will be saved
    destination: "uploads/",

    //rename the file with a unique  timestamp + original extension
    filename: (req, file, cb) => {
        // cb = callback function provided by Multer
        //cb(error, newfilename)
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

//multer setup with storage + file type checking
const upload = multer({
    storage,
    //allow only image files
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

        //alllowed.includes() retuens true if image type is valid
        //cb(null, true) -> accept file
        //cb(new Error(...),false) -> reject file
        allowed.includes(file.mimetype)
        ? cb(null,true)
        :cb(new Error("only image files allowed"), false);
    }
});

module.exports = upload;