const express = require("express");
const router = express.Router();
const Typesense = require("typesense");

const client = new Typesense.Client({
  nodes: [
    {
      host: "13.232.14.234", // For Typesense Cloud use xxx.a1.typesense.net
      port: "8108", // For Typesense Cloud use 443
      protocol: "http" // For Typesense Cloud use https
    }
  ],
  apiKey: "Hu52dwsas2AdxdE",
  connectionTimeoutSeconds: 10
});

router.use((req, res, next) => {
  next();
});

router.post("/", async function (req, res) {
  try {
    const { query, category } = req.body; // category =  ["asdf","Asdf","Asdf"]
    qCategories = category.join(", ");
    let searchParameters = {
      q: query,
      query_by: qCategories,
      sort_by: "createdOn:desc",
      use_cache: "true",
      cache_ttl: "3600"
    };
    const data = await client.collections("test").documents().search(searchParameters);
    return res.send({ data });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

router.get("/", function (req, res) {
  res.status(404).send({ status: "404" });
});

module.exports = router;
