const path = require("path");
const express = require("express");

const root = path.join(__dirname, "dist");
const port = process.env.PORT || 8080;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(root));
} else {
  const webpack = require("webpack");
  const config = require("./webpack.config");
  const compiler = webpack(config);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static(__dirname + "/public/"));

app.get("/theses", (req, res) => {
  res.send([
    { 
      id: 4, 
      author: "pekka himanen", 
      email: "peksi@gmail.com",
      title: "konna",
      urkund: "http://peksi.com",
      ethesis: "https://ethesis.com/peksi",
      abstract: "peksi tutkii sut miljoonalla",
      grade: "I",
    },
  ]);
});

if (!module.parent) {
  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening on localhost:${port}`);
  });
}

module.exports = app;
