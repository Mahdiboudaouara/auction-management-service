"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../config");
app.use(express.static("./public"));
const {
  auctionValidation
} = require("../validation");
const path = require("path");
const fs = require("fs");
const {
  resolve
} = require("path");
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const Axios = require("axios");

// Handle file uploads
async function createAuction(req, res) {
  // validate request body
  // const { error } = await auctionValidation(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }

  // Rename file to original name and move to designated folder
  const newpath = path.join(__dirname, "..", "/public/images/");
  const file = req.file;
  fs.rename(`${newpath}${file.filename}`, `${newpath}${file.originalname}`, err => {
    if (err) {
      return res.status(500).send({
        message: "File upload failed"
      });
    }
  });

  // Insert data into database
  const baseUrl = req.protocol + "://" + req.get("host");
  const imageUrl = baseUrl + "/images/" + file.originalname;
  const insertData = "INSERT INTO products (productName,owner_id,category_id,productDescription,productImage,date) VALUES (?,?,?,?,?,?)";
  await db.query(insertData, [req.body.productName, req.body.userId, req.body.productCategory, req.body.productDescription, imageUrl, req.body.auctionDate], (err, result) => {
    const productId = result.insertId;
    Axios.post(`http://${process.env.BID_SERVER}/backend/bid/create`, {
      productId: productId,
      userId: req.body.userId,
      bidAmount: req.body.startingPrice,
      date: req.body.auctionDate
    });
    if (err) {
      throw err;
    }
  });
  return res.status(200).send({
    message: "File Uploaded and Data Inserted Successfully"
  });
}
async function displayProducts(req, res) {
  console.log("page", req.query.page, "limit", req.query.limit);
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  try {
    const getData = `SELECT * FROM products ORDER BY date Asc LIMIT ${limit} OFFSET ${offset}`;
    await db.query(getData, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function countProducts(req, res) {
  try {
    const getCount = "SELECT COUNT(*) as count FROM products";
    await db.query(getCount, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function countProductsCategory(req, res) {
  const category_id = req.params.category_id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  try {
    const getCount = `SELECT COUNT(*) as count FROM products WHERE category_id = ${category_id} LIMIT ${limit} OFFSET ${offset}`;
    await db.query(getCount, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function getCategories(req, res) {
  try {
    const getData = "SELECT * FROM categories";
    await db.query(getData, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function displayByCategory(req, res) {
  const category_id = req.params.category_id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  console.log(category_id);
  const query = `SELECT * FROM products WHERE category_id = ${category_id} ORDER BY date Asc LIMIT ${limit} OFFSET ${offset}`;
  try {
    await db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function displayProduct(req, res) {
  const product_id = req.params.product_id;
  const query = `SELECT * FROM products WHERE id = ${product_id} LIMIT 1`;
  try {
    await db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result[0]);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
async function getCategory(req, res) {
  const category_id = req.params.category_id;
  const query = `SELECT * FROM categories WHERE id = ${category_id} LIMIT 1`;
  try {
    await db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result[0]);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Error retrieving data from the database"
    });
  }
}
module.exports = {
  displayProducts,
  createAuction,
  getCategories,
  displayProduct,
  displayByCategory,
  getCategory,
  countProducts,
  countProductsCategory
};