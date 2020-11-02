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
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;
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

  checkAllForm = () => {
    this.cleanErrorMessage();
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;
    const nameResult = validator.validateName(this.nameInput.value);
    const secondNameResult = validator.validateSecondName(
      this.secondNameInput.value
    );
    const emailResult = validator.validateValidEmail(this.emailInput.value);
    const uniqueEmailResult = validator.validateUniqueEmail(
      this.emailInput.value
    );
    const passwordResult = validator.validatePassword(password);
    const repeatPasswordResult = validator.validateRepeatPassword(
      password,
      repeatPassword
    );
    if (
      nameResult &&
      secondNameResult &&
      emailResult & uniqueEmailResult &&
      passwordResult &&
      repeatPasswordResult
    ) {
      return true;
    } else {
      this.setErrorMessageAll();
      return false;
    }
  };

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
    const name = this.countryInput.value;
    const secondName = this.secondNameInput.value;
    const country = this.countryInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    if (this.checkAllForm()) {
      // create the new user
      const newUser = new User(name, secondName, country, email, password);

      // Save the user in the database
      db.saveNewUser(newUser);

      // empty the form
      this.nameInput.value = "";
      this.secondNameInput = "";
      this.countryInput.value = "";
      this.emailInput.value = "";
      this.passwordInput.value = "";
      this.repeatPasswordInput = "";
    } else {
      this.cleanErrorMessage();
      this.setErrorMessage();
    }
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
