// Animação suave de rolagem para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Animação de elementos quando entram na viewport
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelectorAll(".feature-card, .screenshot, .faq-item")
        .forEach((el) => {
            el.classList.remove("fade-in");
            observer.observe(el);
        });

    // Verificar se o APK está disponível
    const downloadBtn = document.querySelector(".download-btn");
    if (downloadBtn) {
        fetch(downloadBtn.getAttribute("href"))
            .then((response) => {
                if (!response.ok) {
                    downloadBtn.textContent = "Em breve disponível";
                    downloadBtn.classList.add("disabled");
                    downloadBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        alert(
                            "O APK ainda não está disponível para download. Por favor, volte em breve!"
                        );
                    });
                }
            })
            .catch(() => {
                // Silenciosamente falha se o arquivo não existir
            });
    }

    // Adicionar contador de downloads fictício
    const downloadCounter = document.createElement("div");
    downloadCounter.className = "download-counter";
    downloadCounter.innerHTML =
        //'<i class="fas fa-download"></i> <span id="download-count">1,234</span> downloads';

    const ctaSection = document.querySelector(".cta .container");
    if (ctaSection) {
        ctaSection.appendChild(downloadCounter);
    }

    // Animação de contagem para o contador de downloads
    const countElement = document.getElementById("download-count");
    if (countElement) {
        const finalCount = 1234;
        let currentCount = 0;
        const duration = 2000; // 2 segundos
        const frameRate = 30; // frames por segundo
        const increment = finalCount / ((duration / 1000) * frameRate);

        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= finalCount) {
                currentCount = finalCount;
                clearInterval(counter);
            }
            countElement.textContent =
                Math.floor(currentCount).toLocaleString();
        }, 1000 / frameRate);
    }
});

// Adicionar data atual ao copyright
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector(".copyright");
if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace(
        "2023",
        currentYear
    );
}

// Adicionar funcionalidade de toggle para as perguntas frequentes
document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.maxHeight;

        // Fechar todas as respostas
        document.querySelectorAll(".faq-answer").forEach((a) => {
            a.style.maxHeight = null;
        });

        // Abrir a resposta clicada se não estava aberta
        if (!isVisible) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});
