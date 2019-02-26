require("dotenv").config({ path: ".env" });
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const clientID = process.env.clientId;

const urlUnsplash = `https://api.unsplash.com/search/photos/?page=1&per_page=6&orientation=portrait&query=warsaw&client_id=${clientID}`;

router.get("/test", (req, res) =>
  //unsplash api
  fetch(urlUnsplash)
    .then(res => {
      return res.json();
    })
    .then(data => {
      const displayImages = [];
      // const limitDispaly = 4;
      for (let i = 0; i < data.results.length; i++) {
        if (data.results.length[i] != "undefined") {
          console.log(data.results[i].urls.small);
          displayImages.push(data.results[i].urls.small);
        } else {
          console.log("no photos");
        }
      }
      res.json({ displayImages: displayImages });
    })
    .catch(err => {
      console.log("Error", err.message);
    })
);

module.exports = router;
