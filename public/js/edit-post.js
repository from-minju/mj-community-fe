import { API_BASE_URL } from "./config.js";
import { checkAuthAndRedirect, disableBtn, enableBtn } from "./utils.js";

const postId = window.location.pathname.split("/")[2];

const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const postImageInput = document.getElementById("postWriteImage");

const titleHelperText = document.getElementById("titleHelperText");
const contentHelperText = document.getElementById("contentHelperText");
const imageNameHelperText = document.getElementById("imageName");

const imageContainer = document.getElementById("imageContainer");
const deleteImageBtn = document.getElementById("deleteImageBtn");

const editPostBtn = document.getElementById("editPostBtn");

const TITLE_MAX = 26;

let isImageDeleted = false;  // 이미지 삭제 여부 플래그
let isOriginalImageDeleted = false;

checkAuthAndRedirect();

function validateTitle() {
  if (titleInput.value.trim().length > TITLE_MAX) {
    return false;
  } else {
    return true;
  }
}

function updateTitleHelperText() {
  if (!validateTitle()) {
    titleHelperText.textContent = `* 제목은 ${TITLE_MAX}자를 초과할 수 없습니다.`;
  } else if (titleInput.value.trim().length === 0) {
    titleHelperText.textContent = "* 제목을 입력해 주세요.";
  } else {
    titleHelperText.textContent = "";
  }
}

function updateContentHelperText() {
  if (contentInput.value.trim().length === 0) {
    contentHelperText.textContent = "* 내용을 입력해 주세요.";
  } else {
    contentHelperText.textContent = "";
  }
}

function updateImageNameHelperText() {
  if (postImageInput.files.length > 0) {
    imageContainer.style.display = "none";
    isImageDeleted = true;
    isOriginalImageDeleted = true;
    
  } else {
    isImageDeleted = false;
    if(!isImageDeleted || isOriginalImageDeleted){
      return;
    }
    imageContainer.style.display = "flex";
  }
}

// 모두 입력했는지 확인, 글자 수 확인 후 버튼 활성화
function updateEditPostBtn() {
  if (
    titleInput.value.trim() != "" &&
    contentInput.value.trim() != "" &&
    validateTitle()
  ) {
    enableBtn(editPostBtn);
    
  } else {
    disableBtn(editPostBtn);
  }
}

function displayPostDetail(post) {
  titleInput.value = post.title;
  contentInput.value = post.content;

  if (post.postImage) {
    const fullFileName = post.postImage;
    const fileName = fullFileName.split("-").slice(2).join("-");

    imageContainer.style.display = "flex";
    document.getElementById("imageName").textContent = fileName;
  } else {
    imageContainer.style.display = "none";
  }
}

async function fetchPostDetail() {
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
    displayPostDetail(post);
  } catch (error) {
    console.error(
      `[fetchPostDetail Error] 게시물 ${postId}에 대한 상세 데이터를 가져올 수 없습니다.`,
      error
    );
  }
}

function deleteImage() {
  imageContainer.style.display = "none";
  isImageDeleted = true;
  isOriginalImageDeleted = true;
}

async function editPost() {
  const API_URL = `${API_BASE_URL}/posts/${postId}`;
  const postData = new FormData();
  postData.append("title", titleInput.value.trim());
  postData.append("content", contentInput.value.trim());
  postData.append("isImageDeleted", isImageDeleted);

  if (postImageInput.files[0]) {
    postData.append("postImage", postImageInput.files[0]);
  }

  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      credentials: "include",
      body: postData,
    });

    const { message } = await response.json();

    if (!response.ok) {
      throw new Error(
        `게시글 수정 실패 ${response.status}: ${message || "Unknown error"}`
      );
    }

    console.log(message);
    window.location.href = `/posts/${postId}`;
  } catch (error) {
    console.error(`게시물 수정 실패`, error);
  }
}



titleInput.addEventListener("input", updateTitleHelperText);
contentInput.addEventListener("input", updateContentHelperText);

titleInput.addEventListener("input", updateEditPostBtn);
contentInput.addEventListener("input", updateEditPostBtn);

postImageInput.addEventListener("change", updateImageNameHelperText);

deleteImageBtn.addEventListener("click", deleteImage);

editPostBtn.addEventListener("click", editPost);


document.addEventListener("DOMContentLoaded", async () => {
    fetchPostDetail();
});
