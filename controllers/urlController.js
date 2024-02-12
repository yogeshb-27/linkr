const { json } = require("express");
const urlModel = require("../models/urlModel");
const validator = require("validator");

const createShortUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    if (!validator.isURL(fullUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    const existingURL = await urlModel.findOne({ fullUrl });
    if (existingURL) {
      return res.status(200).json({ shortUrl: existingURL.shortUrl });
    }
    const newURL = await urlModel.create({ fullUrl });
    res.status(201).json({ shortUrl: newURL.shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCustomUrl = async (req, res) => {
  try {
    const { fullUrl, shortUrl } = req.body;
    if (!validator.isURL(fullUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    if (!shortUrl) {
      return res.status(400).json({ error: "Custom URL not provided" });
    }
    const existingURL = await urlModel.findOne({ shortUrl });
    if (existingURL) {
      return res.status(400).json({ error: "Short Url Allready Exists" });
    }
    const newURL = await urlModel.create({ fullUrl, shortUrl });
    res.status(201).json({ message: "Custom Url Created" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const response = await urlModel.findOne({ shortUrl: url });
    if (!response) {
      return res.status(404).json({ error: "URL Not Found" });
    }
    response.clicks++;
    response.save();
    const decodedUrl = decodeURIComponent(response.fullUrl);
    res.redirect(decodedUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUrl = async (req, res) => {
  try {
    const response = await urlModel.find({});
    if (response.length < 0) {
      res.status(404).json({ error: "No URL Found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const response = await urlModel.findOne({ shortUrl: url });
    if (!response) {
      return res.status(404).json({ error: "URL Not Found" });
    }
    const deleteUrl = await urlModel.findByIdAndDelete(response._id);
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createShortUrl,
  createCustomUrl,
  getUrl,
  getAllUrl,
  deleteUrl,
};
