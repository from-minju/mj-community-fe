import { API_BASE_URL } from "./config.js";
import { disableBtn, enableBtn, getCurrentUser } from "./utils.js";
// import { updateNicknameHelperText } from "./validation.js";

document.addEventListener("DOMContentLoaded", function(){

    
    const deleteAccountBtn = document.getElementById("deleteAccountBtn");
    const closeModalBtn = document.getElementById("closeModal");
    const okModalBtn = document.getElementById("okModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const email = document.getElementById("email");
    const nicknameInput = document.getElementById("nickname");
    const profileImagePreview = document.getElementById("profileImagePreview");
    const toastMessage = document.getElementById("toastMessage");
    const editBtn = document.getElementById("submit");

    const profileImageInput = document.getElementById("profileImage");

    const nicknameHelperText = document.getElementById("nicknameHelperText");

    

    async function isNicknameDuplicates() {
        const API_URL = `${API_BASE_URL}/users/check-nickname`;
        const checkNicknameData = {
          nickname: nicknameInput.value.trim()
        };
    
        try{
          const response = await fetch(API_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkNicknameData)
          });
          const data = await response.json();
    
          return data.isDuplicate;
          
        }catch(error){
          console.error(error);
        }
    };

    async function validateNickname() {
        const nicknameValue = nicknameInput.value.trim();
        const spaceChkPattern = /\s/g;
        
        const hasSpacesResult = spaceChkPattern.test(nicknameValue)
        const isNicknameDuplicatesResult = await isNicknameDuplicates();
    
        if(!nicknameValue){return false;}
    
        if(nicknameValue && 
            nicknameValue.length <= 10 && 
            ! hasSpacesResult &&
            ! isNicknameDuplicatesResult ){ //TODO: await문제같기도
            return true;
        }
        
        return false;
    };

    async function updateNicknameHelperText() {
        const nicknameValue = nicknameInput.value.trim();
        const spaceChkPattern = /\s/g;
    
        if(!nicknameValue){
          nicknameHelperText.textContent = "*닉네임을 입력해주세요.";
          return;
        }
    
        if(spaceChkPattern.test(nicknameValue)){
          nicknameHelperText.textContent = "*띄어쓰기를 없애주세요.";
          return;
        }
    
        if(nicknameValue.length > 10){
          nicknameHelperText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
          return;
        }
    
        const isDuplicate = await isNicknameDuplicates();
        if(isDuplicate){
          nicknameHelperText.textContent = "*중복된 닉네임 입니다.";
          return;
        }
    
        nicknameHelperText.textContent = "";
    };

    async function updateEditBtn() {
        const isNicknameValidates = await validateNickname();
        
        if(isNicknameValidates){
            console.log("버튼 활성화!")
            enableBtn(editBtn);
        }else{
            console.log("버튼 비활성화!")
            disableBtn(editBtn);
        }
    }


    function toastOn() {
        toastMessage.style.display = "flex";
        setTimeout(function() {
            toastMessage.style.display = "none";
        }, 1000);
    }

    function updateProfileImagePreview(event) {
        const file = event.target.files[0];
        const profileImagePreview = document.getElementById("profileImagePreview");

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                profileImagePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }else {
            profileImagePreview.src = null;
        }
    };

    // 프로필 수정 
    function editProfile(event){
        event.preventDefault();
        if(validateNickname()){
            toastOn();
        }else{
            console.log("수정할 수 없습니다.")
        };

        fetchUserInfo();

        // 수정한 후, 헤더 프로필 이미지 업데이트
    }

    async function fetchUserInfo() {
        const user = await getCurrentUser();

        email.textContent = user.email;
        nicknameInput.value = user.nickname;
        profileImagePreview.src = `${API_BASE_URL}/uploads/${user.profileImage}`;
    }

    /**
     * 모달창
     */
    deleteAccountBtn.addEventListener("click", function() {
        modalOverlay.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", function() {
        modalOverlay.style.display = "none";
    });

    okModalBtn.addEventListener("click", function() {
        window.location.href = '/auth/login';
    });

    // 모달 밖을 클릭하면 닫히도록 설정
    window.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = "none";
        }
    });

    

    fetchUserInfo();

    //Helper Text
    profileImageInput.addEventListener("change", updateProfileImagePreview);
    nicknameInput.addEventListener("blur", updateNicknameHelperText);

    // 수정 버튼 활성화
    nicknameInput.addEventListener("input", updateEditBtn);

    // 프로필 수정
    editBtn.addEventListener("click", editProfile);

});

