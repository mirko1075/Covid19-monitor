"use strict";

class Database {
  // method to get users array from localStorage
  getAllUsers = () => {
    // get the string from the localStorage
    const usersStr = localStorage.getItem("users");
    const usersArr = JSON.parse(usersStr); // Convert string to an array

    if (usersStr === null) {
      // if no users in localStorage, don't return null but return empty array
      return [];
    } else {
      return usersArr;
    }
  };

  // method to save a user into the localStorage users array

  saveNewUser = (newUser) => {
    // get the array of users saved in the localStorage
    const usersArr = this.getAllUsers();

    // update the users array and add the new user to it
    const updatedUsersArr = [...usersArr, newUser];
    // usersArr.push(newUser);

    // save back the updated users array to localStorage
    const updatedUsersStr = JSON.stringify(updatedUsersArr);
    localStorage.setItem("users", updatedUsersStr);
  };
}

// create an instance (object) of Database
const db = new Database();
