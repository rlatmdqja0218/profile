const workPanel = document.querySelector("[data-work-panel]");
const viewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll("[data-view]");
const toast = document.querySelector("[data-link-toast]");
const projectLinks = document.querySelectorAll("[data-project-link]");

const scrollWorkPanelToTop = () => {
  if (window.matchMedia("(max-width: 820px)").matches) {
    workPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  workPanel?.scrollTo({ top: 0, behavior: "smooth" });
};

const activateView = (viewName, shouldScroll = true) => {
  views.forEach((view) => {
    const isActive = view.dataset.view === viewName;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  viewButtons.forEach((button) => {
    const isActive = button.dataset.viewTarget === viewName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (shouldScroll) scrollWorkPanelToTop();
  history.replaceState(null, "", `#${viewName}`);
};

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const viewName = button.dataset.viewTarget;

    if (!viewName) return;

    if (button.classList.contains("is-active") && viewName === "feed") {
      scrollWorkPanelToTop();
      return;
    }

    activateView(viewName);
  });
});

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

const initialView = window.location.hash.replace("#", "");
const allowedViews = new Set(["feed", "overview", "contact"]);

activateView(allowedViews.has(initialView) ? initialView : "feed", false);
