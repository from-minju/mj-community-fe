document.addEventListener("DOMContentLoaded", function () {

    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");
    
    const titleHelperText = document.getElementById("titleHelperText");
    const contentHelperText = document.getElementById("contentHelperText");

    const createPostBtn = document.getElementById("createPostBtn");

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
        if(titleInput.value.trim().length === 0){
            contentHelperText.textContent = "* 내용을 입력해 주세요.";
        }else {
            contentHelperText.textContent = "";
        };
    };

    // 모두 입력했는지 확인, 글자 수 확인 후 버튼 활성화
    function updateCreatePostBtn() {
        if(titleInput.value.trim() != "" && contentInput.value.trim() != "" && validateTitle()){
            createPostBtn.style.backgroundColor = "#7f6aee";
            createPostBtn.disabled = "false"; //버튼 활성화
        } else{
            createPostBtn.style.backgroundColor = "#aca0eb";
            createPostBtn.disabled = "true"; //버튼 비활성화 
        }
    };


    titleInput.addEventListener("input", updateTitleHelperText);
    contentInput.addEventListener("input", updateContentHelperText);

    titleInput.addEventListener("input", updateCreatePostBtn);
    contentInput.addEventListener("input", updateCreatePostBtn);

    
});

