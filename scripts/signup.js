"use strict";

class Signup {
  constructor() {
    this.nameInput = document.getElementById("name");
    this.secondNameInput = document.getElementById("secondname");
    this.countryInput = document.getElementById("country");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.repeatPasswordInput = document.getElementById("repeat-password");
    this.buttonInput = document.getElementById("signup-button");
    this.errorsContainer = document.querySelector(".message-container");
  }
  handleNameInput = (event) => {
    validator.validateName(this.nameInput.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleSecondNameInput = (event) => {
    validator.validateSecondName(this.secondNameInput.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = this.emailInput.value;
    validator.validateValidEmail(this.emailInput.value);
    validator.validateUniqueEmail(this.emailInput.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    const password = passwordInput.value;
    const repeatPasswordInput = this.repeatPasswordInput;

    const repeatPassword = repeatPasswordInput.value;
    validator.validatePassword(password);
    // validator.validateRepeatPassword(password, repeatPassword);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleRepeatPasswordInput = (event) => {
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;
    // console.log(password, repeatPassword);
    // validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

    checkAllForm = (){
      validator.validateName(this.nameInput.value);
      validator.validateSecondName(this.secondNameInput.value);
      validator.validateValidEmail(this.emailInput.value);
      validator.validateUniqueEmail(this.emailInput.value);
      validator.validatePassword(password);
      validator.validateRepeatPassword(password, repeatPassword);
      this.cleanErrorMessage();
      this.setErrorMessageAll();
    }


  cleanErrorMessage = () => {
    this.errorsContainer.innerHTML = "";
  };

  setErrorMessage = () => {
    const errorsObj = validator.getErrors();
    // console.log(errorsObj.lastError);

    if (errorsObj.lastError) {
      const p = document.createElement("p");
      p.innerHTML = errorsObj.lastError;
      this.errorsContainer.appendChild(p);
    }
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
    // Prevent the default behaviour of the form submit button
    // which reloads the page

    event.preventDefault();

    // get the value from all of the inputs
    const name = this.nameInput.value;
    const secondName = this.secondNameInput.value;
    const country = this.countryInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    checkAllForm();
    // create the new user
    const newUser = new User(name, secondName, country, email, password);

    // Save the user in the database
    db.saveNewUser(newUser);

    // empty the form
    this.nameInput.value = "";
    this.secondName = "";
    this.country.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput = "";
  };

  addListners = () => {
    this.nameInput.addEventListener("blur", this.handleNameInput);
    this.secondNameInput.addEventListener("blur", this.handleSecondNameInput);
    this.emailInput.addEventListener("input", this.handleEmailInput);
    this.emailInput.addEventListener("blur", this.handleEmailInput);
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.passwordInput.addEventListener("blur", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );
    this.repeatPasswordInput.addEventListener(
      "blur",
      this.handleRepeatPasswordInput
    );
    this.buttonInput.addEventListener("click", this.saveData);
  };
}
const signup = new Signup();
window.addEventListener("load", signup.addListners);
