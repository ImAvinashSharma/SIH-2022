const pdf2html = require("pdf2html");
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
  connectionTimeoutSeconds: 2
});

const pdf2Text = async (req, res) => {
  console.log("pdf2Text");
  const { thesis_id, researcher, guide, title, keywords, abstract, category, created_on, s3Url } = req.body;
  pdf2html.text(s3Url, async (err, dataTxt) => {
    if (err) {
      console.error("Conversion error: " + err);
    } else {
      let content;
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
        content: content
      };
      const log = await client.collections("test").documents().create(document);
      console.log(log);
      res.json({ message: "thesis uploaded" });
    }
  });
};

module.exports = { pdf2Text };
