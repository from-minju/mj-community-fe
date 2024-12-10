import { API_BASE_URL, DefaultProfileImageName } from "./config.js";
import { logout } from "./utils.js";

const loginDropdown = document.getElementById("loginDropdown");
const signupDropdown = document.getElementById("signupDropdown");
const editProfileDropdown = document.getElementById("editProfileDropdown");
const changePasswordDropdown = document.getElementById("changePasswordDropdown");
const logoutDropdown = document.getElementById("logoutDropdown");

const userProfileImage = document.getElementById("userProfileImg");



const showLoginStatusBtn = () => {
    loginDropdown.style.display = "none";
    signupDropdown.style.display = "none";

    editProfileDropdown.style.display = "block";
    changePasswordDropdown.style.display = "block";
    logoutDropdown.style.display = "block";
}

const showLogoutStatusBtn = () => {
    loginDropdown.style.display = "block";
    signupDropdown.style.display = "block";

    editProfileDropdown.style.display = "none";
    changePasswordDropdown.style.display = "none";
    logoutDropdown.style.display = "none";
}


export const fetchUserProfileDropdown = async() => {
    try{
        const API_URL = `${API_BASE_URL}/auth/check`;
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        })

        if(response.ok){
            // 로그인한 사용자임.
            const { data } = await response.json();
            userProfileImage.src = data.profileImage
              ? `${API_BASE_URL}/uploads/${data.profileImage}`
              : `${API_BASE_URL}/uploads/default-user-profile.png`;
            showLoginStatusBtn();
        }else{
            //로그인하지 않은 사용자임.
            userProfileImage.src = `${API_BASE_URL}/uploads/${DefaultProfileImageName}`;
            showLogoutStatusBtn();
        }

    }catch(error){
        console.error(error);
    }
}


/**
 * 이벤트 리스너
 */

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


document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfileDropdown();
});
