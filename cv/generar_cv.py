"""Genera la hoja de vida de Bryan Robles en PDF (español e inglés)."""
import sys
from fpdf import FPDF

OUT = sys.argv[1]
FONTS = "C:/Windows/Fonts/"
ACCENT = (37, 99, 235)
TEXT = (15, 23, 42)
MUTED = (71, 85, 105)

EMAIL = "branromo08@gmail.com"

LINKS = [
    ("linkedin.com/in/bryan-robles-ing", "https://www.linkedin.com/in/bryan-robles-ing/"),
    ("github.com/Bryan-Robles", "https://github.com/Bryan-Robles"),
    ("bryan-robles.github.io", "https://bryan-robles.github.io"),
]

CONTENT = {
    "es": {
        "title": "Backend Developer · Java & Spring Boot",
        "location": "Santa Marta, Colombia",
        "profile_h": "Perfil",
        "profile": (
            "Estudiante de Ingeniería de Sistemas enfocado en desarrollo backend con Java y Spring Boot. "
            "Construyo APIs con arquitectura hexagonal, pruebas automatizadas, integración continua y "
            "despliegue con Docker. Experiencia en microservicios, mensajería asíncrona y seguridad de "
            "aplicaciones (OWASP). Busco prácticas o un primer rol como desarrollador backend o full stack."
        ),
        "projects_h": "Proyectos",
        "projects": [
            ("Samaria360", "Plataforma de turismo · Capstone · Principal contribuidor (46 de 77 PRs)",
             "Java 17, Spring Boot, Spring Cloud Gateway, RabbitMQ, PostgreSQL, MongoDB, React, Docker, k6",
             ["Cinco microservicios con arquitectura hexagonal detrás de un API Gateway, con eventos asíncronos por RabbitMQ.",
              "Desarrollé los microservicios de reservas, catálogo, analítica y chatbot, rutas del gateway y pantallas del frontend.",
              "Pruebas de concurrencia, de carga (k6) y de tolerancia a fallos de los requisitos no funcionales."]),
            ("logistics-packages", "Sistema de gestión logística · Proyecto en equipo",
             "Java 21, Spring Boot, React, TypeScript, PostgreSQL, AWS SQS/S3, Docker, GitHub Actions",
             ["Implementé el pesaje y la integración del frontend con la API real (admisión, almacenaje, clasificación y novedades).",
              "Tras la entrega, estabilicé el proyecto: 208 tests en verde, CI, Docker Compose de un comando y corrección de bugs de integración."]),
            ("ecocompost-iot", "Monitoreo IoT de una compostera · Proyecto académico",
             "Spring Boot, React, TypeScript, H2",
             ["API con motor de diagnóstico por umbrales y dashboard web, con datos simulados por el contrato de un ESP32."]),
            ("proyecto-final-he", "Hacking ético · Proyecto académico",
             "Node.js, MongoDB, Docker, OWASP Top 10",
             ["Explotación y mitigación de vulnerabilidades OWASP sobre NodeGoat; responsable de la inyección NoSQL."]),
        ],
        "skills_h": "Habilidades técnicas",
        "skills": [
            ("Backend", "Java, Spring Boot, Spring Security (JWT), Spring Data JPA y MongoDB, Spring Cloud Gateway, Flyway, REST"),
            ("Arquitectura", "Hexagonal, microservicios, mensajería asíncrona (RabbitMQ, SQS)"),
            ("Frontend", "React, TypeScript, Vite, Tailwind CSS"),
            ("Datos", "PostgreSQL, MongoDB, SQL Server"),
            ("DevOps y calidad", "Docker, GitHub Actions, JUnit, Mockito, Testcontainers, ArchUnit, k6"),
        ],
        "edu_h": "Formación",
        "edu": ("Ingeniería de Sistemas", "Universidad del Magdalena", "2023 – actualidad · Grado previsto: 2027-2"),
        "certs_h": "Certificaciones",
        "certs": [
            ("Defensa de la red", "Cisco Networking Academy", "nov. 2026"),
            ("Seguridad de Terminales", "Cisco Networking Academy", "oct. 2026"),
            ("Introducción a Ciberseguridad", "Cisco Networking Academy", "ago. 2026"),
        ],
    },
    "en": {
        "title": "Backend Developer · Java & Spring Boot",
        "location": "Santa Marta, Colombia",
        "profile_h": "Profile",
        "profile": (
            "Systems Engineering student focused on backend development with Java and Spring Boot. "
            "I build APIs with hexagonal architecture, automated tests, continuous integration and Docker-based "
            "deployment. Experience with microservices, asynchronous messaging and application security (OWASP). "
            "Looking for an internship or a first role as a backend or full-stack developer."
        ),
        "projects_h": "Projects",
        "projects": [
            ("Samaria360", "Tourism platform · Capstone · Top contributor (46 of 77 PRs)",
             "Java 17, Spring Boot, Spring Cloud Gateway, RabbitMQ, PostgreSQL, MongoDB, React, Docker, k6",
             ["Five hexagonal microservices behind an API gateway, with asynchronous events over RabbitMQ.",
              "Built the booking, catalog, analytics and chatbot services, gateway routes and frontend screens.",
              "Concurrency, load (k6) and fault-tolerance testing of the non-functional requirements."]),
            ("logistics-packages", "Logistics management system · Team project",
             "Java 21, Spring Boot, React, TypeScript, PostgreSQL, AWS SQS/S3, Docker, GitHub Actions",
             ["Implemented package weighing and integrated the frontend with the real API (intake, storage, sorting and incidents).",
              "After delivery, stabilized the project: 208 passing tests, CI, one-command Docker Compose and integration bug fixes."]),
            ("ecocompost-iot", "IoT composter monitoring · Academic project",
             "Spring Boot, React, TypeScript, H2",
             ["API with a threshold-based diagnosis engine and a web dashboard, fed by simulated data over an ESP32 contract."]),
            ("proyecto-final-he", "Ethical hacking · Academic project",
             "Node.js, MongoDB, Docker, OWASP Top 10",
             ["Exploitation and mitigation of OWASP vulnerabilities in NodeGoat; owned the NoSQL injection case."]),
        ],
        "skills_h": "Technical skills",
        "skills": [
            ("Backend", "Java, Spring Boot, Spring Security (JWT), Spring Data JPA and MongoDB, Spring Cloud Gateway, Flyway, REST"),
            ("Architecture", "Hexagonal, microservices, asynchronous messaging (RabbitMQ, SQS)"),
            ("Frontend", "React, TypeScript, Vite, Tailwind CSS"),
            ("Data", "PostgreSQL, MongoDB, SQL Server"),
            ("DevOps & quality", "Docker, GitHub Actions, JUnit, Mockito, Testcontainers, ArchUnit, k6"),
        ],
        "edu_h": "Education",
        "edu": ("Systems Engineering (5-year engineering degree)", "Universidad del Magdalena", "2023 – present · Expected graduation: second half of 2027"),
        "certs_h": "Certifications",
        "certs": [
            ("Network Defense", "Cisco Networking Academy", "Nov 2026"),
            ("Endpoint Security", "Cisco Networking Academy", "Oct 2026"),
            ("Introduction to Cybersecurity", "Cisco Networking Academy", "Aug 2026"),
        ],
    },
}


