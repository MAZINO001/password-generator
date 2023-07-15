const lengthSlider = document.querySelector(".pass-length input");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const options = document.querySelectorAll(".option input");
const generateBtn = document.querySelector(".generate-btn");
const copyIcon = document.querySelector(".input-box span");

// const copyIcon = document.querySelector(".input-box span")

const characters = {
  //object for those
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    passlengt = lengthSlider.value,
    excludeDuplicate = false;

  // looping through each option's checkbox
  options.forEach((option) => {
    // if check box is cheked
    if (option.checked) {
      //if checkboxidisn't exc-duplicate && spaces
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        //adding particular key value from character object to staticpassword
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        //ading space at the beginning & end of staticpassword
        staticPassword += `   ${staticPassword}   `;
      } else {
        //esle pass true value  to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passlengt; i++) {
    //getting random character from thestatic password
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      //if random password doesn't includes the current random character on randomChar is equal
      //to space " " then add random character to random password else decrement i by -1
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      //else random character to randompasswod
      randomPassword += randomChar;
    }
  }
  //passing randomPassword to passwordInput value
  passwordInput.value = randomPassword;
};

const updatePassInncator = () => {
  //if lengthSlidre value is less than 8 pass weak as passIndicator id elseif lengthSlider
  //value is less tahn 16 then pass "medium" as id else pass "strong" as id
  //you can custom your own
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.classList.remove(`fa-copy`);
  copyIcon.classList.add(`fa-square-check`);
  setTimeout(() => {
    copyIcon.classList.remove(`fa-square-check`);
    copyIcon.classList.add(`fa-copy`);
  }, 1400);
};

const updateSlider = () => {
  //passing slider value as counter text
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassInncator();
};
updateSlider();
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
