"use strict";

class Session {
  // Don't need it at this stage
  constructor(name, secondName) {
    //     this.name=name;
    //     this.secondName= secondName;
    this.sessionDivContainer = document.getElementById("sessiondiv-container");
  }

  createSession(name, secondName) {
    // Store
    sessionStorage.setItem("name", name);
  }

  getSession() {
    const name = sessionStorage.getItem("name");
    const sessionDiv = document.createElement("div");
    if (name) {
      let sessionStr = "";
      sessionStr += `<img src="../images/computer-icons-user-profile-head-ico.png" class="sessionicon">   -   ${name}`;

      sessionDiv.innerHTML = sessionStr;
      // console.log(this.sessionDivContainer);
      this.sessionDivContainer.appendChild(sessionDiv);
    }
  }
}
// const session = new Session();
// const userSession = session.getSession();