class CV(FPDF):
    def section(self, title):
        self.ln(3)
        self.set_font("UI", "B", 11)
        self.set_text_color(*ACCENT)
        self.cell(0, 6, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.3)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(2)

    def body(self, text, size=9.5, color=TEXT, style=""):
        self.set_font("UI", style, size)
        self.set_text_color(*color)
        self.multi_cell(0, 4.6, text, new_x="LMARGIN", new_y="NEXT", align="L")


def build(lang):
    c = CONTENT[lang]
    pdf = CV(format="A4")
    pdf.set_margins(16, 14, 16)
    pdf.set_auto_page_break(True, margin=12)
    pdf.add_font("UI", "", FONTS + "segoeui.ttf")
    pdf.add_font("UI", "B", FONTS + "segoeuib.ttf")
    pdf.set_title("Bryan Robles — CV")
    pdf.set_author("Bryan Robles")
    pdf.add_page()

    # Header
    pdf.set_font("UI", "B", 22)
    pdf.set_text_color(*TEXT)
    pdf.cell(0, 10, "Bryan Robles", new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.set_font("UI", "B", 12)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, c["title"], new_x="LMARGIN", new_y="NEXT", align="L")
    # Contact line 1: location and email; line 2: profile links
    pdf.set_font("UI", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(pdf.get_string_width(c["location"]) + 1, 5, c["location"])
    pdf.cell(pdf.get_string_width("  ·  "), 5, "  ·  ")
    pdf.set_text_color(*ACCENT)
    pdf.cell(pdf.get_string_width(EMAIL), 5, EMAIL, link="mailto:" + EMAIL)
    pdf.ln(5)
    first = True
    for label, url in LINKS:
        if not first:
            pdf.set_text_color(*MUTED)
            pdf.cell(pdf.get_string_width("  ·  "), 5, "  ·  ")
        first = False
        pdf.set_text_color(*ACCENT)
        pdf.cell(pdf.get_string_width(label), 5, label, link=url)
    pdf.ln(7)

    pdf.section(c["profile_h"])
    pdf.body(c["profile"])

    pdf.section(c["projects_h"])
    for name, subtitle, stack, bullets in c["projects"]:
        pdf.set_font("UI", "B", 10.5)
        pdf.set_text_color(*TEXT)
        pdf.cell(pdf.get_string_width(name) + 2, 5.5, name)
        pdf.set_font("UI", "", 9)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 5.5, "— " + subtitle, new_x="LMARGIN", new_y="NEXT", align="L")
        for b in bullets:
            x = pdf.get_x()
            pdf.set_font("UI", "", 9.5)
            pdf.set_text_color(*TEXT)
            pdf.cell(4, 4.6, "•")
            pdf.multi_cell(0, 4.6, b, new_x="LMARGIN", new_y="NEXT", align="L")
            pdf.set_x(x)
        pdf.set_font("UI", "", 8.5)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 4.4, stack, new_x="LMARGIN", new_y="NEXT", align="L")
        pdf.ln(1.5)

    pdf.section(c["skills_h"])
    for label, items in c["skills"]:
        pdf.set_font("UI", "B", 9.5)
        pdf.set_text_color(*TEXT)
        pdf.cell(34, 5, label)
        pdf.set_font("UI", "", 9.5)
        pdf.multi_cell(0, 5, items, new_x="LMARGIN", new_y="NEXT", align="L")

    pdf.section(c["edu_h"])
    degree, school, when = c["edu"]
    pdf.set_font("UI", "B", 10)
    pdf.set_text_color(*TEXT)
    pdf.cell(0, 5, degree, new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.body(f"{school} · {when}", color=MUTED)

    pdf.section(c["certs_h"])
    for name, org, date in c["certs"]:
        pdf.set_font("UI", "B", 9.5)
        pdf.set_text_color(*TEXT)
        pdf.cell(pdf.get_string_width(name) + 2, 5, name)
        pdf.set_font("UI", "", 9.5)
        pdf.set_text_color(*MUTED)
        pdf.cell(0, 5, f"— {org} · {date}", new_x="LMARGIN", new_y="NEXT", align="L")

    name = "Bryan-Robles-CV-ES.pdf" if lang == "es" else "Bryan-Robles-CV-EN.pdf"
    pdf.output(f"{OUT}/{name}")
    print(name, "páginas:", pdf.page_no())


for lang in ("es", "en"):
    build(lang)
