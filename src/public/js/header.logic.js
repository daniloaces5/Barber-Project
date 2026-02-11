const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("mobileMenu");

openBtn.addEventListener("click", () => {
  menu.showModal();
});

closeBtn.addEventListener("click", () => {
  menu.close();
});

menu.addEventListener("click", (e) => {
  if (e.target === menu) menu.close();
});
