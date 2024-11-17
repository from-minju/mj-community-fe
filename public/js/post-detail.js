document.addEventListener("DOMContentLoaded", function () {

  const postId = Number(window.location.pathname.split('/').pop()); //경로를 /로 나누고 배열의 맨 마지막 값(:postId)을 가져옴

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

  function formatCnt(cnt){
    if(cnt >= 1000) return `${Math.floor(cnt/1000)}k`;
    return `${cnt}`;
  }

  function displayPost(post){
    document.querySelector(".postTitle").textContent = post.title;
    document.getElementById("postWriterProfileImage").src = post.profileImg;
    document.getElementById("postWriterName").textContent = post.author;
    document.querySelector(".createdTime").textContent = post.date;
    document.querySelector(".postContent").innerHTML = post.content;
    document.querySelector(".postImage").src = post.contentImg;
    document.getElementById("likesCnt").textContent = formatCnt(post.likes);
    document.getElementById("viewsCnt").textContent = formatCnt(post.views);
    document.getElementById("commentsCnt").textContent = formatCnt(post.comments);




  }


  // 게시물 상세 내용 가져오기
  async function fetchPost() {
    try{
      /**
       * 1. 게시물 데이터 posts.json가져오기
       * 2. postId가 일치하는 데이터만 가져오기
       * 3. post html생성
       */

      const response = await fetch("../data/posts.json");
      const posts = await response.json();
      const post = posts.find(post => post.postId === postId);

      if (post) {
          console.log(post);  // 해당 게시물 데이터 출력
          displayPost(post);
          // displayReaction();
      } else {
          console.log('게시물을 찾을 수 없습니다.');
      }

    }catch(error){
      console.error(`[fetchPost Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다. `, error);
    }
  }




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


  fetchPost()

  editPostBtn.addEventListener("click", editPost);
  editCommentBtn.addEventListener("click", editComment);

  deletePostBtn.addEventListener("click", deletePost);
  deleteCommentBtn.addEventListener("click", deleteComment);

  editPostBtn.addEventListener("click", function () {
    window.location.href = "/posts/post-id/edit";
  });

  window.addEventListener("click", function (event) {
    // 모달 바깥 클릭 시 닫기
    if (event.target === postModalOverlay) {
      postModalOverlay.style.display = "none";
    } else if (event.target === commentModalOverlay) {
      commentModalOverlay.style.display = "none";    }
  });
});
