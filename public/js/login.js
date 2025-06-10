import { config } from "./config.js";
import { enableBtn, disableBtn } from "./utils.js";

document.addEventListener("DOMContentLoaded", function(){

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const loginBtn = document.getElementById("loginBtn");
    const emailHelperText = document.getElementById("emailHelperText");
    const passwordHelperText = document.getElementById("passwordHelperText");

    // 이메일 유효성 검사 
    function validateEmail(){
        // 비어있지 않고, 이메일 형식에 맞아야 true
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailInput.value.trim() && emailPattern.test(emailInput.value.trim())){
            return true; 
        }else{
            return false;
        }
    }

    // 비밀번호 유효성 검사
    function validatePassword(){
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if(passwordInput.value.trim() && passwordPattern.test(passwordInput.value.trim())){
            return true;
        }else{
            return false;
        }
    }

    function updateEmailHelperText() {
        if(validateEmail()){
            emailHelperText.style.display = "none";
            return;
        }
        emailHelperText.style.display = "block";
        emailHelperText.innerHTML = "*올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com)";
    }

    function updatePasswordHelperText() {
        if(validatePassword()){
            passwordHelperText.style.display = "none";
            return;
        }
        passwordHelperText.style.display = "block";
        passwordHelperText.innerHTML = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    }

    function updateLoginBtn() {
        if(!emailInput.value.trim() || !passwordInput.value.trim()){
            disableBtn(loginBtn);
            return;
        }
        if(validateEmail() && validatePassword()){
            enableBtn(loginBtn);
        }else{
            disableBtn(loginBtn);
        }
    }

    async function login(){
        const API_URL = `${config.API_BASE_URL}/auth/login`;
        const loginData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        try{
            const response = await fetch(API_URL, {
                method: "POST",
                credentials: 'include', //쿠키를 포함하는 요청을 보냄
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const {message} = await response.json();

            if(response.ok){
                // alert(message);
                window.location.href = `/posts`; 
            }else if (response.status === 401){
                alert(message);
            }else{
                alert("이메일 또는 비밀번호가 틀렸습니다.");
            }

        }catch(error){
            console.error(error);
        }
    }
   
    // HelperText 업데이트
    emailInput.addEventListener("input", updateEmailHelperText);
    passwordInput.addEventListener("input", updatePasswordHelperText);

    // loginBtn 상태 업데이트 
    emailInput.addEventListener("input", updateLoginBtn);
    passwordInput.addEventListener("input", updateLoginBtn);


    loginBtn.addEventListener("click", login);

});