import { config } from "./config.js";
import { checkAuthAndRedirect, disableBtn, enableBtn } from "./utils.js";

checkAuthAndRedirect();

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
            enableBtn(editBtn);

        }else{
            disableBtn(editBtn);
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
    async function changePassword(){
        if(!validatePassword() && !validatePasswordChk()){
            return false;
        }

        const API_URL = `${config.API_BASE_URL}/users/profile/password`;
        const newPasswordData = {
            password: passwordInput.value.trim()
        }

        try{
            const response = await fetch(API_URL, {
                method: "PATCH",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPasswordData)
            });
            
            const {message} = await response.json();

            if(response.ok){
                toastOn();
            }else{
                alert(message);
            }

            passwordInput.value = '';
            passwordChkInput.value = '';
            disableBtn(editBtn);
        }catch(error){

        }
        
    }

    // Helper Text
    passwordInput.addEventListener("input", updatePasswordHelperText);
    passwordChkInput.addEventListener("input", updatePasswordChkHelperText);
 
    // 비밀번호수정 버튼 활성화
    passwordInput.addEventListener("input", updateEditBtn);
    passwordChkInput.addEventListener("input", updateEditBtn);

    editBtn.addEventListener("click", changePassword);

});

