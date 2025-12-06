"use strict";


// -------------------- SELECT ELEMENTS --------------------

// Form elements selectors
const myForm = document.getElementById("contactForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const contactChoice = document.getElementsByName("contact");
const commentsInput = document.querySelector("#comments");
const errorSpans = document.querySelectorAll("#contactForm .message");

// Game elements selectors
const gameForm = document.querySelector("#game form");
const userNumDisplay = document.querySelector("#userNum span");
const randomNumDisplay = document.querySelector("#randomNum span");
const gameMsg = document.querySelector("#gameMsg");
const guessInput = document.querySelector("#numGuess");

// Product display elements selectors
const products = document.querySelectorAll("#productDisplay section[id^='product']");
const buttons = document.querySelectorAll("#switcherButtons button");

//Dark mode elements selectors
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// -------------------- VALIDATE FORM FUNCTION --------------------

function valOnSubmit(e) {
    e.preventDefault();

    let isValid = true;

    nameInput.classList.remove("errorInput");
    phoneInput.classList.remove("errorInput");
    emailInput.classList.remove("errorInput");
    commentsInput.classList.remove("errorInput");
    
    errorSpans.forEach(span => span.classList.remove("error"));

    document.querySelector("#success").classList.remove("show");
    document.querySelector("#success").classList.add("hide");


    if (nameInput.value.trim() === "") {
        nameInput.classList.add("errorInput");

        errorSpans[0].classList.add("error");

        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /\d{10}$/;

    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add("errorInput");

        isValid = false;
    }

    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("errorInput");

        isValid = false;
    }

    if (commentsInput.value.trim() === "") {
        commentsInput.classList.add("errorInput");

        errorSpans[1].classList.add("error");

        isValid = false;
    }

    if(isValid) {
        document.querySelector("#success").classList.remove("hide");
        document.querySelector("#success").classList.add("show");

        myForm.reset();
    }
}

// -------------------- GAME FUNCTION --------------------

function playGame(e) {
    e.preventDefault();

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        gameMsg.textContent = "Please enter a number between 1 and 10";
        return;
    }

    const winningNumber = Math.floor(Math.random() * 10) + 1;

    userNumDisplay.textContent = userGuess;
    randomNumDisplay.textContent = winningNumber;

    if (userGuess === winningNumber) {
        gameMsg.textContent = "Congratulations! You win";
    } else {
        gameMsg.textContent = "Sorry, try again"
    }

    guessInput.value = "";
}

// -------------------- PRODUCT DISPLAY FUNCTION --------------------

function showProduct(index) {
    products.forEach((product, i) => {
        if (i === index) {
            product.classList.remove("hiddenItem");
            product.classList.add("currentItem");
        } else {
            product.classList.remove("currentItem");
            product.classList.add("hiddenItem");
        }
    });
}

// Show first product by default
showProduct(0);

// -------------------- DARK MODE TOGGLE --------------------

function toggleTheme() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "Light Mode";
}

// -------------------- EVENT HANDLERS --------------------

// Form handler
myForm.addEventListener("submit", valOnSubmit)

// Game handler
gameForm.addEventListener("submit", playGame);

// Product display handler
buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => showProduct(index));
});

// Dark mode handler
themeToggle.addEventListener("click", toggleTheme);