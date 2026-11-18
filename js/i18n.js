// Spanish is written in the HTML; this file holds the English texts and the toggle.
(function () {
  var en = {
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "hero.eyebrow": "Systems Engineering student · Universidad del Magdalena",
    "hero.role": "Backend Developer · Java & Spring Boot",
    "hero.lead":
      "I build APIs and backend systems with clean architecture, automated tests and Docker-based deployment. I'm interested in microservices, full-stack development and application security.",
    "hero.cta": "See projects ↓",
    "hero.location": "📍 Santa Marta, Colombia",
    "projects.title": "Featured projects",
    "projects.top": "Top contributor",
    "projects.samaria":
      "Tourism platform for Santa Marta (capstone project). Five hexagonal microservices behind an API gateway, with asynchronous events over RabbitMQ. I authored 46 of the 77 PRs: booking, catalog, analytics and chatbot services, gateway, frontend, infrastructure and load testing.",
    "projects.logistics":
      "Logistics management system: package intake, weighing, storage, sorting and incident handling, integrated with other modules through message queues. 208 tests, CI and the whole stack with a single Docker command.",
    "projects.eco":
      "IoT monitoring for a home composter: an API with a threshold-based diagnosis engine and a web dashboard, fed by simulated sensor data over the same contract an ESP32 would use.",
    "projects.he":
      "Ethical hacking: analysis, exploitation and mitigation of 4 OWASP Top 10 vulnerabilities in OWASP NodeGoat, with vulnerable and patched versions side by side. My part was NoSQL injection.",
    "projects.repo": "View repository →",
    "skills.title": "Technical skills",
    "skills.backend": "Backend",
    "skills.arch": "Architecture",
    "skills.archList": "Hexagonal architecture · Microservices · Asynchronous messaging (RabbitMQ, SQS) · ADRs",
    "skills.frontend": "Frontend",
    "skills.data": "Data",
    "skills.devops": "DevOps & quality",
    "skills.security": "Security",
    "skills.securityList": "OWASP Top 10 · Injection and access control testing · Secrets management",
    "education.title": "Education",
    "education.uniWhen": "2023 – present",
    "education.uni": "Systems Engineering",
    "contact.title": "Let's talk",
    "contact.text":
      "I'm looking for an internship or a first role as a backend or full-stack developer. Reach me on LinkedIn.",
    "footer.early": "Early exercises from the Web Programming course:",
    "footer.magic": "Magic number",
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var es = {};
  nodes.forEach(function (n) {
    es[n.dataset.i18n] = n.textContent;
  });

  var toggle = document.getElementById("lang-toggle");

  function apply(lang) {
    var dict = lang === "en" ? en : es;
    nodes.forEach(function (n) {
      var text = dict[n.dataset.i18n];
      if (text) n.textContent = text;
    });
    document.documentElement.lang = lang;
    toggle.textContent = lang === "en" ? "ES" : "EN";
    toggle.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Switch to English");
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }

  var saved = null;
  try {
    saved = localStorage.getItem("lang");
  } catch (e) {}
  var initial = saved || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  apply(initial);

  toggle.addEventListener("click", function () {
    apply(document.documentElement.lang === "en" ? "es" : "en");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
