const workPanel = document.querySelector("[data-work-panel]");
const viewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll("[data-view]");

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

const initialView = window.location.hash.replace("#", "");
const allowedViews = new Set(["feed", "overview", "contact"]);

activateView(allowedViews.has(initialView) ? initialView : "feed", false);
