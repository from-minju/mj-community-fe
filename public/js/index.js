
document.addEventListener("DOMContentLoaded", function () {

  function formatCnt(cnt){
    if(cnt >= 1000) return `${Math.floor(cnt/1000)}k`;
    return `${cnt}`;
  }

  /**
   * 게시물 데이터 가져오기
   */
  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: "GET",
      });
      const {data: posts} = await response.json();

      const postsContainer = document.querySelector(".postsContainer");
      postsContainer.innerHTML = "";

      // HTML 생성
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postContainer = document.createElement("div");
        postContainer.className = "postContainer";

        const postTitleArea = document.createElement("div");
        postTitleArea.className = "postTitleArea";

        const postMetaArea = document.createElement("div");
        postMetaArea.className = "postMetaArea";

        const postWriterArea = document.createElement("div");
        postWriterArea.className = "postWriterArea";

        const leftArea = document.createElement("div");
        leftArea.className = "leftArea";

        const rightArea = document.createElement("div");
        rightArea.className = "rightArea";

        const postUserProfile = document.createElement("img");
        postUserProfile.className = "postUserProfile";

        const postWriterNameArea = document.createElement("p");

        // 컨테이너 구성하기
        postTitleArea.textContent = post.title;
        leftArea.innerHTML = `좋아요 <span>${formatCnt(post.likes)}</span>  댓글 <span>${formatCnt(post.comments)}</span>  조회수 <span>${formatCnt(post.views)}</span>`;
        rightArea.textContent = post.createdAt;
        postUserProfile.src = post.profileImage;
        postWriterNameArea.textContent = post.nickname;

        postMetaArea.append(leftArea, rightArea);
        postWriterArea.append(postUserProfile, postWriterNameArea);
        postContainer.append(
          postTitleArea,
          postMetaArea,
          document.createElement("hr"),
          postWriterArea
        );
        postsContainer.append(postContainer);

        postContainer.addEventListener("click", () => {
          window.location.href = `/posts/${post.postId}`;
        })
      }
    } catch (error) {
      console.error("[fetchPosts Error] ", error);
    }
  }

  fetchPosts();
});
