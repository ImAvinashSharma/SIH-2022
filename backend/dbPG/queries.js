const Pool = require("pg").Pool;
const pool = new Pool({
  user: "avinash",
  host: "13.232.14.234",
  database: "sih",
  password: "moon9360",
  port: 5432
});

const redis = require("@redis/client");
const client = redis.createClient();
(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", err => console.log("<:: Redis Client Error", err));

const bcrypt = require("bcrypt");
const saltRounds = 10;

const cacheUserData = async (req, res, next) => {
  const data = await client.get("users");
  if (data != null) {
    res.json(JSON.parse(data));
  } else {
    next();
  }
};

const getUsers = async (request, response) => {
  pool.query("SELECT * FROM users", async (error, results) => {
    if (error) {
      response.json(error);
    } else {
      if (results.rowCount == 0) {
        response.json({ error: "No users found" });
      } else {
        await client.SETEX("users", 60 * 60 * 24, JSON.stringify(results.rows));
        response.json(results.rows);
      }
    }
  });
};

const getUserById = (request, response) => {
  const user_id = request.params.id;
  pool.query("SELECT * FROM users WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      response.status(500).json(error);
    } else {
      if (results.rowCount == 0) {
        response.json({ error: "No users found" });
      } else {
        response.json(results.rows);
      }
    }
  });
};

const getThesisByCollegeId = (req, res) => {
  const college_id = req.params.id;
  pool.query("SELECT * FROM thesis WHERE college_id = $1", [college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

const getThesisByUserId = (request, response) => {
  const user_id = request.params.id;
  pool.query("SELECT * FROM thesis WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      response.json(error);
    } else {
      response.json(results.rows);
    }
  });
};

const getThesisCountByUserId = (request, response) => {
  const user_id = request.params.id;
  pool.query("SELECT * FROM thesis WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      response.json(error);
    } else {
      if (results.rowCount == 0) {
        response.json({ count: 0 });
      } else {
        response.json({ count: results.rowCount });
      }
    }
  });
};

const tempUserById = (req, res) => {
  const sendTo = req.params.id;
  pool.query("SELECT * FROM temp WHERE sendTo = $1", [sendTo], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ error: "No User found" });
      } else {
        res.json(results.rows);
      }
    }
  });
};

const tempUserToUser = async (req, res) => {
  const user_id = req.params.id;
  await client.del("users");
  pool.query("SELECT * FROM temp WHERE user_id = $1", [user_id], async (error, results) => {
    if (error) {
      res.json(error);
    } else {
      const { user_id, username, password, email, role, sendto } = results.rows[0];
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.json(err);
        } else {
          const resInsertdata = await pool.query("INSERT INTO users (user_id,username,password,email,role,ref) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, username, hash, email, role, sendto]);
          const delRequest = await pool.query("DELETE FROM temp WHERE user_id = $1", [user_id]);
          console.log(resInsertdata, delRequest);
          res.json({ message: "OK" });
        }
      });
    }
  });
};

const cachethesisList = async (req, res, next) => {
  const data = await client.get("thesisList");
  if (data != null) {
    res.json(JSON.parse(data));
  } else {
    next();
  }
};

const thesisList = async (req, res) => {
  pool.query("SELECT * FROM thesis", async (error, results) => {
    if (error) {
      res.json(results.rows);
    } else {
      await client.SETEX("thesisList", 60 * 60 * 24, JSON.stringify(results.rows));
      res.json(results.rows);
    }
  });
};
const thesisListById = (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM thesis WHERE thesis_id = $1", [id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

const cacheCollegeList = async (req, res, next) => {
  const data = await client.get("collegeList");
  if (data != null) {
    res.json(JSON.parse(data));
  } else {
    next();
  }
};

const collegeList = (req, res) => {
  pool.query("SELECT * FROM college", async (error, results) => {
    if (error) {
      res.json(error);
    } else {
      await client.SETEX("collegeList", 60 * 60 * 24, JSON.stringify(results.rows));
      res.json(results.rows);
    }
  });
};

const thesisCount = (req, res) => {
  pool.query("SELECT COUNT(*) FROM thesis", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json(results.rows);
      }
    }
  });
};

const userCount = (req, res) => {
  pool.query("SELECT COUNT(*) FROM users", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json(results.rows);
      }
    }
  });
};

const collegeCount = (req, res) => {
  pool.query("SELECT COUNT(*) FROM college", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json(results.rows);
      }
    }
  });
};

const createUser = async (request, response) => {
  const { user_id, username, email, password, role, ref } = request.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      response.json(err);
    } else {
      pool.query("INSERT INTO users (user_id,username,password,email,role,ref) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [user_id, username, hash, email, role, ref], async (error, results) => {
        if (error) {
          response.json(error);
        } else {
          await client.DEL("users");
          response.send(`User added with user_id: ${results.rows[0].user_id}`);
        }
      });
    }
  });
};

const login = (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  pool.query("SELECT * FROM users WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount > 0) {
        bcrypt.compare(password, results.rows[0].password, (err, resultsData) => {
          if (err) {
            res.json(err);
          } else {
            if (resultsData) {
              pool.query("UPDATE users SET last_login = NOW() WHERE user_id = $1", [user_id], error => {
                if (error) {
                  res.json(error);
                }
              });
              client.del("users");
              res.json(results.rows);
            } else {
              res.send({ message: "username/password mismatch" });
            }
          }
        });
      } else {
        res.send({ message: "user doesn't exist" });
      }
    }
  });
};

