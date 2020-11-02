"use strict";

class Signup {
  constructor() {
    this.name = document.getElementById("name");
    this.secondName = document.getElementById("secondname");
    this.country = document.getElementById("country");
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.repeatpassword = document.getElementById("repeat-password");
    this.buttonInput = document.getElementById("signup-button");
    this.errorsContainer = document.querySelector(".message-container");
  }
  handleNameInput = (event) => {
    validator.validateName(this.name.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleSecondNameInput = (event) => {
    validator.validateSecondName(this.secondName.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateValidEmail(this.email.value);
    validator.validateUniqueEmail(this.email.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleRepeatPasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);
    this.cleanErrorMessage();
    this.setErrorMessages();
  };

  cleanErrorMessage = () => {
    this.errorsContainer.innerHTML = "";
  };

  setErrorMessage = () => {
    //console.log(this.errorsContainer.innerHTML);
    const errorsObj = validator.getErrors();
    const p = document.createElement("p");
    p.innerHTML = errorsObj.lastError;

    this.errorsContainer.appendChild(p);
  };

  setErrorMessageResume = () => {
    this.errorsContainer.innerHTML = "";

    const errorsObj = validator.getErrors();

    const errorStringsArr = Object.values(errorsObj);

    errorStringsArr.forEach((str) => {
      const p = document.createElement("p");
      p.textContent = str;

      this.errorsContainer.appendChild(p);
    });
  };

  // Refactor display only one message for each field and when submit all messages
  setErrorMessageAll = () => {
    this.errorsContainer.innerHTML = "";

    const errorsObj = validator.getErrors();

    const errorStringsArr = Object.values(errorsObj);

    errorStringsArr.forEach((str) => {
      const p = document.createElement("p");
      p.textContent = str;

      this.errorsContainer.appendChild(p);
    });
  };

  saveData = (event) => {
    event.preventDefault();
  };

  addListners = () => {
    this.name.addEventListener("blur", this.handleNameInput);
    this.secondName.addEventListener("blur", this.handleSecondNameInput);
    this.email.addEventListener("input", this.handleEmailInput);
    this.email.addEventListener("blur", this.handleEmailInput);
    this.password.addEventListener("input", this.handlePasswordInput);
    this.password.addEventListener("blur", this.handlePasswordInput);
    this.repeatpassword.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );
    this.repeatpassword.addEventListener(
      "blur",
      this.handleRepeatPasswordInput
    );
    this.buttonInput.addEventListener("click", this.saveData);
  };
}
const signup = new Signup();
window.addEventListener("load", signup.addListners);
