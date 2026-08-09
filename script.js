// new Date(year, month, day, hour, minute)
// Note: month is 0-indexed (0 = Jan, 1 = Feb, 11 = Dec)
const launchDate = new Date(2027, 1, 8, 0, 0); // Feb 8, 2027, at 12:00 AM

// DOM ELEMENTS
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const emailForm = document.getElementById("email-form");
const successMessage = document.getElementById("success");
const errorMessage = document.getElementById("error");
const errorText = errorMessage.querySelector("span");

function updateCountdown() {
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateTime(daysEl, days);
    updateTime(hoursEl, hours);
    updateTime(minutesEl, minutes);
    updateTime(secondsEl, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

emailForm.addEventListener("submit", (e) => {
    e.preventDefault(); // this will make sure to not reload the page

    const button = emailForm.querySelector("button");
    const emailInput = emailForm.querySelector("input");

    if(emailInput.value.trim() === ""){
        showError("Field can't be empty");
        return;
    }

    if(!emailInput.checkValidity() ){
        showError("Please enter a valid email address");
        return;
    }
    
    errorMessage.classList.add("hidden");

    button.innerHTML = "Subscribing...<i class='fa-solid fa-spinner fa-spin'></i>";
    button.disabled = true;

    setTimeout(() => {
        emailForm.classList.add("hidden");
        successMessage.classList.remove("hidden");
    }, 1000);

    setTimeout(() => {
        emailForm.reset();
        button.innerHTML = `Notify Me <i class="fa-solid fa-arrow-right"></i>`;
        button.disabled = false;
        emailForm.classList.remove("hidden");
        successMessage.classList.add("hidden");
    }, 4000);
});

function showError(message) {
    errorText.innerText = message;
    errorMessage.classList.remove("hidden");

    setTimeout(() => {
        errorMessage.classList.add("hidden");
    }, 1000);
}

function updateTime(element, value) {
    const newValue = String(value).padStart(2, "0");
    const oldValue = element.dataset.value;

    if (oldValue === undefined || oldValue.length !== newValue.length) {
        element.dataset.value = newValue;
        element.innerHTML = "";

        [...newValue].forEach((digit) => {
            element.appendChild(makeDigitBox(digit));
        });
        return;
    }

    if (oldValue === newValue) return;

    element.dataset.value = newValue;
    const boxes = element.children;

    [...newValue].forEach((digit, i) => {
        if (oldValue[i] === digit) return; // this position didn't change

        const box = boxes[i];
        const current = box.querySelector(".digit-current");

        // outgoing digit: slide up and fade, in place
        current.classList.remove("digit-current");
        current.classList.add("digit-out");
        current.addEventListener("animationend", () => current.remove(), { once: true });

        // incoming digit: slides in from below, in the SAME box
        const incoming = document.createElement("span");
        incoming.className = "digit digit-in digit-current";
        incoming.textContent = digit;
        box.appendChild(incoming);
        incoming.addEventListener("animationend", () => incoming.classList.remove("digit-in"), { once: true });
    });
}

function makeDigitBox(digit) {
    const box = document.createElement("span");
    box.className = "digit-box";

    const span = document.createElement("span");
    span.className = "digit digit-current";
    span.textContent = digit;

    box.appendChild(span);
    return box;
}