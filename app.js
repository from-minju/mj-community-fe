import express from 'express';

// ESM 방식에서 __dirname을 얻는 방법
import { fileURLToPath } from 'url';
import path from 'path';
import { config } from './public/js/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// 미들웨어: 로그인 여부 확인
const checkAuth = async (req, res, next) => {
    try {
        const API_URL = `http://${config.HOST}:${config.BE_PORT}/api/auth/check`; 
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include', // 쿠키 포함
            headers: {
                'Cookie': req.headers.cookie // 서버-서버 간 요청에서는 수동으로 쿠키를 전달해야 한다.
            }
        });

        if (!response.ok) {
            return res.redirect('/auth/login'); // 인증 실패 시 로그인 페이지로 리다이렉트
        }

        next();
        
    } catch (error) {
        console.error(`[checkAuth Error] 로그인여부 확인 실패`, error);
        return res.redirect('/auth/login'); // 오류 시 로그인 페이지로 리다이렉트
    }
};


// 라우팅 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/auth/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/users/profile', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-profile.html'));
});

app.get('/users/profile/password', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'change-password.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/posts/create', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'create-post.html'));
});

app.get('/posts/:postId', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'post-detail.html'));
});

app.get('/posts/:postId/edit', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-post.html'));
});



// 서버 시작
app.listen(config.PORT, () => {
    console.log(`Server is running at http://${config.HOST}:${config.PORT}`);
});