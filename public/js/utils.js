
export const enableBtn = (button) => {
  button.disabled = false;
  button.style.backgroundColor = "#7f6aee";
  button.style.cursor = "pointer";
}

export const disableBtn = (button) => {
  button.disabled = true;
  button.style.backgroundColor = "#aca0eb";
}

export const checkAuthentication = async() => {
    try {
        const response = await fetch(`http://localhost:3000/auth/check`, {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });

        if(!response.ok){
            const {message} = await response.json();
            alert(message);
            window.location.href = '/';
            return;
        }
  
        const { data } = await response.json();
        return data;

      } catch (error) {
        console.error(error);
        window.location.href = "/"; 
      }
}


// export const enableBtn = () => {
//     createOrEditCommentBtn.disabled = false;
//     createOrEditCommentBtn.style.backgroundColor = "#7f6aee";
//     createOrEditCommentBtn.style.cursor = "pointer";
//   }
  
//   export const disableBtn = () => {
//     createOrEditCommentBtn.disabled = true;
//     createOrEditCommentBtn.style.backgroundColor = "#aca0eb";
//   }
  
