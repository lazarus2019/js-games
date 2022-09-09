const contextMenu = document.querySelector(".wrapper");
const shareMenu = document.querySelector(".menu-share");

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  let x = e.offsetX,
    y = e.offsetY;

  let winWidth = window.innerWidth;
  let cmWidth = contextMenu.offsetWidth;

  let winHeight = window.innerHeight;
  let cmHeight = contextMenu.offsetHeight;

  x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
  y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

  if (x > winWidth - cmWidth - shareMenu.offsetWidth) {
    shareMenu.style.left = "-200px";
  } else {
    shareMenu.style.left = "";
    shareMenu.style.right = "-200px";
  }

  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;

  contextMenu.style.visibility = "visible";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".wrapper")) contextMenu.style.visibility = "hidden";
});
