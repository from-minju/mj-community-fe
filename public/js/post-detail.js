import { enableBtn, disableBtn, checkAuthentication } from "./utils.js";

const API_URL = window.API_URL || 'http://localhost:3000';

const postId = window.location.pathname.split("/").pop(); //경로를 /로 나누고 배열의 맨 마지막 값(:postId)을 가져옴

const editPostBtn = document.getElementById("editPostBtn");
const editCommentBtn = document.getElementById("editCommentBtn");

const deletePostBtn = document.getElementById("deletePostBtn");
const deleteCommentBtn = document.getElementById("deleteCommentBtn");

const postModalOverlay = document.getElementById("postModalOverlay");
const commentModalOverlay = document.getElementById("commentModalOverlay");

const closePostModalBtn = document.getElementById("closePostModal");
const closeCommentModalBtn = document.getElementById("closeCommentModal");

const okPostModalBtn = document.getElementById("okPostModal");
const okCommentModalBtn = document.getElementById("okCommentModal");

const commentTextArea = document.getElementById("writeCommentArea");
const createOrEditCommentBtn = document.getElementById("writeCommentBtn");

let editingCommentId = false;

function formatCnt(cnt) {
  if (cnt >= 1000) return `${Math.floor(cnt / 1000)}k`;
  return `${cnt}`;
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
      const API_URL = `http://localhost:3000/posts/${postId}`;
      const response = await fetch(API_URL, {
        method: "DELETE",
      });
  
      if (response.ok) {
        window.location.href = `/posts`;
        alert("게시글이 삭제되었습니다.");
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
    const API_URL = `http://localhost:3000/posts/${postId}/comments/${commentId}`;
    const response = await fetch(API_URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    await response.json();
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
    fetchComments();
  });
}

function displayPost(post) {
  document.querySelector(".postTitle").textContent = post.title;
  document.getElementById("postWriterProfileImage").src = `${API_URL}/uploads/${post.profileImage}`;
  document.getElementById("postWriterName").textContent = post.nickname;
  document.querySelector(".createdTime").textContent = post.createdAt;
  document.querySelector(".postContent").innerHTML = post.content;
  if (post.postImage) {
    document.querySelector(".postImage").src = `${API_URL}/uploads/${post.postImage}`;
  } else {
    document.querySelector(".postImageContainer").style.display = "none";
  }
  document.getElementById("likesCnt").textContent = formatCnt(post.likes);
  document.getElementById("viewsCnt").textContent = formatCnt(post.views);
  document.getElementById("commentsCnt").textContent = formatCnt(post.comments);
}

function displayComments(comments) {
  const commentsContainer = document.querySelector(".commentsContainer");
  commentsContainer.innerHTML = "";

  if (!comments) return;

  //HTML 생성
  comments.forEach((comment) => {
    const commentContainer = document.createElement("div");
    commentContainer.className = "commentContainer";
    commentContainer.setAttribute("data-comment-id", comment.commentId);

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
    userProfile.src = comment.profileImage || "/images/circle-user.png"; // TODO: 기본프사 경로 설정 다시하기
    writerName.textContent = comment.nickname;
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

    editCommentBtn.addEventListener("click", () => {
      handleEditCommentBtn(comment.commentId, comment.content);
    });
    deleteCommentBtn.addEventListener("click", () => {
      handleDeleteCommentBtn(comment.commentId);
    });
  });
}

// 게시물 상세 내용 가져오기
async function fetchPost() {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    const { data: post } = await response.json();
    displayPost(post);

  } catch (error) {
    console.error(
      `[fetchPost Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다.`,
      error
    );
  }
}

// 댓글 가져오기
async function fetchComments() {

  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`,
      {
        method: "GET",
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

function updateCreateCommentBtn() {
  const commentValue = commentTextArea.value.trim();
  if (commentValue) {
    enableBtn(createOrEditCommentBtn);
  } else {
    disableBtn(createOrEditCommentBtn);
  }
}

async function createOrEditComment() {
  if (!commentTextArea.value.trim()) return;

  const API_URL = !editingCommentId
    ? `http://localhost:3000/posts/${postId}/comments`
    : `http://localhost:3000/posts/${postId}/comments/${editingCommentId}`;

  const method = !editingCommentId ? "POST" : "PUT";
  const commentData = {
    content: commentTextArea.value.trim(),
  };

  try {
    const response = await fetch(API_URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(
        `Error ${response.status}: ${message || "Unknown error"}`
      );
    }

    editingCommentId = false;

    disableBtn(createOrEditCommentBtn);

    createOrEditCommentBtn.textContent = "댓글 등록";
    commentTextArea.value = "";

    await response.json();
    fetchPost();
    fetchComments();
  } catch (error) {
    console.error("댓글 등록 또는 수정 실패", error);
  }
}



editPostBtn.addEventListener("click", editPost);
deletePostBtn.addEventListener("click", deletePost);

commentTextArea.addEventListener("input", updateCreateCommentBtn);
createOrEditCommentBtn.addEventListener("click", createOrEditComment);

window.addEventListener("click", function (event) {
  // 모달 바깥 클릭 시 닫기
  if (event.target === postModalOverlay) {
    postModalOverlay.style.display = "none";
  } else if (event.target === commentModalOverlay) {
    commentModalOverlay.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();
  fetchPost();
  fetchComments();
});
