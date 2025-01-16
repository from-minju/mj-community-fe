import { API_BASE_URL, API_IMAGE_URL, DefaultProfileImageUrl } from "./config.js";
import { enableBtn, disableBtn, checkAuthAndRedirect, getFilePath, getCurrentUser } from "./utils.js";
import { COMMENT_MAX, validateComment } from "./validation.js";

const postId = window.location.pathname.split("/").pop(); //경로를 /로 나누고 배열의 맨 마지막 값(:postId)을 가져옴

const postModalOverlay = document.getElementById("postModalOverlay");
const commentModalOverlay = document.getElementById("commentModalOverlay");

const closePostModalBtn = document.getElementById("closePostModal");
const closeCommentModalBtn = document.getElementById("closeCommentModal");

const okPostModalBtn = document.getElementById("okPostModal");
const okCommentModalBtn = document.getElementById("okCommentModal");

const commentTextArea = document.getElementById("writeCommentArea");
const commentHelperText = document.getElementById("commentHelperText");
const createOrEditCommentBtn = document.getElementById("writeCommentBtn");

const likesBtn = document.getElementById("likesBtn");

let currentUser = null;
let editingCommentId = false;


function formatCnt(cnt) {
  if (cnt >= 1000) return `${Math.floor(cnt / 1000)}k`;
  return `${cnt}`;
}

function initCreateCommentBtn() {
  disableBtn(createOrEditCommentBtn);

  createOrEditCommentBtn.textContent = "댓글 등록";
  commentTextArea.value = "";
  commentHelperText.style.display = "none";
}

// 게시물 수정
function editPost() {
  window.location.href = `/posts/${postId}/edit`;
}

// 게시물 삭제
function deletePost() {
  postModalOverlay.style.display = "flex";

  closePostModalBtn.addEventListener("click", () => {
    postModalOverlay.style.display = "none";
  });

  okPostModalBtn.addEventListener("click", async() => {
    try {
      const API_URL = `${API_BASE_URL}/posts/${postId}`;
      const response = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include"
      });
  
      if (response.ok) {
        window.location.href = `/posts`;
      }else{
        const { message } = await response.json();
        throw new Error(
          `Error ${response.status}: ${message || "Unknown error"}`
        );
      }

    } catch (error) {
      console.error(error);
    }
  })
}

async function deleteComment(commentId) {
  try {
    const API_URL = `${API_BASE_URL}/posts/${postId}/comments/${commentId}`;
    const response = await fetch(API_URL, {
      method: "DELETE",
      credentials: "include"
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    await response.json();

    initCreateCommentBtn();
    
  } catch (error) {
    console.error(error);
  }
}

async function handleEditCommentBtn(commentId, content) {
  editingCommentId = commentId;
  createOrEditCommentBtn.textContent = "댓글 수정";
  enableBtn(createOrEditCommentBtn);
  commentTextArea.value = content;
}

function handleDeleteCommentBtn(commentId) {
  commentModalOverlay.style.display = "flex";

  closeCommentModalBtn.addEventListener("click", () => {
    commentModalOverlay.style.display = "none";
  });

  okCommentModalBtn.addEventListener("click", async () => {
    await deleteComment(commentId);
    commentModalOverlay.style.display = "none";
    fetchPost();
    fetchComments();
  });
}

function displayPost(post) {
  const isPostAuthor = currentUser && post.postAuthorId === currentUser.userId;

  // 게시글 작성자만 수정, 삭제 버튼을 생성하도록 처리
  if (isPostAuthor) {
    const editPostBtn = document.createElement("button");
    editPostBtn.className = "editRemoveBtn";
    editPostBtn.textContent = "수정";

    const deletePostBtn = document.createElement("button");
    deletePostBtn.className = "editRemoveBtn";
    deletePostBtn.textContent = "삭제";

    // 컨테이너 구성하기
    const postEditRemoveBtnContainer = document.querySelector(".postEditRemoveBtnContainer");
    postEditRemoveBtnContainer.textContent = "";
    postEditRemoveBtnContainer.append(editPostBtn, deletePostBtn);

    // 이벤트 리스너
    editPostBtn.addEventListener("click", editPost);
    deletePostBtn.addEventListener("click", deletePost);
  }

  document.querySelector(".postTitle").textContent = post.title;
  document.getElementById("postWriterProfileImage").src = post.profileImage ? `${API_IMAGE_URL}/${post.profileImage}` : DefaultProfileImageUrl;
  document.getElementById("postWriterName").textContent = post.nickname;
  document.querySelector(".createdTime").textContent = post.createdAt;
  document.querySelector(".postContent").textContent = post.content;
  if (post.postImage) {
    document.querySelector(".postImage").src = `${API_IMAGE_URL}/${post.postImage}`;
  } else {
    document.querySelector(".postImageContainer").style.display = "none";
  }
  document.getElementById("likesCnt").textContent = formatCnt(post.likes);
  document.getElementById("viewsCnt").textContent = formatCnt(post.views);
  document.getElementById("commentsCnt").textContent = formatCnt(post.comments);

  if(post.isLiked){
    likesBtn.classList.add('liked');
  }else{
    likesBtn.classList.remove('liked');
  }

}

function displayComments(comments) {
  const commentsContainer = document.querySelector(".commentsContainer");
  commentsContainer.textContent = "";

  if (!comments) return;

  //HTML 생성
  comments.forEach((comment) => {
    const isCommentAuthor = currentUser && comment.commentAuthorId === currentUser.userId;
    
    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";
    commentContainer.setAttribute("data-comment-id", comment.commentId);

    const metaContainer = document.createElement("div");
    metaContainer.className = "metaContainer";

    const commentContent = document.createElement("div");
    commentContent.className = "commentContent";

    const metaLeftContainer = document.createElement("div");
    metaLeftContainer.className = "metaLeftContainer";

    const writerArea = document.createElement("div");
    writerArea.className = "writerArea";

    const createdTime = document.createElement("div");
    createdTime.className = "createdTime";

    const userProfile = document.createElement("img");
    userProfile.className = "userProfile";

    const writerName = document.createElement("p");
    writerName.className = "writerName";



    // 컨테이너 구성하기
    userProfile.src = comment.profileImage ? getFilePath(comment.profileImage) : DefaultProfileImageUrl;
    writerName.textContent = comment.nickname;
    createdTime.textContent = comment.createdAt;
    commentContent.textContent = comment.content;


    writerArea.append(userProfile, writerName);
    metaLeftContainer.append(writerArea, createdTime);
    metaContainer.append(metaLeftContainer);
    commentContainer.append(metaContainer, commentContent);
    commentsContainer.append(commentContainer);


    // 댓글 작성자만 수정, 삭제 버튼을 생성하도록 처리
    if(isCommentAuthor){
      const editCommentBtn = document.createElement("button");
      editCommentBtn.className = "editRemoveBtn";
      editCommentBtn.textContent = "수정";
  
      const deleteCommentBtn = document.createElement("button");
      deleteCommentBtn.className = "editRemoveBtn";
      deleteCommentBtn.textContent = "삭제";

      // 컨테이너 구성하기
      const editRemoveBtnContainer = document.createElement("div");
      editRemoveBtnContainer.className = "editRemoveBtnContainer";

      editRemoveBtnContainer.append(editCommentBtn, deleteCommentBtn);
      metaContainer.append(metaLeftContainer, editRemoveBtnContainer);


      // 이벤트 리스너 
      editCommentBtn.addEventListener("click", () => {
        handleEditCommentBtn(comment.commentId, comment.content);
      });
      deleteCommentBtn.addEventListener("click", () => {
        handleDeleteCommentBtn(comment.commentId);
      });

    }

  });
}


// 게시물 상세 내용 가져오기
async function fetchPost() {

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    const { data: post } = await response.json();
    displayPost(post, currentUser);

  } catch (error) {
    console.error(`[fetchPost Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다.`, error);
  }
}

// 댓글 가져오기
async function fetchComments() {

  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    const { data: comments } = await response.json();
    displayComments(comments);

  } catch (error) {
    console.error(
      `[fetchComments Error] 게시물 ${postId}에 대한 댓글 데이터를 가져올 수 없습니다.`,
      error
    );
  }
}


