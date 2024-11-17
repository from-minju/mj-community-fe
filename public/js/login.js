document.addEventListener("DOMContentLoaded", function(){

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const loginBtn = document.getElementById("loginBtn");
    const emailHelperText = document.getElementById("emailHelperText");
    const passwordHelperText = document.getElementById("passwordHelperText");

    // 이메일 유효성 검사 
    function validateEmail(){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailInput.value.trim() && !emailPattern.test(emailInput.value)){
            return false; //유효하지 않음
        }else{
            return true; //유효함
        }
    }

    // 비밀번호 유효성 검사
    function validatePassword(){
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if(passwordInput.value.trim() && !passwordPattern.test(passwordInput.value)){
            return false; //유효하지 않음
        }else{
            return true; //유효함
        }
    }

    emailInput.addEventListener('input', function() {
        if(validateEmail()){
            emailHelperText.style.display = "none";
        } else{
            emailHelperText.style.display = "block";
            emailHelperText.innerHTML = "*올바른 이메일 주소 형식을 입력해주세요.</br>(예: example@example.com)";
        };
    });

    passwordInput.addEventListener('input', function() {
        if(validatePassword()){
            passwordHelperText.style.display = "none";
        } else{
            passwordHelperText.style.display = "block";
            passwordHelperText.innerHTML = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
        };
    });

    loginBtn.addEventListener("click", function(event) {
        if(!emailInput.value.trim()){
            event.preventDefault();
            emailHelperText.style.display = "block";
            emailHelperText.innerHTML = "*이메일을 입력해주세요.";
            return;
        }

        if(!passwordInput.value.trim()){
            event.preventDefault();
            passwordHelperText.style.display = "block";
            passwordHelperText.innerHTML = "*비밀번호를 입력해주세요.";
            return;
        }

        if(validateEmail() && validatePassword()){
            event.preventDefault();
            loginBtn.style.backgroundColor = "#7f6aee";
            setTimeout(() => {
                window.location.href = "/posts"; 
            },3000);
        }else{
            event.preventDefault();
            passwordHelperText.innerHTML = "*비밀번호가 다릅니다."
        }

    });

});