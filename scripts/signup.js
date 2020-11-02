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
    this.errorsWrapper = document.querySelector(".message-container");
  }
  handleName = (event) => {
    validator.validateName(name);
    this.setErrorMessage();
  };

  handleSecondName = (event) => {
    validator.validateSecondName(this.secondName);
    this.setErrorMessage();
  };

  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateValidEmail(email);
    validator.validateUniqueEmail(email);

    this.setErrorMessages();
  };

  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  handleRepeatPasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  setErrorMessage = () => {
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();

    const errorStringsArr = Object.values(errorsObj);

    errorStringsArr.forEach((str) => {
      const p = document.createElement("p");
      p.textContent = str;

      this.errorsWrapper.appendChild(p);
    });
  };

  // Refactor display only one message for each field and when submit all messages
  setErrorMessageAll = () => {
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();

    const errorStringsArr = Object.values(errorsObj);

    errorStringsArr.forEach((str) => {
      const p = document.createElement("p");
      p.textContent = str;

      this.errorsWrapper.appendChild(p);
    });
  };

  saveData = (event) => {
    event.preventDefault();
  };

  addListners = () => {
    this.name.addEventListener("blur", this.handleName);
    this.secondName.addEventListener("blur", this.handleSecondName);
    this.email.addEventListener("input", this.handleEmail);
    this.password.addEventListener("input", this.handlePassword);
    this.repeatpassword.addEventListener("input", this.handleRepeatPassword);
    this.buttonInput.addEventListener("click", this.saveData);
  };
}
const signup = new Signup();
window.addEventListener("load", signup.addListners);
