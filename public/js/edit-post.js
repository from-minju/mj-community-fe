document.addEventListener("DOMContentLoaded", function () {
    const postId = window.location.pathname.split("/")[2]; 

    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    
    const titleHelperText = document.getElementById("titleHelperText");
    const contentHelperText = document.getElementById("contentHelperText");

    const editPostBtn = document.getElementById("editPostBtn");

    const TITLE_MAX = 26;


    function validateTitle() {
        if(titleInput.value.trim().length > TITLE_MAX){
            return false;
        }else{
            return true;
        }
    };

    function updateTitleHelperText() {
        if(!validateTitle()){
            titleHelperText.textContent = `* 제목은 ${TITLE_MAX}자를 초과할 수 없습니다.`;
        }else if(titleInput.value.trim().length === 0){
            titleHelperText.textContent = "* 제목을 입력해 주세요.";
        }else {
            titleHelperText.textContent = "";
        };
    };

    function updateContentHelperText() {
        if(contentInput.value.trim().length === 0){
            contentHelperText.textContent = "* 내용을 입력해 주세요.";
        }else {
            contentHelperText.textContent = "";
        };
    };

    // 모두 입력했는지 확인, 글자 수 확인 후 버튼 활성화
    function updateEditPostBtn() {
        if(titleInput.value.trim() != "" && contentInput.value.trim() != "" && validateTitle()){
            editPostBtn.style.backgroundColor = "#7f6aee";
            editPostBtn.disabled = false; //버튼 활성화

        } else{
            editPostBtn.style.backgroundColor = "#aca0eb";
            editPostBtn.disabled = true; //버튼 비활성화 
        }
    };

    function displayPostDetail(post) {
        titleInput.value = post.title;
        contentInput.value = post.content;
        // TODO: 이미지 가져와 띄우기
        if(post.postImage){
            document.getElementById("postWriteImage").src = post.postImage;
        }else{
        
        }
    }

    async function fetchPostDetail() {
        // TODO: 인증
        try{
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: "GET",
            });

            if (!response.ok){
                const {message} = await response.json();
                throw new Error(`Error ${response.status}: ${message || 'Unknown error'}`);
            }
        
            const {data: post} = await response.json();
            displayPostDetail(post);

        }catch(error){
            console.error(`[fetchPostDetail Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다.`, error);
        }
    }


    async function editPost() {
        try{
            const API_URL = `http://localhost:3000/posts/${postId}`;
            const postData = {
                title: titleInput.value.trim(),
                content: contentInput.value.trim(),
                postImage: ""  // TODO:
            }

            const response = await fetch(API_URL, {
                method: "PUT",
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData), 
            });

            const { message } = await response.json();

            if (response.ok) {
                console.log(message);
                window.location.href = `/posts/${postId}`;

                // 수정된 게시물이 정상적으로 수정되었으면 /posts/:postId로 리다이렉트
            } else {
                // 에러 응답인 경우
                throw new Error(`게시물 수정 실패: ${message || '알 수 없는 오류'}`);
            }



        }catch(error){
            console.error(`게시물 수정 실패`, error);
        }


    }


    fetchPostDetail(); //TODO: 게시물 수정


    titleInput.addEventListener("input", updateTitleHelperText);
    contentInput.addEventListener("input", updateContentHelperText);

    titleInput.addEventListener("input", updateEditPostBtn);
    contentInput.addEventListener("input", updateEditPostBtn);

    editPostBtn.addEventListener("click", editPost);


    
});

