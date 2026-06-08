const header = document.querySelector("[data-scroll-header]");
const toast = document.querySelector("[data-link-toast]");
const projectLinks = document.querySelectorAll("[data-project-link]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

const showToast = (message) => {
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("is-visible"));

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => {
      toast.hidden = true;
    }, 180);
  }, 2400);
};

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    showToast(`${href} 경로에 프로젝트 상세 페이지를 추가할 수 있습니다.`);
  });
});

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
