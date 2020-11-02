class Validator {
  constructor() {
    // predetermined error messages
    this.invalidName = "Name cannot be blank";
    this.invalidSecondName = "Second name cannot be blank";
    this.invalidEmailError = "Enter a valid email address";
    this.blankEmailError = "Email address is mandatory";
    this.emailExistsError = "The entered email address is already taken.";
    this.passwordError =
      "password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters";
    this.repeatPasswordError = "Password and reapeat password must match!";

    // object with all the current errors that are shown to the user
    this.errors = {
      lastError: "",
    };
  }
  getErrors = () => {
    console.log(this.errors);
    return this.errors;
  };

  //MANDATORY FIELDS
  validateName = (name) => {
    if (name === "") {
      // delete this.errors.lastError;
      this.errors.lastError = this.invalidName;
      this.errors.invalidName = this.invalidName;
    }
  };

  validateSecondName = (secondName) => {
    if (secondName === "") {
      // delete this.errors.lastError;
      this.errors.lastError = this.invalidSecondName;
      this.errors.invalidSecondName = this.invalidSecondName;
    }
  };

  // EMAIL CHECKS
  checkEmailSyntax = (email) => {
    // RegEx rule
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const result = emailRegEx.test(email);
    return result;
  };

  validateValidEmail = (email) => {
    // delete this.errors.lastError;
    console.log("email", email);
    if (email === "") {
      this.errors.lastError = this.blankEmailError;
      this.errors.blankEmailError = this.blankEmailError;
    } else if (!this.checkEmailSyntax(email)) {
      this.errors.lastError = this.invalidEmailError;
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  validateUniqueEmail = (email) => {
    // delete this.errors.lastError;
    const users = db.getAllUsers(); //

    let emailUnique = true;

    users.forEach((userObj) => {
      if (userObj.email === newEmail) {
        // Check email of each user
        emailUnique = false; // set emailUnique to `false` if email is already taken
      }
    });

    if (!emailUnique) {
      this.errors.lastError = this.emailExistsError;
      this.errors.emailExistsError = this.emailExistsError;
    }
  };

  // PASSWORD CHECKS

  checkPasswordRegEx = (password) => {
    const passwordRegEx = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    // Regex for password must contain at least eight characters, at least one number and both lower
    // and uppercase letters and special characters
    // console.log(passwordRegEx.test(password));
    return passwordRegEx.test(password);
  };

  validatePassword = (password) => {
    // delete this.errors.lastError;
    // console.log(this.checkPasswordRegEx(password));
    if (!this.checkPasswordRegEx(password)) {
      this.errors.lastError = this.passwordError;
      this.errors.passwordError = this.passwordError;
    }
  };

  validateRepeatPassword = (password, repeatPassword) => {
    // delete this.errors.lastError;
    console.log(password, repeatPassword);
    if (password != repeatPassword) {
      this.errors.lastError = this.repeatPasswordError;
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  };
}

// CREATE VALIDATOR OBJ
const validator = new Validator();
