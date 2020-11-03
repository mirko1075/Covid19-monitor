"use strict";

// class Signin {
//   constructor() {
//     this.emailInput = document.getElementById("email");
//     this.passwordInput = document.getElementById("password");
//     this.buttonInput = document.getElementById("signup-button");
//     this.errorsContainer = document.querySelector(".message-container");
//   }

//   handleEmailInput = (event) => {
//     const emailInput = event.target;
//     const email = this.emailInput.value;
//     validator.validateValidEmail(validator.emailInput.value);
//     validator.cleanErrorMessage();
//     validator.setErrorMessage();
//   };

//   sendData = (event) => {
//     event.preventDefault();

//     // get all the users array

//     const email = this.emailInput.value;
//     const password = this.passwordInput.value;

//     // create the new user
//     const usersArr = db.getAllUsers();
//     console.log(usersArr);
//   };

//   addListners = () => {
//     this.buttonInput.addEventListener("click", this.sendData);
//   };
// }

// const signin = new Signin();
// window.addEventListener("load", signin.addListners);

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.messageContainer = document.querySelector(".message-container");
    this.loginButton = document.querySelector("#signup-button");
  }

  // handle the login (when user clicks the Login button)
  handleSubmit = (event) => {
    // prevent the reload of the page ( form subit button reloads the page)
    event.preventDefault();

    // get the values from the inputs
    const email = this.emailInput.value; // sergi
    const password = this.passwordInput.value; //  126

    // Get the users from db (localStorage)
    const users = db.getAllUsers();

    // Check the password and email exist in the db (localStorage) -
    // arr.find() - returns the first element that matches the experssion

    // [ {uros  123},  {sergi  123}, {  tasha   123}   ]

    const user = users.find(function (userObj) {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    });

    // empty the container so that the messages don't add up
    this.messageContainer.innerHTML = "";
    const p = document.createElement("p");

    // set the message
    if (!user) {
      p.textContent = "Email or password are incorrect!";
    } else {
      p.textContent = `Hello ${user.name}!`;
      p.classList.add("correct-message");
      // Redirect to the dashboard page
      this.redirect();
    }

    this.messageContainer.appendChild(p);
  };

  redirect = () => {
    setTimeout(function () {
      location.assign("dashboard.html");
    }, 2000);

    // setTimeout( () => location.assign("dashboard.html"), 2000)
  };
}

const login = new Login();

window.addEventListener("load", function () {
  login.loginButton.addEventListener("click", login.handleSubmit);
});

// Creating methods in a class block:
// arrow methods:   they will be created on the new object, on the instance
//                  When updating, we must update every instance.

// regular methods: they are created on the class prototype (e.g. Login.prototype)
//                  and instances can access it via inheritance.
//                  Easier to update and change later (change in one place)
