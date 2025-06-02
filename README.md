# 🐴 아무 말 대잔치 🎊

아무 말 대잔치 게시판은 사용자들이 게시글을 작성하고, 댓글을 달며, 좋아요를 누를 수 있는 커뮤니티 웹 애플리케이션입니다. </br>
이 프로젝트는 Node.js와 Express를 기반으로 하며, 프론트엔드와 백엔드 서버를 분리하여 개발되었습니다.

<br><br>

## ✨ 주요 기능
1. **회원가입 및 로그인**
   - 이메일과 비밀번호로 회원가입 및 로그인 가능.
   - 세션 및 쿠키를 이용한 인증 구현.
   - 이메일 형식 검증 및 비밀번호 강도 체크
   - 닉네임 중복 방지

2. **게시판 기능**
   - 게시글/댓글 작성, 수정, 삭제
   - 게시글 이미지 첨부
   - 게시물 조회수 증가
   - 게시물 좋아요 기능

3. **사용자 기능**
   - 사용자 정보 수정 (닉네임, 프로필)
   - 비밀번호 변경

<br><br>

## 🛠️ 설치 및 실행 방법

### 1. 클론 및 디렉토리 이동
```bash
git clone https://github.com/100-hours-a-week/2-jenny-kang-community-fe.git
```

```bash
cd 2-jenny-kang-community-fe
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 서버 실행
```bash
node app.js
```
또는

```bash
npm start
```
`npm start`로 실행시 **nodemon**으로 실행됩니다. 

### 4. 로컬 서버 접근
```
http://localhost:8000
```

<br><br>

## 📹 시연 영상 URL
[![유튜브시연영상](https://github.com/user-attachments/assets/c0b4af63-a4c0-460b-bfd7-98d93b8b89ba)](https://youtu.be/2SlPb8sCI58?si=F-IBYDytfuOD8AYq)

<br><br>

## 📚 기술 스택
### [백엔드](https://github.com/100-hours-a-week/2-jenny-kang-community-be)
- Node.js
- Express.js
- MySQL

### [프론트엔드](https://github.com/100-hours-a-week/2-jenny-kang-community-fe)
- HTML, CSS, JavaScript

### 기타
- Multer: 이미지 업로드
- UUID: 고유 식별자 생성
- 인증/인가: 쿠키 및 세션

<br><br>

## 📁 프로젝트 구조
```bash
2-jenny-kang-community-fe
├── README.md
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── (css 파일들)
│   ├── images
│   │   └── (fe 이미지 파일)
│   └── js
│       └── (js 파일들)
└── views
    └── (html 파일들)
```

<br><br>

## 🌐 API 명세서 
[API 명세서 링크](https://docs.google.com/spreadsheets/d/1jyLc1_qR8V3ScgSvzibsrWEKRD4dduqsSyRV_yj4774/edit?usp=sharing)

<br><br>

## 🧩 데이터베이스 ERD
![Image](https://github.com/user-attachments/assets/c88bb066-cc7e-4138-bb23-c10d72903942)

<br><br><br>

---

_Last updated: 2025-01-20_
_from-minju_
