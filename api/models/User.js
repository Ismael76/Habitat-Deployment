const db = require("../dbConfig/init");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query("SELECT * FROM users");
        let users = userData.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error Retrieving Users");
      }
    });
  }

  static create(username, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;`,
          [username, email, password]
        );
        let newUser = new User(userData.rows[0]);
        resolve(newUser);
      } catch (err) {
        reject("Error Registering User");
      }
    });
  }

  static findUser(email) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
        let selectedUser = new User(userData.rows[0]);
        resolve(selectedUser);
      } catch (err) {
        reject("Error User Does Not Exist");
      }
    });
  }
}

module.exports = User;
