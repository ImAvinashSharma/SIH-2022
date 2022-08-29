const express = require("express");
const router = express.Router();
const { sendMail } = require("./mail");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/", async function (req, res) {
  try {
    const { email, subject, body } = req.body;
    let data = await sendMail(email, subject, body);
    return res.send({ ok: "okk", data });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

router.get("/", function (req, res) {
  return res.send({ ok: "okk" });
});

module.exports = router;
