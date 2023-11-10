const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sulthandb",
  connectionLimit: 10,
});

module.exports = pool;


// testing data in-out gateway use terminal go to database 
// pool.query("SELECT * FROM nama_tabel", (error, results, fields) => {
//     if (error) {
//       console.error("Error querying the database:", error);
//       return;
//     }
  
//     console.log("Hasil Query:", results);
//   });
  
//   pool.query("SELECT * FROM list_umur", (error, results, fields) => {
//     if (error) {
//       console.error("Error querying the database:", error.message || error);
//       return;
//     }
  
//     console.log("Hasil Query:");
//     for (const row of results) {
//       console.log(row); // Access individual fields here
//     }
//   });