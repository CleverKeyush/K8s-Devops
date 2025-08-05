const express = require("express");
const promClient = require("prom-client");
const app = express();

const counter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

app.get("/", (req, res) => {
  counter.inc();
  res.send("Hello from Node.js App!");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
