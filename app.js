(function initSmartKhmerPlatform() {
  bindAuthTabs();
  bindAdminLogin();
  bindModeSwitch();
  bindPracticeSimulator();
  bindContinueLesson();
  bindToastButtons();
  bindLockedLessons();
  bindLogoutConfirmation();
  bindDictionary();
  loadDictionaryDetail();
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

  function bindLogoutConfirmation() {
    document.querySelectorAll("[data-logout]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const confirmed = window.confirm("Are you sure you want to logout?");

        if (!confirmed) {
          event.preventDefault();
          showToast("Logout cancelled");
        }
      });
    });
  }

  function bindDictionary() {
    const search = document.querySelector("[data-dictionary-search]");
    const sort = document.querySelector("[data-dictionary-sort]");
    const typeButtons = document.querySelectorAll("[data-dictionary-type]");

    if (!search || !sort) {
      return;
    }

    typeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        typeButtons.forEach((item) => item.classList.toggle("active", item === button));
        filterDictionary();
      });
    });

    search.addEventListener("input", filterDictionary);
    sort.addEventListener("change", filterDictionary);
    filterDictionary();
  }

  function filterDictionary() {
    const search = document.querySelector("[data-dictionary-search]");
    const sort = document.querySelector("[data-dictionary-sort]");
    const list = document.querySelector("[data-dictionary-list]");
    const empty = document.querySelector("[data-dictionary-empty]");
    const activeType = document.querySelector("[data-dictionary-type].active")?.dataset.dictionaryType || "all";

    if (!search || !sort || !list) {
      return;
    }

    const query = search.value.trim().toLowerCase();
    const cards = Array.from(list.querySelectorAll(".dictionary-card"));

    cards
      .sort((a, b) => {
        const first = a.dataset.title.toLowerCase();
        const second = b.dataset.title.toLowerCase();
        return sort.value === "az" ? first.localeCompare(second) : second.localeCompare(first);
      })
      .forEach((card) => list.appendChild(card));

    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesSearch = card.dataset.title.toLowerCase().includes(query);
      const matchesType = activeType === "all" || card.dataset.type === activeType;
      const isVisible = matchesSearch && matchesType;

      card.classList.toggle("hidden", !isVisible);
      if (isVisible) {
        visibleCount += 1;
      }
    });

    empty?.classList.toggle("hidden", visibleCount !== 0);
  }

  function loadDictionaryDetail() {
    const title = document.querySelector("[data-detail-title]");

    if (!title) {
      return;
    }

    const entries = {
      ka: detailEntry("Ka", "Character", "Finger Spelling", "Beginner", "Completed", "Finger spelling sample with hand keypoints.", "Practice clean palm direction and stable finger spacing.", "lesson.html?track=finger&lesson=ka"),
      kha: detailEntry("Kha", "Character", "Finger Spelling", "Beginner", "Completed", "Character hand shape and learner correction reference.", "Focus on thumb position and match the sample image first.", "lesson.html?track=finger&lesson=kha"),
      kho: detailEntry("Kho", "Character", "Finger Spelling", "Beginner", "In progress", "Current finger spelling lesson with sample image and keypoint guidance.", "Watch the sample, copy the hand shape, then compare your keypoints.", "lesson.html?track=finger&lesson=kho"),
      hello: detailEntry("Hello", "Word", "Word Detection", "Beginner", "Available", "Starter Word Detection video sample for greeting practice.", "Watch the video once, then repeat the whole movement slowly.", "lesson.html?track=word&lesson=hello"),
      help: detailEntry("Help", "Word", "Word Detection", "Beginner", "Locked preview", "Daily word class with video and pose keypoints.", "Unlock this after finishing the earlier starter word lessons.", "word-detection.html"),
      thanks: detailEntry("Thank You", "Word", "Word Detection", "Beginner", "Next word", "Word Detection video sample and movement note.", "Keep the movement smooth and check the probability feedback.", "lesson.html?track=word&lesson=thanks")
    };

    const query = new URLSearchParams(window.location.search);
    const entry = entries[query.get("id")] || entries.kho;

    setText("[data-detail-type]", entry.kind);
    setText("[data-detail-title]", entry.title);
    setText("[data-detail-summary]", entry.summary);
    setText("[data-detail-track]", entry.track);
    setText("[data-detail-kind]", entry.kind);
    setText("[data-detail-difficulty]", entry.difficulty);
    setText("[data-detail-status]", entry.status);
    setText("[data-detail-tip]", entry.tip);
    document.querySelector("[data-detail-practice]")?.setAttribute("href", entry.practice);
  }

  function detailEntry(title, kind, track, difficulty, status, summary, tip, practice) {
    return { title, kind, track, difficulty, status, summary, tip, practice };
  }

  function loadLessonFromQuery() {
    const tracks = {
      finger: {
        label: "Finger Spelling Track",
        back: "finger-spelling.html",
        sample: "Sample image with hand keypoints",
        live: "Live learner camera with keypoint overlay",
        defaultLesson: "kho",
        lessons: {
          ka: ["Unit 01 / Chapter 01 / Lesson 01", "Character: Ka", [96, 91, 94]],
          kha: ["Unit 01 / Chapter 01 / Lesson 02", "Character: Kha", [92, 87, 90]],
          ko: ["Unit 01 / Chapter 01 / Lesson 03", "Character: Ko", [89, 82, 86]],
          kho: ["Unit 01 / Chapter 01 / Lesson 04", "Character: Kho", [95, 76, 87]]
        }
      },
      word: {
        label: "Word Detection Track",
        back: "word-detection.html",
        sample: "Sample video with pose and hand keypoints",
        live: "Live signing video with real-time word probability",
        defaultLesson: "hello",
        lessons: {
          hello: ["Unit 01 / Chapter 01 / Word 01", "Word: Hello", [82, 71, 78]],
          thanks: ["Unit 01 / Chapter 01 / Word 02", "Word: Thank You", [0, 0, 0]]
        }
      }
    };
    const query = new URLSearchParams(window.location.search);
    const track = tracks[query.get("track")] || tracks.finger;
    const selected = track.lessons[query.get("lesson") || track.defaultLesson];

    if (!selected) {
      return;
    }

    setText("[data-track-label]", track.label);
    setText("[data-sample-copy]", track.sample);
    setText("[data-live-copy]", track.live);
    setText("[data-lesson-meta]", selected[0]);
    setText("[data-lesson-title]", selected[1]);
    document.querySelectorAll("[data-track-back]").forEach((link) => {
      link.setAttribute("href", track.back);
    });
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
