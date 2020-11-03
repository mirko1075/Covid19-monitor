"use strict";

class Signin {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.messageContainer = document.querySelector(".message-container");
    this.loginButton = document.querySelector("#signup-button");
  }

  // handle the login
  handleSubmit = (event) => {
    // prevent the reload of the page
    event.preventDefault();

    // get the values from the inputs
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Get the users from localStorage
    const users = db.getAllUsers();

    // Check the password and email exist in localstorage

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
  };
}

const signin = new Signin();

window.addEventListener("load", function () {
  signin.loginButton.addEventListener("click", signin.handleSubmit);
});
