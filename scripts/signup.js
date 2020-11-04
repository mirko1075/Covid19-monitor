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
    validator.validateValidEmail(this.emailInput.value);
    validator.validateUniqueEmail(this.emailInput.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handlePasswordInput = (event) => {
    validator.validatePassword(this.passwordInput.value);
    // validator.validateRepeatPassword(this.passwordInput.value, this.repeatPasswordInput.value);
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  handleRepeatPasswordInput = (event) => {
    // console.log(password, repeatPassword);
    // validator.validatePassword(this.passwordInput.value);
    validator.validateRepeatPassword(
      this.passwordInput.value,
      this.repeatPasswordInput.value
    );
    this.cleanErrorMessage();
    this.setErrorMessage();
  };

  checkAllForm = () => {
    this.cleanErrorMessage();
    delete validator.errors.lastError;
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
      this.passwordInput.value,
      this.repeatPasswordInput.value
    );
    delete validator.errors.lastError;
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
    // console.log(errorsObj);

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
    let contentToAppend = "";
    for (let i = 0; i < errorStringsArr.length; i++) {
      contentToAppend += "<p>" + errorStringsArr[i] + "</p>";
    }
    // console.log(this.errorsContainer);
    this.errorsContainer.innerHTML = contentToAppend;
    // console.log(this.errorsContainer.innerHTML);
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

    // console.log("Check:", this.checkAllForm());
    if (this.checkAllForm()) {
      // create the new user
      const newUser = new User(name, secondName, country, email, password);

      // Save the user in the database
      db.saveNewUser(newUser);

      // empty the form
      this.nameInput.value = "";
      this.secondNameInput.value = "";
      this.countryInput.value = "";
      this.emailInput.value = "";
      this.passwordInput.value = "";
      this.repeatPasswordInput.value = "";

      const p = document.createElement("p");

      p.textContent = `Yo signed up correctly`;
      p.classList.add("correct-message");
      this.errorsContainer.appendChild(p);
      this.redirect();
    } else {
      this.cleanErrorMessage();
      this.setErrorMessageAll();
    }
  };
  redirect = () => {
    setTimeout(function () {
      location.assign("login.html");
    }, 2000);

    // setTimeout( () => location.assign("dashboard.html"), 2000)
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
