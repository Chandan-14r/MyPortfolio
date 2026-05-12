const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const copyPitchButton = document.querySelector("#copyPitch");
const toast = document.querySelector("#toast");
const typeLine = document.querySelector("#typeLine");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function copyText(value) {
  if (!value) return Promise.resolve(false);

  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value).then(
      () => true,
      () => false
    );
  }

  const fallback = document.createElement("textarea");
  fallback.value = value;
  fallback.setAttribute("readonly", "");
  fallback.style.position = "fixed";
  fallback.style.left = "-999px";
  document.body.appendChild(fallback);
  fallback.select();
  const copied = document.execCommand("copy");
  fallback.remove();
  return Promise.resolve(copied);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const pitch =
  "Hi, I am Chandan R.S., a Computer Science undergraduate with MERN stack, Python, Gemini API, Docker, CI/CD, and cloud deployment experience. I have built AI-powered full-stack projects including Inheritance OS, InvestiSync, Nova Productivity Agent, and CareCompanion Guardian, and I am applying for the Full Stack Developer Internship at Sri Trilinga Technologies Private Limited.";

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

copyPitchButton?.addEventListener("click", async () => {
  const copied = await copyText(pitch);
  showToast(copied ? "Intro copied" : "Copy unavailable");
});

document.querySelectorAll("[data-open-file]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const fileUrl = new URL(link.dataset.openFile, window.location.href).href;
    const opened = window.open(fileUrl, "_blank");

    if (!opened) {
      window.location.href = fileUrl;
    }

    showToast("Opening resume PDF");
  });
});

document.querySelectorAll("[data-copy-value]").forEach((link) => {
  link.addEventListener("click", async () => {
    const copied = await copyText(link.dataset.copyValue);
    const message = link.dataset.contactAction || "Contact copied";
    showToast(copied ? message : "Contact ready");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number(entry.target.dataset.count);
      const duration = prefersReducedMotion ? 1 : 900;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(target * eased);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll("[data-count]").forEach((counter) => counterObserver.observe(counter));

const typeLines = [
  "Inheritance OS: 48-hour AI estate-planning MVP",
  "InvestiSync: 10k+ articles/day sentiment pipeline",
  "Nova: Gmail, Zoom, Telegram automation agent",
  "CareCompanion: TensorFlow fall detection + Twilio alerts"
];

if (typeLine && !prefersReducedMotion) {
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = typeLines[lineIndex];
    typeLine.textContent = `${deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++)}_`;

    if (!deleting && charIndex > current.length + 12) {
      deleting = true;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % typeLines.length;
    }

    window.setTimeout(typeLoop, deleting ? 28 : 48);
  }

  typeLoop();
} else if (typeLine) {
  typeLine.textContent = typeLines[0];
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

function startSignalCanvas() {
  const canvas = document.querySelector("#signalCanvas");
  if (!canvas || prefersReducedMotion) return;

  const context = canvas.getContext("2d");
  const pointer = { x: 0, y: 0, active: false };
  let particles = [];
  let width = 0;
  let height = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.min(72, Math.max(34, Math.floor(width / 18)));
    particles = Array.from({ length: count }, (_, index) => ({
      x: (index * 97) % width,
      y: (index * 53) % height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: 1.6 + Math.random() * 2.4
    }));
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      if (pointer.active) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 170) {
          particle.x -= dx * 0.004;
          particle.y -= dy * 0.004;
        }
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? "rgba(216, 95, 68, 0.48)" : "rgba(8, 127, 140, 0.46)";
      context.fill();

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

        if (distance < 118) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(20, 24, 33, ${0.12 - distance / 1200})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resize();
  draw();
}

startSignalCanvas();
