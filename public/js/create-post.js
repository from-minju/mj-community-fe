import { config } from "./config.js";
import { checkAuthAndRedirect, disableBtn, enableBtn } from "./utils.js";
import { CONTENT_MAX, TITLE_MAX, validatePostContent, validateTitle } from "./validation.js";

checkAuthAndRedirect();

document.addEventListener("DOMContentLoaded", function () {

    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    
    const titleHelperText = document.getElementById("titleHelperText");
    const contentHelperText = document.getElementById("contentHelperText");

    const postImageInput = document.getElementById("postWriteImage");
    const createPostBtn = document.getElementById("createPostBtn");



    function updateTitleHelperText() {
        if(!validateTitle(titleInput.value)){
            titleHelperText.textContent = `* 제목은 ${TITLE_MAX}자를 초과할 수 없습니다.`;
        }else if(titleInput.value.trim().length === 0){
            titleHelperText.textContent = "* 제목을 입력해 주세요.";
        }else {
            titleHelperText.textContent = "";
        };
    };

    function updateContentHelperText() {
        if(!validatePostContent(contentInput.value)){
            contentHelperText.textContent = `* 내용은 ${CONTENT_MAX}자를 초과할 수 없습니다.`;
        }else if(contentInput.value.trim().length === 0){
            contentHelperText.textContent = "* 내용을 입력해 주세요.";
        }else {
            contentHelperText.textContent = "";
        };
    };


    function updateCreatePostBtn() {
        if(titleInput.value.trim() != "" && contentInput.value.trim() != "" 
            && validateTitle(titleInput.value) && validatePostContent(contentInput.value)){
            enableBtn(createPostBtn);
        } else{
            disableBtn(createPostBtn);
        }
    };


    async function createPost() {
        const API_URL = `${config.API_BASE_URL}/posts`;
        const postData = new FormData();
        postData.append('title', titleInput.value.trim());
        postData.append('content', contentInput.value.trim());

        if(postImageInput.files[0]){
            postData.append('postImage', postImageInput.files[0]);
        }

        try{
            const response = await fetch(API_URL, {
                method: "POST",
                credentials: "include",
                body: postData
            });

            if(!response.ok){
                const {message} = await response.json();
                throw new Error(`Error ${response.status}: ${message || 'Unknown error'}`);
            }

            const {data: data} = await response.json();
            const newPostId = data.postId;

            window.location.href = `/posts/${newPostId}`; 

        }catch(error){
            console.error('게시물 작성 실패');
        }
    };




    titleInput.addEventListener("input", updateTitleHelperText);
    contentInput.addEventListener("input", updateContentHelperText);

    titleInput.addEventListener("input", updateCreatePostBtn);
    contentInput.addEventListener("input", updateCreatePostBtn);

    createPostBtn.addEventListener("click", createPost);
    
});

