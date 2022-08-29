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
// sihjbc@jaibarath
const schema = {
  name: "SIH",
  fields: [
    {
      name: "titleId",
      type: "string",
      facet: false
    },
    {
      name: "title",
      type: "string",
      facet: false
    },
    {
      name: "researcherName",
      type: "string",
      facet: false
    },
    {
      name: "guideName",
      type: "string",
      facet: false
    },
    {
      name: "keywords",
      type: "string",
      facet: false
    },
    {
      name: "category",
      type: "string",
      facet: true
    },
    {
      name: "createdOn",
      type: "int32",
      facet: true
    },
    {
      name: "url",
      type: "string",
      facet: true
    },
    {
      name: "abstract",
      type: "string",
      facet: true
    },
    {
      name: "content",
      type: "string[]",
      facet: true
    }
  ],
  default_sorting_field: "createdOn"
};

// client.collections().create(schema);

let document = {
  titleId: "Avinash",
  title: "Avinash",
  researcherName: "Avinash",
  guideName: "Avinash",
  keywords: "Avinash",
  category: "Avinash",
  createdOn: 2002,
  url: "safds",
  abstract: "asfdasfs",
  content: ["Avinash", "pari", "praveen"]
};

// client.collections("test").documents().create(document);

let searchParameters = {
  q: "pari",
  query_by: "content, abstract, category",
  sort_by: "createdOn:desc",
  use_cache: "true",
  cache_ttl: "3600"
};

const check = async () => {
  const data = await client.collections("test").documents().search(searchParameters);
  console.log(data.hits);
};

check();
