require("dotenv").config();
const express = require("express");
const db = require("./dbPG/queries");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
// const textStripper = require("./textExtracter/pdfData");
const textExtractor = require("./textConveter");
const plagResult = require("./plagResult/uplodeDoc");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
const bodyParser = require("body-parser");
const cronHelper = require("./backGroundJobs");

const hydration = require("./textConveter");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://13.232.14.234:3000", "http://13.232.14.234:1234"],
    methods: ["GET", "POST"],
    credentials: true
  })
);

const PORT = process.env.PORT || 3001;

// NPL
app.post("/getHtml", hydration.getHydrateHtml);
app.post("/NLP", hydration.sendTextToNLP);

const search = require("./search.js");
app.use("/search", search);

const mail = require("./mail/index.js");
app.use("/send", mail);

app.get("/users", db.cacheUserData, db.getUsers);
app.post("/login", db.login);

app.get("/logout", (req, res) => {
  req.session = null;
  res.send({ message: "Done" });
});

// create new user that will be staoed in the temp db
app.post("/registerUser", db.tempUsers);

app.post("/registerCollege", db.tempCollege);
// Dont use this end point
// app.post("/pdfStripper", textStripper.pdf2Text);
// to get the temp user details by sendTo
app.get("/tempUser/:id", db.tempUserById);
// to convert the user to a permanent user
app.get("/tempUserToUser/:id", db.tempUserToUser);

app.get("/createCollegeTemp/:id", db.createCollegeTemp);
// to uplode thesis details
app.post("/uploadThesis", db.uplodeThesis, textExtractor.sendTextToNLP); // to uplode
// to get the thesis list
app.get("/thesisList", db.cachethesisList, db.thesisList);
// to get thesis count
app.get("/thesisCount", db.thesisCount);
// to get collegeList
app.get("/collegeList", db.cacheCollegeList, db.collegeList);
// to get college count
app.get("/collegeCount", db.collegeCount);

// to get the college details by user_id
app.get("/getCollegeDetailsByUser/:id", db.getCollegeDetailsByUser);
// get toatl user count
app.get("/userCount", db.userCount);
// to get the thesis list by id
app.get("/thesisList/:id", db.thesisListById);
// get all the thesis from perticular college
app.get("/getThesisCountByCollegeId/:id", db.getThesisCountByCollegeId);
// create college
app.post("/createCollege", db.createCollege);
// get user list
app.post("/users", db.createUser);
// get user by id
app.get("/users/:id", db.getUserById);
// get total number and data of thesis uploded
app.get("/getTodayNoOfThesis", db.getTodayNoOfThesis);
// get thesis user Id
app.get("/getThesisByUserId/:id", db.getThesisByUserId);

app.get("/getThesisCountByUserId/:id", db.getThesisCountByUserId);
// get Top 10 Universities
app.get("/top10Universities", db.top10Universities);
// get today no. of thesis uploded by college
app.get("/getTodayNoOfThesisByCollageId/:id", db.getTodayNoOfThesisByCollageId);

app.get("/getReaCountByCollegeId/:id", db.getReaCountByCollegeId);

app.get("/getApproveListForCollegeId", db.getApproveForCollegeId);

app.get("/getApproveListForResearcherId/:id", db.getApproveForResearcherId);

app.get("/getThesisByCollegeId/:id", db.getThesisByCollegeId);

// plagResult
app.get("/jwt", plagResult.jwt);
app.post("/uplodeFileForPlagCheck", plagResult.uplodeFileForPlagCheck);
app.post("/downloadReport", plagResult.downloadReport);
app.get("/submissionDetails/:id", plagResult.submissionDetails);
app.get("/getThesisReport/:id", plagResult.getThesisReport);

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    createParentPath: true
  })
);

// cronHelper.job.start();

// todo: check
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(PORT, () => {
  console.log("Server is running " + PORT);
});

// TODO: Role base access control
