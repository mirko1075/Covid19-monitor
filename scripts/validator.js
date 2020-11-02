class Validator {
  constructor() {
    // predetermined error messages
    this.invalidName = "Name cannot be blank";
    this.invalidSecondName = "Second name cannot be blank";
    this.invalidEmailError = "Enter a valid email address";
    this.emailExistsError = "The entered email address is already taken.";
    this.passwordError = "Password must be at least 6 characters long";
    this.repeatPasswordError = "Password and reapeat password must match!";

    // object with all the current errors that are shown to the user
    this.errors = {
      lastError: "",
    };
  }
  getErrors = () => {
    // console.log(this.errors);
    return this.errors;
  };

  validateName = (name) => {
    if (name === "") {
      delete this.errors.lastError;
      this.errors.lastError = this.invalidName;
      this.errors.invalidName = this.invalidName;
    }
  };

  validateSecondName = (secondName) => {
    if (secondName === "") {
      delete this.errors.lastError;
      this.errors.lastError = this.invalidSecondName;
      this.errors.invalidSecondName = this.invalidSecondName;
    }
  };
  validateMail = () => {};

  validatePassword = (password) => {};

  validateRepeatPassword = (password) => {};

  validateValidEmail = (email) => {};

  validateUniqueEmail = (email) => {};
}
const validator = new Validator();
