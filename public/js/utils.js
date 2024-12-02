export const enableBtn = (button) => {
  button.disabled = false;
  button.style.backgroundColor = "#7f6aee";
  button.style.cursor = "pointer";
}

export const disableBtn = (button) => {
  button.disabled = true;
  button.style.backgroundColor = "#aca0eb";
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
  
