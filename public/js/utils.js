export const enableBtn = (btn) => {
  btn.disabled = false;
  btn.style.backgroundColor = "#7f6aee";
  btn.style.cursor = "pointer";
}

export const disableBtn = (btn) => {
  btn.disabled = true;
  btn.style.backgroundColor = "#aca0eb";
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
  
