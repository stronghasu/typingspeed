const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function randomParagraph() {
  //getting 랜덤 넘버 그리고 그것은 항상 paragraph 보다 작다
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  // getting random item from the 문단 array, splitting all characters of ir
  //adding each character inside span and then adding this span inside p tag
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  // focusing input field on keydown or click event
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
// corect
function initTyping() {
  const character = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < character.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      //once timer is start, it won't restart again on every key clicked
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    //if user hasn't entered any character of pressed backspace
    if (typedChar == null) {
      charIndex--; // decrement charIndex
      // decrement mistakes only if the charIndex span contains incorrect class
      if (character[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      character[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (character[charIndex].innerText === typedChar) {
        // 만약 사용자가 글자를 치면 보여준다 글자를 매치시킨다음 correct나 incorrect 클래스를 더함
        // correct class else increment the mistakes and add ths incorrect class
        character[charIndex].classList.add("correct");
      } else {
        mistakes++;
        character[charIndex].classList.add("incorrect");
      }
      charIndex++; //increment charIndex either user typed correct or incorrect character
    }

    character.forEach((span) => span.classList.remove("active"));
    character[charIndex].classList.add("active");

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    // if wpm value  is 0, empty , or infinity then setting it's value to 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}
function initTimer() {
  // if timeLeft is greater than 0 then decrement the time Left else clear the timer
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}
function resetGame() {
  //calling loadParagraph function and
  //resetting each variables and elements value to default
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  (timeLeft = maxTime), (charIndex = mistakes = isTyping = 0);
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0; // cpm will not count mistakes
}
randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
