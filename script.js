// ==========================
// Typed.js Animation
// ==========================

var typed = new Typed("#element", {
    strings: [
        "Frontend Developer",
        "Java Developer",
        "Python Programmer",
        "Software Engineer"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});

// ==========================
// Download Resume Button
// ==========================

const resumeBtn = document.querySelector(".resume-btn");

if (resumeBtn) {
    resumeBtn.addEventListener("click", function () {
        window.open("Resume.pdf", "_blank");
    });
}

// ==========================
// GitHub Button
// ==========================

const githubBtn = document.querySelector(".github-btn");

if (githubBtn) {
    githubBtn.addEventListener("click", function () {
        window.open("https://github.com/nikhilyadav-06", "_blank");
    });
}

// ==========================
// Smooth Scrolling
// ==========================

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

        if (href.startsWith("#")) {
            e.preventDefault();

            document.querySelector(href).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ==========================
// Welcome Message
// ==========================

window.onload = function () {
    console.log("Welcome to Nikhil Portfolio");
};

// ==========================
// Button Hover Effect
// ==========================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
    });

});