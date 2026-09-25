import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(
    process.cwd(),
    "uploads",
    "products"
);

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (_req, file, cb) => {
        const extension =
            path.extname(file.originalname);

        const name =
            path
                .basename(
                    file.originalname,
                    extension
                )
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

        const uniqueName =
            `${Date.now()}-${name}${extension}`;

        cb(null, uniqueName);
    },
});

const fileFilter: multer.Options["fileFilter"] =
    (_req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
        ];

        if (
            allowedTypes.includes(
                file.mimetype
            )
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Solo se permiten imágenes JPG, PNG, WEBP o AVIF."
                )
            );
        }
    };

export const uploadProductImage =
    multer({
        storage,
        fileFilter,
        limits: {
            fileSize:
                5 * 1024 * 1024,
        },
    });