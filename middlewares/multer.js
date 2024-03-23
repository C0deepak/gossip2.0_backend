import multer from "multer";

export const multerUpload = multer({
    // also a storage option but used if we have to save file locally but default it will be saved in RAM and then to cloudinary and then deleted automatically after upload
    limits: {
        fileSize: 1024 * 1024 * 5 // 5Mb
    }
})

export const singleAvatar = multerUpload.single('avatar')