const axios = require("axios");
const { log } = require("console");
const fs = require("fs");
const pdf2html = require("pdf2html");

const delay = ms => new Promise(res => setTimeout(res, ms));

const Typesense = require("typesense");

const client = new Typesense.Client({
  nodes: [
    {
      host: "13.232.14.234",
      port: "8108",
      protocol: "http"
    }
  ],
  apiKey: "Hu52dwsas2AdxdE",
  connectionTimeoutSeconds: 6
});

// Done
const getHydrateHtml = async (req, res) => {
  const { url } = req.body;
  if (url === undefined || url === null) {
    res.send({ message: "url is required" });
  } else {
    await pdf2html.html(url, async (err, dataTxt) => {
      if (err) {
        res.json(err);
      } else {
        res.json(dataTxt);
      }
    });
  }
};

// Need to check
const sendTextToNLP = async (req, res, next) => {
  const { thesis_id, researcher, guide, university, college, title, keywords, abstract, category, created_on, s3Url } = req.body;
  const url = s3Url;
  if (url === undefined || url === null) {
    res.send({ message: "text is required" });
  } else {
    pdf2html.text(url, async (err, text) => {
      if (err) {
        console.error("Conversion error: " + err);
      } else {
        const content = text.replace(/[^A-Z0-9]+/gi, " ");
        console.log(content);
        let dataText = "";
        let dataTestArray = [];
        for (let index = 0; index < content.length; index += 1000) {
          const encodedParams = new URLSearchParams();
          encodedParams.append("text", content.slice(index, index + 1000));
          encodedParams.append("tl", "en");

          const options = {
            method: "POST",
            url: "https://google-translate20.p.rapidapi.com/translate",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "776b3f4fb5msh7806c70f8a0c2c5p17c1bfjsna5e236402a73",
              "X-RapidAPI-Host": "google-translate20.p.rapidapi.com"
            },
            data: encodedParams
          };
          await delay(2500);
          axios
            .request(options)
            .then(function (response) {
              dataText = dataText + response.data.data.translation;
              dataTestArray.push(response.data.data.translation);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        const document = {
          titleId: thesis_id,
          title: title,
          researcherName: researcher,
          guideName: guide,
          keywords: keywords,
          category: category,
          createdOn: parseInt(created_on.substring(0, 4)),
          url: s3Url,
          abstract: abstract,
          content: dataTestArray,
          university,
          college
        };
        // const log = await client.collections("test").documents().create(document);
        // console.log(log);
        fs.writeFileSync("temp/text1.txt", dataText);
        res.json({ message: "Done", dataTestArray });
      }
    });
  }
};

module.exports = { getHydrateHtml, sendTextToNLP };
