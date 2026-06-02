(function initSmartKhmerPlatform() {
  bindAuthTabs();
  bindAdminLogin();
  bindModeSwitch();
  bindPracticeSimulator();
  bindContinueLesson();
  bindToastButtons();
  bindLockedLessons();
  revealPage();
  loadLessonFromQuery();

  function bindAuthTabs() {
    document.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.authTab;

        document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
          tab.classList.toggle("active", tab === button);
        });

        document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
          panel.classList.toggle("hidden", panel.dataset.authPanel !== target);
          panel.classList.add("soft-pop");
          setTimeout(() => panel.classList.remove("soft-pop"), 350);
        });
      });
    });
  }

  function bindAdminLogin() {
    document.querySelector("[data-admin-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      window.location.href = "admin.html";
    });
  }

  function bindModeSwitch() {
    const modeContent = {
      finger: {
        meta: "Unit 01 / Chapter 01 / Lesson 04",
        title: "Character: Kho",
        sample: "Sample image with keypoints",
        live: "Live learner camera with keypoint overlay",
        correction: "Correct. Your thumb placement is strong. Raise the index finger slightly for a cleaner shape.",
        scores: [95, 76, 87]
      },
      word: {
        meta: "Unit 02 / Chapter 01 / Word Preview",
        title: "Word: Hello",
        sample: "Sample video with pose and hand keypoints",
        live: "Live signing video with real-time word probability",
        correction: "Word Detection is previewed here, but the unit remains locked until Unit 01 is completed.",
        scores: [82, 71, 78]
      }
    };

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-mode]").forEach((item) => {
          item.classList.toggle("active", item === button);
        });

        const content = modeContent[button.dataset.mode];
        setText("[data-lesson-meta]", content.meta);
        setText("[data-lesson-title]", content.title);
        setText("[data-sample-copy]", content.sample);
        setText("[data-live-copy]", content.live);
        setText("[data-correction]", content.correction);
        updateScores(content.scores);
        showToast(`${button.textContent.trim()} selected`);
      });
    });
  }

  function bindPracticeSimulator() {
    document.querySelector("[data-capture]")?.addEventListener("click", () => {
      const scores = [
        randomBetween(78, 98),
        randomBetween(66, 94),
        randomBetween(70, 96)
      ];
      const passed = scores[0] >= 85;

      updateScores(scores);
      setText(
        "[data-correction]",
        passed
          ? "Correct. Nice match. You can continue or repeat for a higher score."
          : "Almost there. Adjust your hand angle and keep the palm closer to the sample."
      );
      showToast("Real-time practice simulated");
    });
  }

  function bindContinueLesson() {
    document.querySelector("[data-next-lesson]")?.addEventListener("click", () => {
      setText("[data-lessons-done]", "05/05");
      setText("[data-circle-progress]", "93%");
      showToast("Lesson 05 unlocked in the unit path");
    });
  }

  function bindToastButtons() {
    document.querySelectorAll("[data-toast-message]").forEach((button) => {
      button.addEventListener("click", () => showToast(button.dataset.toastMessage));
    });
  }

  function bindLockedLessons() {
    document.querySelectorAll(".lesson-row.locked").forEach((row) => {
      row.addEventListener("click", () => showToast("Locked. Complete the previous lesson first."));
    });
  }

  function loadLessonFromQuery() {
    const lessons = {
      ka: ["Unit 01 / Chapter 01 / Lesson 01", "Character: Ka", [96, 91, 94]],
      kha: ["Unit 01 / Chapter 01 / Lesson 02", "Character: Kha", [92, 87, 90]],
      ko: ["Unit 01 / Chapter 01 / Lesson 03", "Character: Ko", [89, 82, 86]],
      kho: ["Unit 01 / Chapter 01 / Lesson 04", "Character: Kho", [95, 76, 87]]
    };
    const query = new URLSearchParams(window.location.search);
    const selected = lessons[query.get("lesson")];

    if (!selected) {
      return;
    }

    setText("[data-lesson-meta]", selected[0]);
    setText("[data-lesson-title]", selected[1]);
    updateScores(selected[2]);
  }

  function updateScores(scores) {
    ["match", "angle", "position"].forEach((name, index) => {
      animateScore(name, scores[index]);
    });
  }

  function animateScore(name, target) {
    const element = document.querySelector(`[data-score="${name}"]`);
    if (!element) {
      return;
    }

    const start = Number(element.textContent.replace("%", "")) || 0;
    const startedAt = performance.now();
    const duration = 420;

    function tick(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(start + (target - start) * eased)}%`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function showToast(message) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function revealPage() {
    document.querySelectorAll(".reveal-in, .mode-card, .unit-card, .chapter-card").forEach((element, index) => {
      element.style.animationDelay = `${index * 50}ms`;
      element.classList.add("reveal-in");
    });
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
