const urlModel = require("../models/urlModel");
const userModel = require("../models/userModel");
const validator = require("validator");
const qrcode = require("qrcode");

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

    const user = await userModel.findOne({ _id: req.user.userId });
    const newURL = await urlModel.create({ fullUrl, userId: user._id });
    user.urls.push(newURL._id);
    await user.save();
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
    const user = await userModel.findOne({ _id: req.user.userId });
    const newURL = await urlModel.create({
      fullUrl,
      shortUrl,
      userId: user._id,
    });
    user.urls.push(newURL._id);
    await user.save();
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
      return res.redirect("/404");
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
    const userId = req.user.userId;
    const response = await urlModel.find({ userId });
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
    const user = await userModel.findOne({ _id: req.user.userId });
    const urlIndex = user.urls.indexOf(response._id);
    if (urlIndex !== -1) {
      user.urls.splice(urlIndex, 1);
      await user.save();
    }
    const deleteUrl = await urlModel.findByIdAndDelete(response._id);
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateQrCode = async (req, res) => {
  try {
    const { url } = req.body;
    if (!validator.isURL(url)) {
      return res.status(400).json({ error: "Invalid URL " });
    }

    const qrCode = await qrcode.toDataURL(url);
    res.status(200).json(qrCode);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    // console.log(error);
  }
};
module.exports = {
  createShortUrl,
  createCustomUrl,
  getUrl,
  getAllUrl,
  deleteUrl,
  generateQrCode,
};
