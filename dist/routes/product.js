"use strict";

const {
  displayProducts,
  createAuction,
  getCategories,
  displayByCategory,
  displayProduct,
  getCategory,
  countProducts,
  countProductsCategory
} = require("../controllers/auctionController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const DIR = path.join(__dirname, "..", "/public/images/");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/avif" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});
router.route('/display').get((req, res) => {
  displayProducts(req, res);
});
router.route('/create').post(upload.single("file"), (req, res) => {
  createAuction(req, res);
});
router.route('/categories').get((req, res) => {
  getCategories(req, res);
});
router.route('/displaybycategory/:category_id').get((req, res) => {
  displayByCategory(req, res);
});
router.route('/displayproduct/:product_id').get((req, res) => {
  displayProduct(req, res);
});
router.route('/getcategory/:category_id').get((req, res) => {
  getCategory(req, res);
});
router.route('/count').get((req, res) => {
  countProducts(req, res);
});
router.route('/countbycategory/:category_id').get((req, res) => {
  countProductsCategory(req, res);
});
module.exports = router;