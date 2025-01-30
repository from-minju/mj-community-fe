import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// 현재 파일의 디렉토리 경로 설정 (ESM에서는 __dirname 사용 불가)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 읽기
const envConfig = dotenv.config().parsed;

if (!envConfig) {
  console.error(".env 파일을 찾을 수 없습니다.");
  process.exit(1);
}

// 변수 치환 함수: ${VAR_NAME}을 실제 값으로 변환
const resolveEnvVariables = (value, env) => {
  return value.replace(/\${(.*?)}/g, (_, varName) => env[varName] || "");
};

// 모든 값 변환
const resolvedConfig = {};
for (const [key, value] of Object.entries(envConfig)) {
  resolvedConfig[key] = resolveEnvVariables(value, envConfig);
}

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
