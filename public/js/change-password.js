document.addEventListener("DOMContentLoaded", function(){
    const passwordInput = document.getElementById("password");
    const passwordChkInput = document.getElementById("passwordChk");

    const passwordHelperText = document.getElementById("passwordHelperText");
    const passwordChkHelperText = document.getElementById("passwordChkHelperText");
  
    const editBtn = document.getElementById("submit");

    
    // 유효성 검사
    function validatePassword() {
        const passwordValue = passwordInput.value.trim()
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    
        if(!passwordValue){ return false; }
    
        if(passwordValue &&
          !passwordPattern.test(passwordInput.value)){
          return false; 
        }else {
          return true;
        }
    }
    function validatePasswordChk() {
        const pwValue = passwordInput.value.trim();
        const pwChkValue = passwordChkInput.value.trim();
    
        if(!pwChkValue){ return false; }
    
        if(pwValue === pwChkValue){
            return true;
        }else {
            return false;
        }
    }

    // Helper Text 업데이트
    function updatePasswordHelperText() {
        if (!passwordInput.value.trim()){
            passwordHelperText.textContent = "*비밀번호를 입력해주세요.";
        } else if(!validatePassword()){
            passwordHelperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
        }
        else {
            passwordHelperText.textContent = "";
        }
    }
    function updatePasswordChkHelperText() {
        const pwValue = passwordInput.value.trim();
        const pwChkValue = passwordChkInput.value.trim();
        if(!pwChkValue){
            passwordChkHelperText.textContent = "*비밀번호를 한번 더 입력해주세요."
        }else if(pwValue && !validatePasswordChk()){
            passwordChkHelperText.textContent = "*비밀번호가 다릅니다.";
        }else if(!pwValue && pwChkValue){
            passwordChkHelperText.textContent = "*비밀번호를 입력해주세요.";
        }else{
            passwordChkHelperText.textContent = "";
        }
    }

    // 비밀번호변경 버튼 활성화
    function updateEditBtn() {
        if(validatePassword() && validatePasswordChk()){
            editBtn.disabled = false;
            editBtn.style.backgroundColor = "#7f6aee";

        }else{
            editBtn.disabled = true;
            editBtn.style.backgroundColor = "#aca0eb";
        }
    }

    // 토스트메시지 띄우기
    function toastOn() {
        toastMessage.style.display = "flex";
        setTimeout(function() {
            toastMessage.style.display = "none";
        }, 1000);
    }

    // 비밀번호 변경하기
    function changePassword(event){
        event.preventDefault();
        if(!validatePassword() && !validatePasswordChk()){
            return false;
        }

        //TODO: 비밀번호 변경하기

        toastOn();
        passwordInput.value = '';
        passwordChkInput.value = '';
        editBtn.style.backgroundColor = "#aca0eb";
    }


    // Helper Text
    passwordInput.addEventListener("blur", updatePasswordHelperText);
    passwordChkInput.addEventListener("blur", updatePasswordChkHelperText);
 
    // 비밀번호수정 버튼 활성화
    passwordInput.addEventListener("input", updateEditBtn);
    passwordChkInput.addEventListener("input", updateEditBtn);

    editBtn.addEventListener("click", changePassword);

});

