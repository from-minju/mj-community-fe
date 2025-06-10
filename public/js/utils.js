import { config } from "./config.js";

export const enableBtn = (button) => {
  button.disabled = false;
  button.style.backgroundColor = "#97D2FD";
  button.style.cursor = "pointer";
}

export const disableBtn = (button) => {
  button.disabled = true;
  button.style.backgroundColor = "#8fc1e5ff";
}

export const getFilePath = (fileName) => {
    return `${config.API_IMAGE_URL}/${fileName}`;
}

export const getCurrentUser = async() => {
    try {
        const API_URL = `${config.API_BASE_URL}/auth/check`
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
        window.location.href = '/auth/login';
        return;
    }
}

export const logout = async() => {
    try{
        const API_URL = `${config.API_BASE_URL}/auth/logout`
        const response = await fetch(API_URL, {
            method: 'POST',
            credentials: 'include',
        })

        if(!response.ok){
            alert("로그아웃 실패");
            return;
        }

        const {message} = await response.json();
    }catch(error){
        console.error(error);
    }
}