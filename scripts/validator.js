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
      invalidName: this.invalidName,
      invalidSecondName: this.invalidSecondName,
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }
  getErrors = () => {
    return this.errors;
  };
  validateName = (name) => {
    if (name === "") {
      this.errors.invalidName = this.invalidName;
    }
  };
  validateSecondName = (secondName) => {
    if (secondName === "") {
      this.errors.invalidSecondName = this.invalidSecondName;
    }
  };
  validateMail 0 () => {

  }

  validatePassword = (password) => {

  }

  validateRepeatPassword = (password) => {
    
  }
}
const validator = new Validator();
