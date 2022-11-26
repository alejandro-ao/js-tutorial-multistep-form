import "./styles.scss";

class MultiStepForm {
  constructor(_formId) {
    this.form = document.getElementById(_formId);
    this.pages = this.form.querySelectorAll(".form__page");
    this.nextButtons = this.form.querySelectorAll(".btn-next");
    this.prevButtons = this.form.querySelectorAll(".btn-prev");

    this.initializeButtons(this.nextButtons, this.prevButtons);
  }

  // initializer
  initializeButtons(nextButtons, prevButtons) {
    nextButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // prev default
        e.preventDefault();
        // get current page
        const currentPage = this.getCurrentPage();
        // go to page current + 1
        this.goToPage(currentPage + 1);
      });
    });

    prevButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // prev default
        e.preventDefault();
        // get current page
        const currentPage = this.getCurrentPage();
        // go to page current -1
        this.goToPage(currentPage - 1);
      });
    });
  }

  // getters
  getCurrentPage() {
    const currentPage = this.form.dataset.page;
    // test that the var exists
    if (!currentPage || typeof currentPage !== "string")
      console.error("There was an error getting the current page");

    return parseInt(currentPage, 10);
  }

  getMaxPage() {
    const maxPage = this.form.dataset.maxPage;
    // test that the var exists
    if (!maxPage || typeof maxPage !== "string")
      console.error("There was an error getting the current page");

    return parseInt(maxPage, 10);
  }

  // methods
  goToPage(targetPage) {
    // does page exist?
    if (targetPage > this.maxPage || targetPage < 1)
      console.error("page not found");

    // go to page
    this.pages.forEach((page) => {
      // hide page
      this.hidePage(page);
      // page is target page => show page
      const currentPageNumber = parseInt(page.dataset.page, 10);
      currentPageNumber === targetPage && this.showPage(page);

      // update form dataset
      this.form.dataset.page = targetPage;
    });

    // update progress bar
    this.updateProgressBar();
  }

  updateProgressBar() {
    // get progress bar steps
    const allSteps = this.form.querySelectorAll(".page-step");
    // get current page
    const currentPage = this.getCurrentPage();
    allSteps.forEach((step) => {
      // uncolor all steps
      step.classList.contains("active") && step.classList.remove("active");
      const stepPage = parseInt(step.dataset.page, 10);
      if (stepPage <= currentPage) {
        step.classList.add("active");
      }
    });
    // color up until current step
  }

  hidePage(page) {
    page.classList.contains("active") && page.classList.remove("active");
  }
  showPage(page) {
    !page.classList.contains("active") && page.classList.add("active");
  }
}

new MultiStepForm("multistep-form");
