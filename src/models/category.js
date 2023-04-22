const mysql = require("mysql");
const data = [
  ["Electronics", "(smartphones, laptops, tablets, etc.)", "/categories/Electronics.png"],
  ["Fashion","(clothing, shoes, accessories, etc.)", "/categories/Fashion.png"],
  ["Home & Garden" ,"(furniture, home décor, appliances, etc.)","/categories/Home & Garden.png"],
  ["Collectibles" ,"(sports memorabilia, stamps, coins, etc.)","/categories/Collectibles.png"],
  ["Art" ,"(paintings, sculptures, prints, etc.)","/categories/Art.png"],
  ["Jewelry" ,"(diamonds, gold, silver, etc.)","/categories/Jewelry.png"],
  ["Antiques" ,"(vintage furniture, pottery, glassware, etc.)","/categories/Antiques.png"],
  ["Automotive" ,"(cars, motorcycles, boats, etc.)","/categories/Automotive.png"],
  ["Books" ,"(rare books, first editions, etc.)","/categories/Books.png"],
  ["Music" ,"(vinyl records, CDs, etc.)","/categories/Music.png"],
  ["Sporting Goods" ,"(golf clubs, bicycles, etc.","/categories/Sporting Goods.png"],
  ["Tools" ,"(power tools, hand tools, etc.)","/categories/Tools.png"],
  ["Toys & Hobbies" ,"(action figures, models, etc.)","/categories/Toys & Hobbies.png"],
  ["Travel" ,"(airline tickets, vacation packages, etc.)","/categories/Travel.png"]
];

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO categories (category,options, categoryImage) VALUES ?";
  db.query(sql, [data], function (err, result) {
    if (err) throw err;
    console.log("products inserted");
  });
});
