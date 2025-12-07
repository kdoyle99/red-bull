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

    // Form valid - remove error classes
    let isValid = true;

    nameInput.classList.remove("errorInput");
    phoneInput.classList.remove("errorInput");
    emailInput.classList.remove("errorInput");
    commentsInput.classList.remove("errorInput");
    
    errorSpans.forEach(span => span.classList.remove("error"));

    document.querySelector("#success").classList.remove("show");
    document.querySelector("#success").classList.add("hide");

    // Form invalid - check for errors and add error classes
    // Name validate
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("errorInput");

        errorSpans[0].classList.add("error");

        isValid = false;
    }

    // Regex for email and phone inputs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /\d{10}$/;

    // Phone input validate
    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add("errorInput");

        isValid = false;
    }

    // Email input validate
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("errorInput");

        isValid = false;
    }

    // Comments input validate
    if (commentsInput.value.trim() === "") {
        commentsInput.classList.add("errorInput");

        errorSpans[1].classList.add("error");

        isValid = false;
    }
  
    // Valid form result and form reset
    if(isValid) {
        document.querySelector("#success").classList.remove("hide");
        document.querySelector("#success").classList.add("show");

        myForm.reset();
    }
}

// -------------------- GAME FUNCTION --------------------

function playGame(e) {
    e.preventDefault();

    // Select user guess value
    const userGuess = parseInt(guessInput.value);

    // User guess value validation
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        gameMsg.textContent = "Please enter a number between 1 and 10";
        return;
    }

    // Select randomly computed winning number
    const winningNumber = Math.floor(Math.random() * 10) + 1;

    // Set user number display and random number display to their values
    userNumDisplay.textContent = userGuess;
    randomNumDisplay.textContent = winningNumber;

    // User guess compared to winning number result
    if (userGuess === winningNumber) {
        gameMsg.textContent = "Congratulations! You win";
    } else {
        gameMsg.textContent = "Sorry, try again"
    }

    // Reset user guess input
    guessInput.value = "";
}

// -------------------- PRODUCT DISPLAY FUNCTION --------------------

function showProduct(index) {

    // Change current product displayed to product selected
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

    // Toggle dark mode theme
    body.classList.toggle("dark-mode");

    // Change button to display "Light Mode" after dark mode is toggled or change button to display "Dark Mode" if light mode is toggled
    if (body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode";
    } else {
        themeToggle.textContent = "Dark Mode";
    }

    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Keep theme saved if user reloads or leaves page
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