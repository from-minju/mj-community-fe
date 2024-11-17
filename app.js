import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// ESM 방식에서 __dirname을 얻는 방법
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));


// 라우팅 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bookmarks.html'));
});

app.get('/auth/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/users/user-id/edit-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-profile.html'));
});

app.get('/users/user-id/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'change-password.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/posts/:postId', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'post-detail.html'));
});

app.get('/posts/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'create-post.html'));
});

app.get('/posts/post-id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-post.html'));
});



// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});