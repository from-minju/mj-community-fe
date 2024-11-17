document.addEventListener("DOMContentLoaded", function () {
  const postId = Number(window.location.pathname.split("/").pop()); //경로를 /로 나누고 배열의 맨 마지막 값(:postId)을 가져옴

  const editPostBtn = document.getElementById("postEditBtn");
  const editCommentBtn = document.getElementById("editCommentBtn");

  const deletePostBtn = document.getElementById("postDeleteBtn");
  const deleteCommentBtn = document.getElementById("deleteCommentBtn");

  const postModalOverlay = document.getElementById("postModalOverlay");
  const commentModalOverlay = document.getElementById("commentModalOverlay");

  const closePostModalBtn = document.getElementById("closePostModal");
  const closeCommentModalBtn = document.getElementById("closeCommentModal");

  const okPostModalBtn = document.getElementById("okPostModal");
  const okCommentModalBtn = document.getElementById("okCommentModal");

  // 게시물 수정
  function editPost() {
    //TODO: 
    window.location.href = "/posts/post-id/edit";
  }

  // 댓글 수정
  function editComment() {
    //TODO: 
    console.log("댓글 수정 버튼 클릭함")
  }

  // 게시물 삭제
  function deletePost() {
    postModalOverlay.style.display = "flex";
    closePostModalBtn.addEventListener("click", () => {
      postModalOverlay.style.display = "none";
    });
  }

  // 댓글 삭제
  function deleteComment() {
    commentModalOverlay.style.display = "flex";
    closeCommentModalBtn.addEventListener("click", () => {
      commentModalOverlay.style.display = "none";
    });
  }

  function formatCnt(cnt) {
    if (cnt >= 1000) return `${Math.floor(cnt / 1000)}k`;
    return `${cnt}`;
  }

  function displayPost(post) {
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

  function displayComments(comments) {
    const commentsContainer = document.querySelector(".commentsContainer");
    commentsContainer.innerHTML = "";

    //HTML 생성
    comments.forEach((comment) => {
      const commentContainer = document.createElement("div");
      commentContainer.className = "commentContainer";

      const metaContainer = document.createElement("div");
      metaContainer.className = "metaContainer";

      const commentContent = document.createElement("div");
      commentContent.className = "commentContent";

      const metaLeftContainer = document.createElement("div");
      metaLeftContainer.className = "metaLeftContainer";

      const editRemoveBtnContainer = document.createElement("div");
      editRemoveBtnContainer.className = "editRemoveBtnContainer";

      const writerArea = document.createElement("div");
      writerArea.className = "writerArea";

      const createdTime = document.createElement("div");
      createdTime.className = "createdTime";

      const userProfile = document.createElement("img");
      userProfile.className = "userProfile";

      const writerName = document.createElement("p");
      writerName.className = "writerName";

      const editCommentBtn = document.createElement("button");
      editCommentBtn.className = "editRemoveBtn";

      const deleteCommentBtn = document.createElement("button");
      deleteCommentBtn.className = "editRemoveBtn";

      // 컨테이너 구성하기
      userProfile.src = comment.profileImg;
      writerName.textContent = comment.author;
      createdTime.textContent = comment.createdAt;
      commentContent.innerHTML = comment.content;
      editCommentBtn.textContent = "수정";
      deleteCommentBtn.textContent = "삭제";

      writerArea.append(userProfile, writerName);
      metaLeftContainer.append(writerArea, createdTime);
      editRemoveBtnContainer.append(editCommentBtn, deleteCommentBtn);
      metaContainer.append(metaLeftContainer, editRemoveBtnContainer);
      commentContainer.append(metaContainer, commentContent);
      commentsContainer.append(commentContainer);

      editCommentBtn.addEventListener("click", editComment);
      deleteCommentBtn.addEventListener("click", deleteComment);

    });


  }

  // 게시물 상세 내용 가져오기
  async function fetchPost() {
    try {
      const response = await fetch("../data/posts.json");
      const posts = await response.json();
      const post = posts.find((post) => post.postId === postId);

      if(post){
        displayPost(post);
      }else {
        console.log("게시물을 찾을 수 없습니다.");
      }
    }catch (error) {
      console.error(`[fetchPost Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다.`, error);
    }
  }

  // 댓글 가져오기
  async function fetchComments() {
    try {
      const response = await fetch("../data/comments.json");
      const data = await response.json();

      const item = data.find((item) => item.postId === postId) || false; //find()의 결과가 없다면 false할당
      const comments = item ? item.comments : false;

      if(comments){
        displayComments(comments);
      }else{
        console.log("댓글이 없습니다.");
      }

    } catch (error) {
      console.error(`[fetchComments Error] 게시물 ${postId}에 대한 댓글 데이터를 가져올 수 없습니다.`, error);
    }
  }

  fetchPost();
  fetchComments();

  
  editPostBtn.addEventListener("click", editPost);
  deletePostBtn.addEventListener("click", deletePost);

  // editPostBtn.addEventListener("click", function () {
  //   window.location.href = "/posts/post-id/edit";
  // });

  window.addEventListener("click", function (event) {
    // 모달 바깥 클릭 시 닫기
    if (event.target === postModalOverlay) {
      postModalOverlay.style.display = "none";
    } else if (event.target === commentModalOverlay) {
      commentModalOverlay.style.display = "none";
    }
  });
});
