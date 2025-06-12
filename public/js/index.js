import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  
  // Floating particles 생성
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // 수치 포맷팅 함수
  function formatCnt(cnt) {
    if (cnt >= 1000) return `${Math.floor(cnt / 1000)}k`;
    return `${cnt}`;
  }

  // 스크롤 애니메이션 설정
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // 애니메이션 대상 요소들을 관찰
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
  }

  /**
   * 게시물 데이터 가져오기
   */
  async function fetchPosts() {
    try {
      const API_URL = `${config.API_BASE_URL}/posts`;
      const response = await fetch(API_URL, {
        method: "GET",
      });
      const { data: posts } = await response.json();

      const postsContainer = document.querySelector(".postsContainer");
      postsContainer.innerHTML = "";

      // HTML 생성
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postContainer = document.createElement("div");
        postContainer.className = "postContainer animate-on-scroll";

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
        
        // 통계 정보를 이모지와 함께 표시
        leftArea.innerHTML = `
          <span>❤️ ${formatCnt(post.likes)}</span>
          <span>💬 ${formatCnt(post.comments)}</span>
          <span>👀 ${formatCnt(post.views)}</span>
        `;
        
        rightArea.textContent = post.createdAt;
        postUserProfile.src = post.profileImage 
          ? `${config.API_IMAGE_URL}/${post.profileImage}` 
          : config.DefaultProfileImageUrl;
        postWriterNameArea.textContent = post.nickname;

        postMetaArea.append(leftArea, rightArea);
        postWriterArea.append(postUserProfile, postWriterNameArea);
        postContainer.append(
          postTitleArea,
          postMetaArea,
          postWriterArea
        );
        postsContainer.append(postContainer);

        // 클릭 이벤트 추가
        postContainer.addEventListener("click", () => {
          window.location.href = `/posts/${post.postId}`;
        });

        // 호버 효과를 위한 추가 이벤트
        postContainer.addEventListener("mouseenter", () => {
          postContainer.style.transform = "translateY(-8px)";
        });

        postContainer.addEventListener("mouseleave", () => {
          postContainer.style.transform = "translateY(0)";
        });
      }

      // 새로 생성된 요소들에 대한 스크롤 애니메이션 설정
      setupScrollAnimations();

    } catch (error) {
      console.error("[fetchPosts Error] ", error);
      
      // 에러 발생 시 사용자에게 알림
      const postsContainer = document.querySelector(".postsContainer");
      postsContainer.innerHTML = `
        <div class="error-message" style="
          text-align: center; 
          padding: 2rem; 
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        ">
          <h3>게시글을 불러오는 중 문제가 발생했습니다.</h3>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      `;
    }
  }

  // 초기화 함수들 실행
  createParticles();
  fetchPosts();
});