async function updateLikesBtn() {
  const isLiked = likesBtn.classList.contains('liked');

  try{
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/likes`, {
      method: isLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok){
      const { message } = await response.json();
      return alert(message);
    }

    const { data } = await response.json();
    document.getElementById("likesCnt").textContent = formatCnt(data.likesCnt);
    likesBtn.classList.toggle('liked'); // 만약 버튼에 liked 클래스가 없다면 추가하고, 있으면 제거

  } catch(error){
    console.error(`[updateLikes Error] 게시물 ${postId}에 대해 좋아요를 처리할 수 없습니다.`, error);
  }
}

function updateCreateCommentBtn() {
  const commentValue = commentTextArea.value.trim();
  if (commentValue) {
    enableBtn(createOrEditCommentBtn);
  } else {
    disableBtn(createOrEditCommentBtn);
  }
}

function updateCommentHelperText() {
  // const commentTextArea = document.getElementById("writeCommentArea");
  // const commentHelperText = document.getElementById("commentHelperText");
  // const createOrEditCommentBtn = document.getElementById("writeCommentBtn");

  const commentValue = commentTextArea.value.trim();

  if(!validateComment(commentValue)){
    commentHelperText.style.display = "flex";
    commentHelperText.textContent = `* 댓글은 ${COMMENT_MAX}자를 넘을 수 없습니다.`;
    disableBtn(createOrEditCommentBtn);
  }else{
    commentHelperText.style.display = "none";
    commentHelperText.textContent = "";
    enableBtn(createOrEditCommentBtn);
  }

}

async function createOrEditComment() {
  if (!commentTextArea.value.trim()) return;

  const API_URL = !editingCommentId
    ? `${API_BASE_URL}/posts/${postId}/comments`
    : `${API_BASE_URL}/posts/${postId}/comments/${editingCommentId}`;

  const method = !editingCommentId ? "POST" : "PUT";
  const commentData = {
    content: commentTextArea.value.trim(),
  };

  try {
    const response = await fetch(API_URL, {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(commentData),
    });

    if(response.status === 401){
      alert("로그인이 필요합니다.");
      commentTextArea.value = "";
      disableBtn(createOrEditCommentBtn);
    }

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `${response.status}: ${message || "Unknown error"}`
      );
    }

    editingCommentId = false;

    initCreateCommentBtn();

    await response.json();
    fetchPost(); 
    fetchComments();

  } catch (error) {
    console.error("댓글 등록 또는 수정 실패", error);
    disableBtn(createOrEditCommentBtn);
  }
}


commentTextArea.addEventListener("input", updateCreateCommentBtn);
commentTextArea.addEventListener("input", updateCommentHelperText);
createOrEditCommentBtn.addEventListener("click", createOrEditComment);
likesBtn.addEventListener("click", updateLikesBtn);

window.addEventListener("click", function (event) {
  // 모달 바깥 클릭 시 닫기
  if (event.target === postModalOverlay) {
    postModalOverlay.style.display = "none";
  } else if (event.target === commentModalOverlay) {
    commentModalOverlay.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', async() => {
  currentUser = await checkAuthAndRedirect();

  fetchPost();
  fetchComments();
});
