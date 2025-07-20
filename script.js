let screen = document.getElementById("screen");
let message = document.getElementById("message");
let attemptsEl = document.getElementById("attempts");
let averageEl = document.getElementById("average");

let state = "waiting"; // waiting, ready, now
let timeout;
let startTime;
let reactionTimes = [];
let attempts = 0;

screen.addEventListener("click", () => {
  if (state === "waiting") {
    message.textContent = "Wait for green...";
    screen.style.backgroundColor = "#b00020"; // red
    state = "ready";
    timeout = setTimeout(() => {
      screen.style.backgroundColor = "#006400"; // green
      message.textContent = "CLICK!";
      startTime = Date.now();
      state = "now";
    }, Math.random() * 3000 + 2000); // random 2–5 sec
  } else if (state === "ready") {
    // clicked too early
    clearTimeout(timeout);
    message.textContent = "Too soon! Try again.";
    screen.style.backgroundColor = "#2c2c2c";
    state = "waiting";
  } else if (state === "now") {
    // valid click
    let reactionTime = Date.now() - startTime;
    reactionTimes.push(reactionTime);
    attempts++;
    attemptsEl.textContent = attempts;
    message.textContent = `Your time: ${reactionTime} ms`;

    if (attempts >= 3) {
      let avg = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / 3);
      averageEl.textContent = avg;
      message.textContent = `Average Reaction Time: ${avg} ms\nClick to restart`;
      state = "done";
    } else {
      state = "waiting";
    }

    screen.style.backgroundColor = "#2c2c2c";
  } else if (state === "done") {
    // reset game
    reactionTimes = [];
    attempts = 0;
    attemptsEl.textContent = "0";
    averageEl.textContent = "-";
    message.textContent = "Click to start";
    screen.style.backgroundColor = "#2c2c2c";
    state = "waiting";
  }
});
