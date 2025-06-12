import { config } from "./config.js";
import { logout } from "./utils.js";

// 드롭다운 메뉴 관련 요소들
const userProfileImage = document.getElementById('userProfileImg');
const dropdown = document.getElementById('dropdown');

// 드롭다운 옵션 요소들
const loginOption = document.getElementById('loginDropdown');
const signupOption = document.getElementById('signupDropdown');
const editProfileOption = document.getElementById('editProfileDropdown');
const changePasswordOption = document.getElementById('changePasswordDropdown');
const logoutOption = document.getElementById('logoutDropdown');


const showLoginStatusBtn = () => {
    loginOption.style.display = "none";
    signupOption.style.display = "none";

    editProfileOption.style.display = "block";
    changePasswordOption.style.display = "block";
    logoutOption.style.display = "block";
}

const showLogoutStatusBtn = () => {
    loginOption.style.display = "block";
    signupOption.style.display = "block";

    editProfileOption.style.display = "none";
    changePasswordOption.style.display = "none";
    logoutOption.style.display = "none";
}


export const fetchUserProfileDropdown = async() => {
    try{
        const API_URL = `${config.API_BASE_URL}/auth/check`;
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        })

        if(response.ok){
            // 로그인한 사용자임.
            const { data } = await response.json();
            userProfileImage.src = data.profileImage
              ? `${config.API_IMAGE_URL}/${data.profileImage}`
              : config.DefaultProfileImageUrl;
            console.log(data.profileImage);
            showLoginStatusBtn();
        }else{
            //로그인하지 않은 사용자임.
            userProfileImage.src = config.DefaultProfileImageUrl;
            showLogoutStatusBtn();
        }

    }catch(error){
        console.error(error);
    }
}


/**
 * 이벤트 리스너
 */

// 드롭다운
userProfileImage.addEventListener("click", function (e) {
    e.stopPropagation();
      dropdown.classList.toggle('show');
});

// 드롭다운 외부 클릭 시 메뉴 숨기기
document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target) && e.target !== userProfileImg) {
        dropdown.classList.remove('show');
      }
});

// 드롭다운 내부 클릭 시 이벤트 전파 방지
dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
});

// 이전 페이지
// document.getElementById("headerLeft").addEventListener("click", function () {
//   history.back();
// });

  
loginDropdown.addEventListener("click", () => {
    window.location.href = '/auth/login';
});

signupDropdown.addEventListener("click", () => {
    window.location.href = '/auth/signup';
});

editProfileDropdown.addEventListener("click", () => {
    window.location.href = '/users/profile';
});

changePasswordDropdown.addEventListener("click", () => {
    window.location.href = '/users/profile/password'
})

logoutDropdown.addEventListener("click", () => {
    logout();
    window.location.href = '/';
});




// ESC 키로 드롭다운 닫기
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        dropdown.classList.remove('show');
    }
});

// 드롭다운 애니메이션 효과를 위한 추가 기능
const dropdownOptions = document.querySelectorAll('.dropdownOption');

dropdownOptions.forEach((option, index) => {
    // 드롭다운이 열릴 때 순차적으로 나타나는 효과
    option.style.transitionDelay = `${index * 0.05}s`;

    // 호버 효과 개선
    option.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px)';
    });

    option.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfileDropdown();
});