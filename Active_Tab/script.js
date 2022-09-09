// Tài liệu tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
// Hướng dẫn sử dụng requestAnimationFrame: https://viblo.asia/p/tao-hieu-ung-dong-so-tang-dan-don-gian-chi-bang-javascript-thuan-phan-2-requestanimationframe-63vKjzbkK2R
// Video dùng requestAnimationFrame: https://www.youtube.com/watch?v=oEDDFwz_GOs

/*
    TÓM TẮT VỀ window.requestAnimationFrame

    

*/

// Sử dụng requestAnimationFrame cho counter up

// Kết thúc không đồng đều
function animateNumber(
  finalNumber,
  duration = 5000,
  startNumber = 0,
  callback
) {
  let currentNumber = startNumber;

  function updateNumber() {
    if (currentNumber < finalNumber) {
      let inc = Math.ceil(finalNumber / (duration / 17));
      if (currentNumber + inc > finalNumber) {
        currentNumber = finalNumber;
        callback(currentNumber);
      } else {
        currentNumber += inc;
        callback(currentNumber);
        requestAnimationFrame(updateNumber);
      }
    }
  }

  requestAnimationFrame(updateNumber);
}

// Tính toán theo thời gian trôi qua (kết thúc đồng đều)

function animateNumberOpt(
  finalNumber,
  duration = 5000,
  startNumber = 0,
  callback
) {
  const startTime = performance.now();
  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime;
    if (elapsedTime > duration) {
      callback(finalNumber);
    } else {
      const rate = elapsedTime / duration;
      const currentNumber = Math.round(rate * finalNumber);
      callback(currentNumber);
      requestAnimationFrame(updateNumber);
    }
  }
  requestAnimationFrame(updateNumber);
}

// Cách khác với Interval
function animateInterval(
  finalNumber,
  duration = 5000,
  startNumber = 0,
  callback
) {
  let currentNumber = startNumber;
  const perFrame = 1000 / 60;
  let timeLeft = 0;

  const increase = setInterval(() => {
    if (timeLeft > duration) {
      currentNumber = finalNumber;
      clearInterval(increase);
      callback(currentNumber);
    } else {
      const rate = timeLeft / duration;
      currentNumber = Math.round(rate * finalNumber);
      callback(currentNumber);
      timeLeft += perFrame;
    }
  }, perFrame);
}

const counterEls = [
  {
    value: 1200,
    duration: 3000,
    className: "review-num",
  },
  {
    value: 90,
    duration: 3000,
    className: "project-num",
  },
  {
    value: 225,
    duration: 3000,
    className: "customer-num",
  },
];

for (let counterEl of counterEls) {
  animateNumberOpt(counterEl.value, counterEl.duration, 50, (number) => {
    const formattedNumber = number.toLocaleString();
    document.querySelector(`.${counterEl.className}`).textContent =
      formattedNumber;
  });
}

// Sử dụng requestAnimationFrame cho get link
const timerEl = document.querySelector(".counter-num");
const getLinkBtn = document.querySelector("button");

let timer = 0;
let counter = 60;
const INTERVAL = 1000;

function decreaseCounter() {
  timerEl.textContent = counter;
  counter--;
}

function rePaint(currentTimer) {
  if (timer <= currentTimer) {
    decreaseCounter();
    timer = currentTimer + INTERVAL;
  }

  if (counter > 0) {
    requestAnimationFrame(rePaint);
  } else {
    timerEl.textContent = 0;
    getLinkBtn.removeAttribute("disabled");
  }
}

requestAnimationFrame(rePaint);
