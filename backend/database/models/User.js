const pool = require("../connection");
const util = require("util");
const query = util.promisify(pool.query);

class User {
  constructor() {
    this.tableName = "users";
    this.tableNameListUmur = "list_umur";
    this.tableNameNamaTabel = "nama_tabel";
  }

  async createUser(username, email, password) {
    const queryStr = "INSERT INTO ?? (username, email, password) VALUES (?, ?, ?)";
    const values = [this.tableName, username, email, password];

    try {
      const result = await query(queryStr, values);
      console.log("User created:", result);
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    const queryStr = "SELECT * FROM ?? WHERE id = ?";
    const values = [this.tableName, userId];

    try {
      const result = await query(queryStr, values);
      console.log("User retrieved by ID:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  async getUserByUsername(username) {
    const queryStr = "SELECT * FROM ?? WHERE username = ?";
    const values = [this.tableName, username];

    try {
      const result = await query(queryStr, values);
      console.log("User retrieved by username:", result);
      return result[0];
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  }

  async getListUmur() {
    const queryStr = "SELECT * FROM ??";
    const values = [this.tableNameListUmur];

    try {
      const results = await query(queryStr, values);
      console.log("Data from list_umur:");
      for (const row of results) {
        console.log(row);
      }
      return results;
    } catch (error) {
      console.error("Error getting list umur:", error);
      throw error;
    }
  }

  async getNamaTabel() {
    const queryStr = "SELECT * FROM nama_tabel";
    try {
      const results = await query(queryStr);
      console.log("Data from nama_tabel:", results);
      return results;
    } catch (error) {
      console.error("Error getting data from nama_tabel:", error);
      throw error;
    }
  }
}

module.exports = User;
