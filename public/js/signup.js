import { enableBtn, disableBtn } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordChkInput = document.getElementById("passwordChk");
  const nicknameInput = document.getElementById("nickname");

  const emailHelperText = document.getElementById("emailHelperText");
  const passwordHelperText = document.getElementById("passwordHelperText");
  const passwordChkHelperText = document.getElementById("passwordChkHelperText");
  const nicknameHelperText = document.getElementById("nicknameHelperText");
  const profileImageHelperText = document.getElementById("profileImageHelperText");

  const profileImageInput = document.getElementById("profileImage");

  const signupBtn = document.getElementById("signupBtn");


    /**
   * 중복 검사
   */
    async function isEmailDuplicates() {
      const API_URL = `http://localhost:3000/users/check-email`;
      const checkEmailData = {
        email: emailInput.value.trim()
      };
  
      try{
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkEmailData)
        });
        const data = await response.json();
  
        return data.isDuplicate;
        
      }catch(error){
        console.error(error);
      }
    };
  
    async function isNicknameDuplicates() {
      const API_URL = `http://localhost:3000/users/check-nickname`;
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

    
  /**
   * 유효성 검사
   */
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailValue){ return false; }

    if (emailPattern.test(emailInput.value)) {
      return true;
    } else {
      return false;
    }
  };

  function validatePassword() {
    const passwordValue = passwordInput.value.trim()
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if(!passwordValue){ return false; }

    if (passwordValue && !passwordPattern.test(passwordInput.value)) {
      return false; //유효하지 않음
    } 

    return true; //유효함
    
  };

  function validatePasswordChk() {
    const pwValue = passwordInput.value.trim();
    const pwChkValue = passwordChkInput.value.trim();

    if(!pwChkValue){ return false; }

    if(pwValue === pwChkValue){
        return true;
    }else {
        return false;
    }
  };

  function validateNickname() {
    const nicknameValue = nicknameInput.value.trim();
    const spaceChkPattern = /\s/g;

    if(!nicknameValue){return false;}

    if(nicknameValue && 
        (nicknameValue.length <= 10) && 
        !spaceChkPattern.test(nicknameValue) &&
        !isNicknameDuplicates()){ //TODO: await문제같기도
        return true;
    }
    return false;
  };




  /**
   * Helper Text 업데이트
   */
  async function updateEmailHelperText() {
    if(!emailInput.value.trim()){
      emailHelperText.textContent = "*이메일을 입력해주세요.";
      return;
    }

    if(!validateEmail()){
      emailHelperText.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";
      return;
    }

    const isDuplicate = await isEmailDuplicates();
    if(isDuplicate){
      emailHelperText.textContent = "*중복된 이메일 입니다.";
      return;
    }

    emailHelperText.textContent = "";
  };

  function updatePasswordHelperText() {
    if (!passwordInput.value.trim()){
        passwordHelperText.textContent = "*비밀번호를 입력해주세요.";
    } else if(!validatePassword()){
        passwordHelperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    }else {
        passwordHelperText.textContent = "";
    }
  };
  
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

  function updateProfileImageHelperText() {
    if(!profileImageInput.value){
        profileImageHelperText.textContent = "*프로필 사진을 추가해주세요.";
    }else{
        profileImageHelperText.textContent = "";
    }
  };


  // 회원가입 버튼 활성화 
  function updateSignupBtn (){
    if(validateEmail() && validatePassword() && validatePasswordChk() && validateNickname()){
      enableBtn(signupBtn);
    } else{
      disableBtn(signupBtn);
    }
  };


  // 프로필 이미지 띄우기 
  function updateProfileImagePreview(event) {
    const file = event.target.files[0];
    const profileImagePreview = document.getElementById("profileImagePreview");

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            profileImagePreview.src = e.target.result;
            profileImagePreview.style.display = "block";
        };

        reader.readAsDataURL(file);
    }else {
        profileImagePreview.src = null;
        profileImagePreview.style.display = "none";
    }
  };

  async function signup() {
    if(await isEmailDuplicates() || await isNicknameDuplicates()){
      alert("회원가입 실패: 다시 시도해주세요.")
      return;
    }

    const API_URL = `http://localhost:3000/auth/signup`;
    const signupData = new FormData();
    signupData.append('email', emailInput.value.trim());
    signupData.append('password', passwordInput.value.trim());
    signupData.append('nickname', nicknameInput.value.trim());

    if (profileImageInput.files[0]) {
        signupData.append('profileImage', profileImageInput.files[0]);
    }

    try{
      const response = await fetch(API_URL, {
        method: "POST",
        body: signupData
      });

      const {message} = await response.json();
      if(response.ok){
        alert(message);
        window.location.href = `http://localhost:8000/auth/login`; 
      }else{
        alert(message);
      }

    }catch(error){
      console.error(error);
    }
  }


  // Helper Text
  emailInput.addEventListener("blur", updateEmailHelperText);
  passwordInput.addEventListener("blur", updatePasswordHelperText);
  passwordChkInput.addEventListener("blur", updatePasswordChkHelperText);
  nicknameInput.addEventListener("blur", updateNicknameHelperText);
  profileImageInput.addEventListener("change", updateProfileImageHelperText);

  // 회원가입 버튼 활성화
  emailInput.addEventListener("input", updateSignupBtn);
  passwordInput.addEventListener("input", updateSignupBtn);
  passwordChkInput.addEventListener("input", updateSignupBtn);
  nicknameInput.addEventListener("input", updateSignupBtn);

  profileImageInput.addEventListener("change", profileImage);
  profileImageInput.addEventListener("change", updateProfileImagePreview);

  signupBtn.addEventListener("click", signup);

//TODO: 사진 

});
