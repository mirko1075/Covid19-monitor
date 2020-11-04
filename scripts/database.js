"use strict";

class Database {
  getAllUsers = () => {
    const usersStr = localStorage.getItem("users");
    const usersArr = JSON.parse(usersStr);

    if (usersStr === null) {
      return [];
    } else {
      return usersArr;
    }
  };

  saveNewUser = (newUser) => {
    const usersArr = this.getAllUsers();

    const updatedUsersArr = [...usersArr, newUser];

    const updatedUsersStr = JSON.stringify(updatedUsersArr);
    localStorage.setItem("users", updatedUsersStr);
  };
}

const db = new Database();
