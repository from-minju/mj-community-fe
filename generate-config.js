import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// 현재 파일의 디렉토리 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일을 명시적으로 로드
dotenv.config({ path: path.join(__dirname, ".env") });

// 환경 변수를 객체로 저장
const resolvedConfig = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    BE_PORT: process.env.BE_PORT,
    API_BASE_URL: `http://${process.env.HOST}:${process.env.BE_PORT}/api`,
    API_IMAGE_URL: `${process.env.API_IMAGE_URL}`,
    DefaultProfileImageUrl: process.env.DEFAULT_PROFILE_IMAGE_URL
};

// 저장할 경로 설정
const configPath = path.join(__dirname, "public/js/config.js");

// JavaScript 파일 내용 생성
const configJsContent = `export const config = ${JSON.stringify(resolvedConfig, null, 2)};`;

// 파일 생성 (덮어쓰기)
try {
  await fs.writeFile(configPath, configJsContent, "utf8");
  console.log(`✅ config.js 파일이 생성되었습니다: ${configPath}`);
} catch (error) {
  console.error("❌ config.js 생성 중 오류 발생:", error);
}
