document.addEventListener("DOMContentLoaded", function () {
  // 드롭다운
  document.getElementById("userProfileImg").addEventListener("click", function() {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
  });

  // 이전 페이지
  document.getElementById("headerLeft").addEventListener("click", function() {
    history.back();
  })

});
