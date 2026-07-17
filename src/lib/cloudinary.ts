import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// ─── Upload single image ──────────────────────────────────────────────────────
export async function uploadImage(
    file: Buffer | string,
    folder: 'projects' | 'partners' | 'services' = 'projects'
): Promise<{ url: string; publicId: string }> {
    const fullFolder = `pt-tsc/${folder}`;

    return new Promise((resolve, reject) => {
        if (typeof file === 'string' && file.startsWith('data:')) {
            // base64 string (dari frontend)
            cloudinary.uploader
                .upload(file, {
                    folder: fullFolder,
                    resource_type: 'image',
                    format: 'webp',
                    quality: 'auto:good',
                    transformation: [{ width: 1920, crop: 'limit' }],
                })
                .then((result) =>
                    resolve({ url: result.secure_url, publicId: result.public_id })
                )
                .catch(reject);
        } else {
            // Buffer (dari server)
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: fullFolder,
                    resource_type: 'image',
                    format: 'webp',
                    quality: 'auto:good',
                    transformation: [{ width: 1920, crop: 'limit' }],
                },
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve({ url: result.secure_url, publicId: result.public_id });
                }
            );
            stream.end(file as Buffer);
        }
    });
}

// ─── Upload multiple images ───────────────────────────────────────────────────
export async function uploadImages(
    files: (Buffer | string)[],
    folder: 'projects' | 'partners' | 'services' = 'projects'
): Promise<{ url: string; publicId: string }[]> {
    return Promise.all(files.map((file) => uploadImage(file, folder)));
}

// ─── Delete image by publicId ─────────────────────────────────────────────────
export async function deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
}

// ─── Extract publicId dari Cloudinary URL ────────────────────────────────────
export function extractPublicId(url: string): string {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return '';
    const afterUpload = parts.slice(uploadIndex + 1);
    if (afterUpload[0]?.startsWith('v')) afterUpload.shift();
    return afterUpload.join('/').replace(/\.[^/.]+$/, '');
}