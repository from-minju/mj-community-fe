import { API_BASE_URL } from "./config.js";
import { fetchUserProfileDropdown } from "./dropdown.js";
import { disableBtn, enableBtn, getCurrentUser } from "./utils.js";

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

    

    async function isNewNicknameDuplicates() {
        const API_URL = `${API_BASE_URL}/users/check-nickname`;
        const checkNicknameData = {
          nickname: nicknameInput.value.trim()
        };
    
        try{
          const response = await fetch(API_URL, {
            method: "POST",
            credentials: "include",
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
        const isNicknameDuplicatesResult = await isNewNicknameDuplicates();
    
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
    
        const isDuplicate = await isNewNicknameDuplicates();
        if(isDuplicate){
          nicknameHelperText.textContent = "*중복된 닉네임 입니다.";
          return;
        }
    
        nicknameHelperText.textContent = "";
    };

    async function updateEditBtn() {
        const isNicknameValidates = await validateNickname();

        if(isNicknameValidates){
            enableBtn(editBtn);
        }else{
            disableBtn(editBtn);
        }
    }


    function toastOn() {
        toastMessage.style.display = "flex";
        setTimeout(function() {
            toastMessage.style.display = "none";
        }, 1500);
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
    async function editProfile(){
        const API_URL = `${API_BASE_URL}/users/profile`;
        const editedUserData = new FormData();
        editedUserData.append('nickname', nicknameInput.value.trim());

        if(profileImageInput.files[0]){
            editedUserData.append('profileImage', profileImageInput.files[0]);
        }

        try{

            if(! await validateNickname()){
                return;
            }

            const response = await fetch(API_URL, {
                method: "PUT",
                credentials: 'include',
                body: editedUserData,
            })

            if(!response.ok){
                alert("회원정보 수정에 실패하였습니다.");
            }

            toastOn();
            fetchUserInfo();
            fetchUserProfileDropdown();

        }catch(error){
            console.error(error);
        }
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
    nicknameInput.addEventListener("input", updateNicknameHelperText);

    // 수정 버튼 활성화
    profileImageInput.addEventListener("change", updateEditBtn);
    nicknameInput.addEventListener("input", updateEditBtn);

    // 프로필 수정
    editBtn.addEventListener("click", editProfile);

});

