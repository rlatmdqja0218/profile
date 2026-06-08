const header = document.querySelector("[data-scroll-header]");
const toast = document.querySelector("[data-link-toast]");
const projectLinks = document.querySelectorAll("[data-project-link]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
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
  }, 2600);
};

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    showToast(`${href} 페이지를 나중에 상세 프로젝트로 연결할 수 있습니다.`);
  });
});

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
