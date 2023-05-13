const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

let timeLeft = {
  d: 0,
  h: 0,
  m: 0,
  s: 0,
}

let totalSeconds;

function init() {
  // totalSeconds = 777341
  totalSeconds = 1209600;
  setTimeLeft()
  let interval = setInterval(() => {
    countTime();
    if (totalSeconds < 0) {
      clearInterval(interval)
    }
  }, 1000)
}

function countTime() {
  if (totalSeconds > 0) {
    --timeLeft.s;
    if (timeLeft.m >= 0 && timeLeft.s < 0) {
      timeLeft.s = 59;
      --timeLeft.m;
      if (timeLeft.h >= 0 && timeLeft.m < 0) {
         timeLeft.m = 59;
         --timeLeft.h;
         if (timeLeft.d >= 0 && timeLeft.h < 0) {
           timeLeft.h = 23;
           --timeLeft.d
         }
      }
    }
  }
  --totalSeconds
  printTime();
}

function printTime() {
  animateFlip(days, timeLeft.d)
  animateFlip(hours, timeLeft.h)
  animateFlip(minutes, timeLeft.m)
  animateFlip(seconds, timeLeft.s)      
}

function animateFlip(element, value) { 
  const valueInDom = element.querySelector('.timer-bottom-back').innerText;
  const currentValue = value < 10 ? '0' + value : '' + value;

  if (valueInDom === currentValue) return;

  element.querySelector('.timer-top-back div').innerText = currentValue;
  element.querySelector('.timer-bottom-back div').innerText = currentValue;

  gsap.to(element.querySelector('.timer-top'), 0.7, {
    rotationX: '-180deg',
    transformPerspective: 300,
    ease: Quart.easeOut,
    onComplete: function() {
      element.querySelector('.timer-top').innerText = currentValue;
      element.querySelector('.timer-bottom').innerText = currentValue;
      gsap.set(element.querySelector('.timer-top'), {rotationX: 0})
    }
  })

  gsap.to(element.querySelector('.timer-top-back'), 0.7, {
    rotationX: '0',
    transformPerspective: 300,
    ease: Quart.easeOut,
    clearProps: 'all'
  })

}

function setTimeLeft() {
  timeLeft.d = Math.floor(totalSeconds / (60 * 60 * 24));
  timeLeft.h = Math.floor(totalSeconds / (60 * 60) % 24);
  timeLeft.m = Math.floor(totalSeconds / (60) % 60);
  timeLeft.s = Math.floor(totalSeconds % (60));
}

init()


