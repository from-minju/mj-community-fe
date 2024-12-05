document.addEventListener("DOMContentLoaded", function () {
  // 드롭다운
  document.getElementById("userProfileImg").addEventListener("click", function() {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
  });

  // 드롭다운 외부 클릭 시 메뉴 숨기기
  document.addEventListener("click", function(event) {
    if (!dropdown.contains(event.target) && !userProfileImg.contains(event.target)) {
      dropdown.style.display = "none";  // 드롭다운 숨기기
    }
  });

  // 이전 페이지
  document.getElementById("headerLeft").addEventListener("click", function() {
    history.back();
  })

});
