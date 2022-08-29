const axios = require("axios");
const fs = require("fs");
const path = require("path");

// test passed
const getJWT = async () => {
  const res = await axios.post("https://www.drillbitplagiarismcheck.com/drillbit_new/api/authenticate", {
    username: "librarian@cmrcet.org",
    password: "Cmrcet@123"
  });
  return res.data.jwt;
};

// test passed
const jwt = async (req, res) => {
  res.send(await getJWT());
};

const uplodeFileForPlagCheck = async (req, res, next) => {
  // const { name, title, assignment_id, file } = req.body;
  // const data = {
  //   name: name,
  //   title: title,
  //   assignment_id: assignment_id,
  //   doc_type: "thesis",
  //   file
  // };
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let thesis = req.files.thesis;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      thesis.mv("./uploads/" + thesis.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// test passed
const submissionDetails = async (req, res, next) => {
  const paper_id = req.params.id;
  const jwt = await getJWT();
  const url = `https://www.drillbitplagiarismcheck.com/drillbit_new/api/submission/${paper_id}`;
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      res.send(response.data);
    });
};

const getThesisReport = (req, res) => {
  const thesis_id = req.params.id;
  if (fs.existsSync(`./results/${thesis_id}`)) {
    var data = fs.readFileSync(`./results/${thesis_id}`);
    res.contentType("application/pdf");
    res.send(data);
  } else {
    res.json({ file: "doesn't exist" });
  }
};

// test in frontend
const downloadReport = async (req, res, next) => {
  const { paper_id, dKey } = req.body;
  const jwt = await getJWT();
  const url = `https://www.drillbitplagiarismcheck.com/drillbit_new/api/submission/${paper_id}/${dKey}/download`;
  axios({
    method: "GET",
    url,
    responseType: "arraybuffer",
    responseEncoding: "binary",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }).then(response => {
    fs.writeFile("./results/a.pdf", response.data, err => {
      if (err) {
        return res.json(err);
      } else {
        return res.json("The file has been saved!");
      }
    });
  });
};

module.exports = { jwt, uplodeFileForPlagCheck, downloadReport, submissionDetails, getThesisReport };
