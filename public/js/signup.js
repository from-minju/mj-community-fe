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
   * 유효성 검사
   */
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailValue){ return false; }

    if (emailPattern.test(emailInput.value) && checkEmailDuplicates()) {
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


  /**
   * 중복 검사
   */
  function checkEmailDuplicates() {
    //TODO: 이메일이 중복인지 아닌지 확인하는 함수 (리턴: true, false)
    return true;
  };

  function checkNicknameDuplicates() {
    //TODO: 닉네임이 중복인지 아닌지 확인하는 함수 (리턴: true, false)
    return true;
  };


  /**
   * Helper Text 업데이트
   */
  function updateEmailHelperText() {
    if (!emailInput.value.trim()){
        emailHelperText.textContent = "*이메일을 입력해주세요.";
    }else if(!checkEmailDuplicates()){
        emailHelperText.textContent = "*중복된 이메일 입니다.";
    }else if(validateEmail()){
        emailHelperText.textContent = "";
    }else{
        emailHelperText.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";
    };
  };

  function updatePasswordHelperText() {
    if (!passwordInput.value.trim()){
        passwordHelperText.textContent = "*비밀번호를 입력해주세요.";
    } else if(!validatePassword()){
        passwordHelperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    }
    else {
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
        signupBtn.disabled = false;
        signupBtn.style.backgroundColor = "#7f6aee";
    } else{
        signupBtn.disabled = true;
        signupBtn.style.backgroundColor = "#aca0eb";
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


  profileImageInput.addEventListener("change", updateProfileImagePreview);

//   signupBtn.addEventListener("click", );

//TODO: 사진 

});
