// const Pool = require("pg").Pool;
// const axios = require("axios");

// const pool = new Pool({
//   user: "avinash",
//   host: "13.232.14.234",
//   database: "sih",
//   password: "moon9360",
//   port: 5432
// });

// const CronJob = require("cron").CronJob;

// let job = new CronJob(
//   "5 * * * * *",
//   async function () {
//     let paper_id;
//     pool.query("SELECT * FROM helper", (error, results) => {
//       if (error) {
//         res.json(error);
//       } else {
//         paper_id = results?.rows[0]?.paper_id;
//       }
//     });
//     await axios.get(`http://localhost:3001/submissionDetails/${paper_id}`).then(function (response) {
//       if (response.data.percent != "--") {
//         pool.query("UPDATE helper SET percentage = $1, d_key = $2)", [response.data.percent, response.data.d_key], (error, results) => {
//           if (error) {
//             res.json(error);
//           } else {
//             console.log("Done");
//           }
//         });
//       }
//     });
//   },
//   null,
//   true,
//   "America/Los_Angeles"
// );

// module.exports = { job };