const tempCollege = async (req, res) => {
  const { college_id, college, university, adminName, user_id, email, pno } = req.body;
  pool.query("INSERT INTO collegetemp (college_id, college, university, adminName, user_id, email, pno) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [college_id, college, university, adminName, user_id, email, pno], async (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

// From tempCollege to actual College
const createCollegeTemp = async (req, res) => {
  const college_id = req.params.id;
  await client.del("collegeList");
  pool.query("SELECT * FROM collegeTemp WHERE college_id = $1", [college_id], async (error, results) => {
    if (error) {
      res.json(error);
    } else {
      const { college_id, college, university, adminName, user_id, email, pno } = results.rows[0];
      const resInsertdata = await pool.query("INSERT INTO users (college_id, college, university, adminName, user_id, email, pno) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [college_id, college, university, adminName, user_id, email, pno]);
      const delRequest = await pool.query("DELETE FROM collegeTemp WHERE college_id = $1", [user_id]);
      console.log(resInsertdata, delRequest);
      res.json({ message: "OK" });
    }
  });
};

const createCollege = (req, res) => {
  const { college_id, college, university, adminName, user_id, email, pno } = req.body;
  pool.query("INSERT INTO college (college_id, college, university, adminName, user_id, email, pno) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [college_id, college, university, adminName, user_id, email, pno], async (error, results) => {
    if (error) {
      res.json(error);
    } else {
      await client.DEL("collegeList");
      res.send(results.rows);
    }
  });
};

const tempUsers = (req, res) => {
  const { user_id, username, email, password, role, sendTo, pno } = req.body;
  pool.query("INSERT INTO temp (user_id, username, sendTo, password, email, pno, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [user_id, username, sendTo, password, email, pno, role], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.send(results.rows);
    }
  });
};

const getTodayNoOfThesis = (req, res) => {
  const yourDate = new Date();
  const formatDate = yourDate.toISOString().split("T")[0];
  pool.query("SELECT * FROM thesis where uploded_on::date = $1", [formatDate], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json({ count: results.rowCount });
      }
    }
  });
};

const getTodayNoOfThesisByCollageId = (req, res) => {
  const college_id = req.params.id;
  const yourDate = new Date();
  const formatDate = yourDate.toISOString().split("T")[0];
  pool.query("SELECT * FROM thesis where uploded_on::date = $1 and college_id = $2", [formatDate, college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json({ count: results.rowCount });
      }
    }
  });
};

const getCollegeDetailsByUser = (req, res) => {
  const college_id = req.params.id;
  pool.query("SELECT * FROM college WHERE college_id = $1", [college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ message: "college not found" });
      } else {
        res.json(results.rows);
      }
    }
  });
};

const uplodeThesis = async (req, res, next) => {
  await client.DEL("thesisList");
  await client.DEL("collegeList");
  const { thesis_id, user_id, researcher, guide, title, keywords, university, college_id, college, abstract, category, vCount, created_on, s3Url } = req.body;

  pool.query("INSERT INTO thesis (thesis_id, user_id, researcher, guide, title, keywords, university, college_id, college, abstract, category, vCount, created_on, s3Url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [thesis_id, user_id, researcher, guide, title, keywords, university, college_id, college, abstract, category, vCount, created_on, s3Url], async (error, results) => {
    if (error) {
      return res.json(error);
    } else {
      pool.query("SELECT thesisno FROM college WHERE college_id=$1", [college_id], (error, cnt) => {
        if (error) {
          return res.json(error);
        } else {
          let count;
          if (cnt?.rows[0]?.thesisno) {
            count = cnt.rows[0].thesisno + 1;
          } else {
            count = 1;
          }
          pool.query("UPDATE college SET thesisno = $1 WHERE college_id = $2", [count, college_id], error => {
            if (error) {
              return res.json(error);
            } else {
              next();
            }
          });
        }
      });
    }
  });
};

const top10Universities = (req, res) => {
  pool.query("SELECT * FROM college ORDER BY thesisno DESC LIMIT 10", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

const getReaCountByCollegeId = (req, res) => {
  const college_id = req.params.id;
  pool.query("SELECT * FROM users WHERE ref = $1", [college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json({ count: results.rowCount });
      }
    }
  });
};

const getThesisCountByCollegeId = (req, res) => {
  const college_id = req.params.id;
  pool.query("SELECT * FROM college WHERE college_id = $1", [college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.rowCount == 0) {
        res.json({ count: 0 });
      } else {
        res.json({ count: results.rows[0].thesisno });
      }
    }
  });
};

const getApproveForCollegeId = (req, res) => {
  pool.query("SELECT * FROM collegetemp", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

// Done
const getApproveForResearcherId = (req, res) => {
  const college_id = req.params.id;
  pool.query("SELECT * FROM temp WHERE sendto = $1", [college_id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      res.json(results.rows);
    }
  });
};

//TODO: update user
const updateUser = (request, response) => {
  const { user_id, username, email, password, role } = request.body;

  pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error, results) => {
    if (error) {
      throw error;
    }
    response.send(`User modified with ID: ${id}`);
  });
};
//TODO: delete user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.user_id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.send(`User deleted with ID: ${id}`);
  });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getThesisByUserId,
  login,
  createCollege,
  uplodeThesis,
  thesisList,
  thesisCount,
  collegeCount,
  collegeList,
  tempUsers,
  tempUserById,
  tempUserToUser,
  thesisListById,
  userCount,
  getTodayNoOfThesis,
  getCollegeDetailsByUser,
  cacheUserData,
  cachethesisList,
  cacheCollegeList,
  top10Universities,
  getTodayNoOfThesisByCollageId,
  createCollegeTemp,
  getReaCountByCollegeId,
  getThesisCountByCollegeId,
  getApproveForResearcherId,
  getApproveForCollegeId,
  getThesisByCollegeId,
  tempCollege,
  getThesisCountByUserId
};
