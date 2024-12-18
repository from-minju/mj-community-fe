import { API_BASE_URL, API_IMAGE_URL } from "./config.js";

export const enableBtn = (button) => {
  button.disabled = false;
  button.style.backgroundColor = "#7f6aee";
  button.style.cursor = "pointer";
}

export const disableBtn = (button) => {
  button.disabled = true;
  button.style.backgroundColor = "#aca0eb";
}

export const getCurrentUser = async() => {
    try {
        const API_URL = `${API_BASE_URL}/auth/check`
        const response = await fetch(API_URL, {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });

        if(!response.ok){
            return false;
        }
  
        const { data: user } = await response.json();
        return user;

      } catch (error) {
        console.error(error);
      }
}

export const checkAuthAndRedirect = async() => {
    const user = await getCurrentUser();

    if(user){
        return user;
    }else{
        alert("로그인이 필요합니다.");
        window.location.href = '/auth/login';
        return;
    }
}


export const logout = async() => {
    try{
        const API_URL = `${API_BASE_URL}/auth/logout`
        const response = await fetch(API_URL, {
            method: 'POST',
            credentials: 'include',
        })

        if(!response.ok){
            alert("로그아웃 실패");
            return;
        }

        const {message} = await response.json();
        alert(message);
    }catch(error){
        console.error(error);
    }
}

export const getFilePath = (fileName) => {
    return `${API_IMAGE_URL}/${fileName}`;
  }