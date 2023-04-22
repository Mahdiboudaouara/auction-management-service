const { faker } = require("@faker-js/faker");
const mysql = require("mysql");
const data = [];
const array = [];
const rows = [
  [
    "1",
    "Phone",
    "1",
    "OnePlus Nord N200 5G",
    "/products/phone.jpg",
    "2023-02-03T10:00:00",
  ],
  [
    "1",
    "Custom Air Force 1",
    "2",
    "Splatter Nike Swoosh - AF1 - Custom AF1 -Custom Nike - Custom shoes - Personalized Air force - Painted AF1    ",
    "/products/shoes.avif",
    "2023-02-04T00:00:00",
  ],
  [
    "1",
    "Coin",
    "4",
    "Passion for history, taste for aesthetics and fairness - this is our vision of numismatics",
    "/products/coin.jpg",
    "2023-02-03T13:00:00",
  ],
  [
    "1",
    "The Art of War By Sun Tzu",
    "9",
    "Meticulously written with old takes on an otherwise contentious topic like war, written to highlight the multi-dimensional implications of its central topic, The Art of War is a book meant for all levels of readers regardless of whether they are beginners, at an intermediate level, or advanced and voracious book worms.",
    "/products/book.jpg",
    "2023-02-03T23:00:00",
  ],
  [
    "1",
    "Earrings",
    "6",
    "Siren Wire Earrings 18 ct Gold Vermeil & Green Onyx",
    "/products/earrings.webp",
    "2023-02-03T07:00:00",
  ],
  [
    "1",
    "NFT",
    "4",
    "Bored Ape Yacht Club #8817",
    "/products/nft.png",
    "2023-02-04T02:00:00",
  ],
  [
    "1",
    "SuperMan Figure",
    "13",
    "Showcase Series 1 Superman Action Figure",
    "/products/superman.jpg",
    "2023-02-04T2:00:00",
  ],
  [
    "1",
    "Bicycle",
    "8",
    "In an effort to make bicycling accessible to more would-be riders, John Kemp Starley—the same man behind the Ariel penny farthing—created the Rover in 1885 in Coventry, England. ",
    "/products/bicycle.jpg",
    "2023-02-04T05:55:00",
  ],
  [
    "1",
    "Samsung Galaxy Watch 5",
    "1",
    "amsung Galaxy Watch 5 specifications: 1.4-inch SAMOLED screen | One UI 4.5 based on Android Wear 3.5 | Exynos W920 chipset | 1.5GB RAM | 16GB internal storage | Bluetooth 5.2 | 410mAh battery",
    "/products/smartwatch.jpg",
    "2023-02-04T03:12:00",
  ],
  [
    "1",
    "Art piece",
    "5",
    "Tamatina Modern Art Canvas Painting|Moon with The Leaves|Abstract Art|Size-13X11 Inches.X366",
    "/products/art.jpg",
    "2023-02-3T22:00:00",
  ],
  [
    "1",
    "Hugo Lorris Gloves",
    "11",
    "SIGNED HUGO LLORIS GOALKEEPER GLOVE DISPLAY FRAMED - TOTTENHAM HOTSPUR ICON",
    "/products/gloves.jpg",
    "2023-02-03T19:00:00",
  ],
  [
    "1",
    "Good Rockin' Tonight",
    "10",
    "Good Rockin' Tonight - The Old Town Records Story 1952-1962 ",
    "/products/cd.jpg",
    "2023-02-03T17:08:00",
  ],
  [
    "1",
    "Phil Foden",
    "11",
    "SIGNED PHIL FODEN GLOVE DISPLAY FRAMED - MAN CITY ICON",
    "/products/foden.webp",
    "2023-02-03T15:20:00",
  ],
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
  const sql =
    "INSERT INTO products (owner_id,productName,category_id, productDescription, productImage,date) VALUES ?";
  db.query(sql, [rows], function (err, result) {
    if (err) throw err;
    console.log("products inserted");
  });
});
