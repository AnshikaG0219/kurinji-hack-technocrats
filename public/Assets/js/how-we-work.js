const progress = document.getElementById("progress");
const progress1 = document.getElementById("progress1");
const prev = document.getElementById("prev-customer");
const prev1 = document.getElementById("prev-business");
const next = document.getElementById("next-customer");
const next1 = document.getElementById("next-business");
const circles = document.querySelectorAll(".circle-customer");
const circles1 = document.querySelectorAll(".circle-business");
const steps = document.querySelectorAll(".step-customer");
const steps1 = document.querySelectorAll(".step-business");

let currentActive = 1;

next.addEventListener("click", () => {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update_img();
    update();
});

prev.addEventListener("click", () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update_img();
    update();
});

function update_img() {
    steps.forEach((step, index) => {
        if (index == currentActive - 1) {
            step.classList.add("img-active");
        } else {
            step.classList.remove("img-active");
        }
    });
}

function update() {
    circles.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add("active-customer");
        } else {
            circle.classList.remove("active-customer");
        }
    });

    const actives = document.querySelectorAll(".active-customer");
    progress.style.width = `${((actives.length - 1) / (circles.length - 1)) * 100
        }%`;

    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}

let currentActive1 = 1;

next1.addEventListener("click", () => {
    currentActive1++;
    if (currentActive1 > circles.length) {
        currentActive1 = circles.length;
    }
    update_img1();
    update1();
});

prev1.addEventListener("click", () => {
    currentActive1--;
    if (currentActive1 < 1) {
        currentActive1 = 1;
    }
    update_img1();
    update1();
});

function update_img1() {
    steps1.forEach((step, index) => {
        if (index == currentActive1 - 1) {
            step.classList.add("img-active");
        } else {
            step.classList.remove("img-active");
        }
    });
}

function update1() {
    circles1.forEach((circle, index) => {
        if (index < currentActive1) {
            circle.classList.add("active-business");
        } else {
            circle.classList.remove("active-business");
        }
    });

    const actives1 = document.querySelectorAll(".active-business");
    progress1.style.width = `${((actives1.length - 1) / (circles1.length - 1)) * 100
        }%`;

    if (currentActive1 === 1) {
        prev1.disabled = true;
    } else if (currentActive1 === circles1.length) {
        next1.disabled = true;
    } else {
        prev1.disabled = false;
        next1.disabled = false;
    }
}