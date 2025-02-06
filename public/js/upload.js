import { config } from "./config.js";

export async function uploadImageToS3(file) {
    try{
        const fileName = encodeURIComponent(file.name);
        const fileType = file.type;

        // Presigned URL 요청
        const API_URL = `${config.API_BASE_URL}/presigned-url?fileName=${fileName}&fileType=${fileType}`;
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        });

        if(!response.ok) throw new Error('Presigned URL 요청 실패');

        const { presignedUrl, filePath } = await response.json();

        // Presigned URL을 사용해 S3에 직접 업로드
        await fetch(presignedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': fileType },
            body: file
        });

        return filePath

    } catch{
        console.error('S3 업로드 실패:', error);
        return null;
    }
}