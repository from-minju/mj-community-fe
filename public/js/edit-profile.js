document.addEventListener("DOMContentLoaded", function(){
    
    const deleteAccountBtn = document.getElementById("deleteAccountBtn");
    const closeModalBtn = document.getElementById("closeModal");
    const okModalBtn = document.getElementById("okModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const nicknameInput = document.getElementById("nickname");
    const toastMessage = document.getElementById("toastMessage");
    const editBtn = document.getElementById("submit");

    const profileImageInput = document.getElementById("profileImage");

    const nicknameHelperText = document.getElementById("nicknameHelperText");

    


    // 닉네임 중복 검사 
    function checkNicknameDuplicates() {
        //TODO: 닉네임이 중복인지 아닌지 확인하는 함수 (리턴: true, false)
        return true;
    };

    // 닉네임 유효성 검사
    function validateNickname() {
        const nicknameValue = nicknameInput.value.trim();
        const spaceChkPattern = /\s/g;
    
        // TODO: 닉네임 유효성 중복 검사
    
        if(!nicknameValue){return false;}
    
        if(nicknameValue && 
            (nicknameValue.length <= 10) && 
            !spaceChkPattern.test(nicknameValue) &&
            checkNicknameDuplicates()){
            return true;
        }
        return false;
    };

    function updateNicknameHelperText() {
        const nicknameValue = nicknameInput.value.trim();
        const spaceChkPattern = /\s/g;
    
        if(!nicknameValue){
            nicknameHelperText.textContent = "*닉네임을 입력해주세요.";
        }else if(spaceChkPattern.test(nicknameValue)){
            nicknameHelperText.textContent = "*띄어쓰기를 없애주세요.";
        }else if(nicknameValue.length > 10){
            nicknameHelperText.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
        }else if(!checkNicknameDuplicates){ 
            // TODO: 닉네임 중복 검사
            nicknameHelperText.textContent = "*중복된 닉네임 입니다.";
        }else{
            nicknameHelperText.textContent = "";
        }
    };

    // 토스트메시지 띄우기
    function toastOn() {
        toastMessage.style.display = "flex";
        setTimeout(function() {
            toastMessage.style.display = "none";
        }, 1000);
    }

    // 프로필 이미지 띄우기
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

    // 수정 
    function editProfile(event){
        event.preventDefault();
        if(validateNickname()){
            toastOn();
        }else{
            console.log("수정할 수 없습니다.")
        };

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





    profileImageInput.addEventListener("change", updateProfileImagePreview);
    nicknameInput.addEventListener("blur", updateNicknameHelperText);
    editBtn.addEventListener("click", editProfile);

});

