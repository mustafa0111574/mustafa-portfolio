// Portfolio interactions: reveal-on-scroll, typed role, mobile navigation.
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = [...document.querySelectorAll(".nav-links a")];

    // Reveal elements when they enter the viewport.
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    // Compact sticky header after scrolling.
    const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 25);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Mobile menu.
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Highlight the current section in the navigation.
    const sections = [...document.querySelectorAll("main section[id]")];
    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                    });
                }
            });
        }, { rootMargin: "-35% 0px -55% 0px" });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    // Lightweight typing animation for the professional role.
    const typedRole = document.querySelector(".typed-role");
    const roles = ["Flutter Developer", "Mobile App Developer", "Clean Code Enthusiast"];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typedRole && !reduceMotion) {
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        const type = () => {
            const current = roles[roleIndex];
            if (deleting) {
                charIndex--;
                typedRole.textContent = current.slice(0, charIndex);
                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 350);
                    return;
                }
                setTimeout(type, 45);
            } else {
                const next = roles[roleIndex];
                charIndex++;
                typedRole.textContent = next.slice(0, charIndex);
                if (charIndex >= next.length) {
                    deleting = true;
                    setTimeout(type, 1700);
                    return;
                }
                setTimeout(type, 75);
            }
        };
        setTimeout(type, 1800);
    }
});
