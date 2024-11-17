document.addEventListener("DOMContentLoaded", function () {

  const editPostBtn = document.getElementById("postEditBtn");
  const editCommentBtn = document.getElementById("commentEditBtn");

  const deletePostBtn = document.getElementById("postDeleteBtn");
  const deleteCommentBtn = document.getElementById("commentDeleteBtn");

  const postModalOverlay = document.getElementById("postModalOverlay");
  const commentModalOverlay = document.getElementById("commentModalOverlay");

  const closePostModalBtn = document.getElementById("closePostModal");
  const closeCommentModalBtn = document.getElementById("closeCommentModal");

  const okPostModalBtn = document.getElementById("okPostModal");
  const okCommentModalBtn = document.getElementById("okCommentModal");

  editPostBtn.addEventListener("click", function () {
    window.location.href = "/posts/post-id/edit";
  });


  // 게시물 수정
  function editPost(){

  }

  // 댓글 수정
  function editComment(){

  }

  // 게시물 삭제
  function deletePost(){
    postModalOverlay.style.display = "flex";

    closePostModalBtn.addEventListener("click", () => {postModalOverlay.style.display = "none"});

  }

  // 댓글 삭제
  function deleteComment(){
    commentModalOverlay.style.display = "flex";

    closeCommentModalBtn.addEventListener("click", () => {commentModalOverlay.style.display = "none"});
    
  }


  editPostBtn.addEventListener("click", editPost);
  editCommentBtn.addEventListener("click", editComment);

  deletePostBtn.addEventListener("click", deletePost);
  deleteCommentBtn.addEventListener("click", deleteComment);


  window.addEventListener("click", function (event) {
    // 모달 바깥 클릭 시 닫기
    if (event.target === postModalOverlay) {
      postModalOverlay.style.display = "none";
    } else if (event.target === commentModalOverlay) {
      commentModalOverlay.style.display = "none";    }
  });
});
